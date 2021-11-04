import { useState, createContext } from 'react';
import { AWS_API_BASE_URL, AWS_WEBSOCKET_URL } from '../constants';
import axios from 'axios';

export const CompressContext = createContext()

const CompressProvider = ({ children }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [rawAudio, setRawAudio] = useState();
    const [cover, setCover] = useState();
    const [thumbnail, setThumbnail] = useState();
    const [tags, setTags] = useState('');
    const [fileType, setFileType] = useState();
    const [amount, setAmount] = useState(1)
    const [royalties, setRoyalties] = useState(10)
    const [fileError, setFileError] = useState();

    const handleCompress = async (filePath, getUrl) => {

        console.log("handle compress");
    }

    async function getPresignedUrls(fileType) {
        const { data: presignedPostUrl } = await axios.get(
            `${AWS_API_BASE_URL}/presigned-url?fileType=${fileType}`,
        );

        return presignedPostUrl;
    }

    const callCompression = async (filePath, getUrl) => {

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
                const response = await axios.get(getUrl);
                console.log(response)
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


    async function uploadToS3({ fileType, rawAudio }, presignedPostUrl) {

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
        });

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