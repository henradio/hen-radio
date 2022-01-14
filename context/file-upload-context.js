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
        const S3fileNames = await uploadFiles(files);
        if (audioFile.size > 6000000) {
            await callCompression(S3fileNames[0]);
            S3files.push("compressed/" + S3fileNames[0])
        }
        const hashes = callUploadToIpfs(S3fileNames);
        console.log(hashes)
        return hashes;
    }

    const uploadFiles = async (files) => {
        let fileS3uris = [];
        for (var a in files) {
            const file = files[a];
            const presignedUrl = await getPresignedUrls(file.type);
            const fileS3uri = await uploadToS3(
                file.type,
                file,
                presignedUrl
            );
            fileS3uris.push(fileS3uri);
        }
        return fileS3uris;
    }

    const callUploadToIpfs = async (filesNames) => {
        console.log(filesNames)
        console.log(filesNames[3])
        const fileHashes = await axios.post(
            `${AWS_API_BASE_URL}/uploadToIpfs`, {
                  rawAudio: filesNames[0],
                  cover: filesNames[1],
                  thumb: filesNames[2],
                  compressed: filesNames[3]
              }
        );
        return fileHashes;
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
                    resolve();
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
