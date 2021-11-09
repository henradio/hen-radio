import { createContext } from 'react';
import { AWS_API_BASE_URL, AWS_WEBSOCKET_URL } from '../constants';
import axios from 'axios';

export const CompressContext = createContext()

const CompressProvider = ({ children }) => {


    const handleCompress = async (payload) => {

        console.log("handle compress");
        console.log(payload);
        const fileType = payload.audio.type;
        console.log(fileType)
        const presignedUrls = await getPresignedUrls(fileType);
        const getUrl = presignedUrls.presignedGet
        const filePath = await uploadToS3(fileType, payload.audio, presignedUrls);
        console.log('filePath is', filePath);
        const compressedFile = await callCompression(filePath, getUrl)
        return compressedFile;

    }

    async function getPresignedUrls(fileType) {
        const { data: presignedPostUrl } = await axios.get(
            `${AWS_API_BASE_URL}/presigned-url?fileType=${fileType}`,
        );
        console.log(fileType)
        return presignedPostUrl;
    }

    const callCompression = async (filePath, getUrl) => {
        return new Promise(resolve => {
            const socket = new WebSocket(AWS_WEBSOCKET_URL);
            socket.onopen = function (e) {
                console.log("[open] Connection established");
                console.log("Sending to server");
                const payload = `{"action":"audio-compression","data":{"filename":"${filePath}"}}`;
                console.log(payload)
                socket.send(payload);
            }
            socket.onmessage = async (event) => {
                console.log(`[message] Data received from server: ${event.data}`);
                if (event.data === "COMPLETE") {
                    console.log("Downloading compressed");
                    console.log(getUrl)
                    const response = await axios({
                        url: getUrl,
                        method: 'GET',
                        responseType: 'blob',
                    }).catch(err => console.log(err));
                    resolve(response)
                }
            }
            socket.onclose = function (event) {
                if (event.wasClean) {
                    console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
                }
                else {
                    // e.g. server process killed or network down
                    // event.code is usually 1006 in this case
                    console.log('[close] Connection died');
                }
            };
            socket.onerror = function (error) {
                console.log(`[error] ${error.message}`);
            };

        }
        )
    }

    async function uploadToS3(fileType, rawAudio, presignedPostUrl) {

        console.log(fileType)
        const formData = new FormData();
        formData.append('Content-Type', fileType);
        console.log('ppu', presignedPostUrl)
        Object.entries(presignedPostUrl.fields).forEach(([k, v]) => {
            formData.append(k, v);
        });
        formData.append('file', rawAudio); // The file has be the last element

        const response = await axios.post(presignedPostUrl.url, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }).catch(err => {console.log (err)});

        console.log(response);

        return presignedPostUrl.filePath;
    }


    return (
        <CompressContext.Provider
            value={{
                handleCompress
            }}>
            {children}
        </CompressContext.Provider>

    )

}

export default CompressProvider;