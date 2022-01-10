import {createContext} from 'react';
import {AWS_API_BASE_URL, AWS_WEBSOCKET_URL} from '../constants';
import axios from 'axios';

export const UploadContext = createContext();

const UploadProvider = ({children}) => {
    const handleUpload = async(payload) => {
        console.log('handle upload');
        console.log(payload);
        const audioFileType = payload.audio.type;
        console.log(audioFileType);
        const audioPresignedUrl = await getPresignedUrls(audioFileType);
        //const getUrl = audioPresignedUrls.presignedGet;
        const audioFilePath = await uploadToS3(
            audioFileType,
            payload.audio,
            audioPresignedUrl
        );
        console.log('audio filePath is', audioFilePath);
/*
        const coverFileType = payload.cover.type;
        console.log(coverFileType);
        const coverPresignedUrl = await getPresignedUrls(coverFileType);
        const coverFilePath = await uploadToS3(
            coverFileType,
            payload.cover,
            coverPresignedUrl
        );
        console.log('cover filePath is', coverFilePath);

        const thumbnailFileType = payload.thumbnail.type;
        console.log(thumbnailFileType);
        const thumbnailPresignedUrl = await getPresignedUrls(thumbnailFileType);
        const filePath = await uploadToS3(
            thumbnailFileType,
            payload.thumbnail,
            thumbnailPresignedUrl
        );
        console.log('thumbnail filePath is', filePath);*/

        return //await callCompression(filePath);
    }

    async function getPresignedUrls(fileType) {
        const {data: presignedPostUrl} = await axios.get(
            `${AWS_API_BASE_URL}/presigned-url?fileType=${fileType}`
        );
        console.log(fileType);
        return presignedPostUrl;
    }

    const callCompression = async(filePath) => {
        return new Promise((resolve, reject) => {
                const socket = new WebSocket(AWS_WEBSOCKET_URL);
                socket.onopen = function(e) {
                    console.log('[open] Connection established');
                    console.log('Sending to server');
                    const payload = `{"action":"audio-compression","data":{"filename":"${filePath}"}}`;
                    console.log(payload);
                    socket.send(payload);
                };
                socket.onmessage = async(event) => {
                    console.log(
                        `[message] Data received from server: ${event.data}`);
                    if(event.data === 'COMPLETE') {
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
                socket.onclose = function(event) {
                    if(event.wasClean) {
                        console.log(
                            `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
                    } else {
                        // e.g. server process killed or network down
                        // event.code is usually 1006 in this case
                        console.log('[close] Connection died');
                    }
                };
                socket.onerror = function(error) {
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
        console.log(formData)
        const response = await axios.post(presignedPostUrl.url, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        }).catch(err => {console.log(err);});

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
