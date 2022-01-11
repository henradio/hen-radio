import { createContext } from 'react';
import { AWS_API_BASE_URL, AWS_WEBSOCKET_URL } from '../constants';
import axios from 'axios';

export const UploadContext = createContext();

const UploadProvider = ({ children }) => {
    const handleUpload = async (payload) => {
        console.log('handle upload');
        console.log(payload);
        const audioFile = payload.audio;
        const coverFile = payload.cover;
        const thumbFile = payload.thumbnail;
        const files = [audioFile, coverFile, thumbFile];
        const filePaths = await uploadFiles(files);
        console.log(filePaths)
        if (audioFile.size > 6000000) {
            await callCompression(filePaths[0])
        }
        //TODO callUploadToIpfs
        return //;
    }

    const uploadFiles = async (files) => {
        let fileUrls = [];
        for (var a in files) {
            const file = files[a];
            const presignedUrl = await getPresignedUrls(file.type);
            const filePath = await uploadToS3(
                file.type,
                file,
                presignedUrl
            );
            fileUrls.push(filePath);
        }
        return fileUrls;
    }

    const getPresignedUrls = async (fileType) => {
        const { data: presignedPostUrl } = await axios.get(
            `${AWS_API_BASE_URL}/presigned-url?fileType=${fileType}`
        );
        return presignedPostUrl;
    }

    const callCompression = async (filePath) => {
        return new Promise((resolve, reject) => {
            const socket = new WebSocket(AWS_WEBSOCKET_URL);
            socket.onopen = function (e) {
                console.log('[open] Connection established');
                console.log('Sending to server');
                const payload = `{"action":"audio-compression","data":{"filename":"${filePath}"}}`;
                console.log(payload);
                socket.send(payload);
            };
            socket.onmessage = async (event) => {
                console.log(
                    `[message] Data received from server: ${event.data}`);
                if (event.data === 'COMPLETE') {
                    ///
                    console.log('Compression and ipfs done');
                    /* try {
                         const response = await axios({
                             url: getUrl,
                             method: 'GET',
                             responseType: 'blob'
                         });
                         resolve(response);
                     } catch(e) {
                         console.log(e);
                         reject(null);
                     }*/
                }
            };
            socket.onclose = function (event) {
                if (event.wasClean) {
                    console.log(
                        `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
                } else {
                    // e.g. server process killed or network down
                    // event.code is usually 1006 in this case
                    console.log('[close] Connection died');
                }
            };
            socket.onerror = function (error) {
                console.log(`[error] ${error.message}`);
            };

        }
        );
    };

    async function uploadToS3(fileType, file, presignedPostUrl) {

        console.log(fileType);
        console.log(file);
        const formData = new FormData();
        formData.append('Content-Type', fileType);
        console.log('ppu', presignedPostUrl);
        Object.entries(presignedPostUrl.fields).forEach(([k, v]) => {
            formData.append(k, v);
        });
        formData.append('file', file); // The file has be the last element
        const response = await axios.post(presignedPostUrl.url, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).catch(err => { console.log(err); });

        console.log(response);

        return presignedPostUrl.filePath;
    }

    return (
        <UploadContext.Provider
            value={{
                handleUpload
            }}
        >
            {children}
        </UploadContext.Provider>

    );

};

export default UploadProvider;
