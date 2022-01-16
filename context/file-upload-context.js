import { createContext } from 'react';
import { AWS_API_BASE_URL, AWS_WEBSOCKET_URL } from '../constants';
import axios from 'axios';

export const UploadContext = createContext();

const {create} = require('ipfs-http-client');
const infuraUrl = 'https://ipfs.infura.io:5001';
const ipfs = create(infuraUrl);

const UploadProvider = ({ children }) => {
    const handleUpload = async (payload) => {
        console.log('handle upload');
        console.log(payload);
        const S3AudioFileName = await uploadFile(payload.audio);
        let hasCompressed = false;
        if (payload.audio.size > 6000000) {
            await callCompression(S3AudioFileName);
            hasCompressed = true;
        }
        const audioHashes = await ipfsViaLambda(S3AudioFileName, hasCompressed);
        const displayUri = await addToIpfs(payload.cover);
        const coverThumbUri = await addToIpfs(payload.thumbnail);
        const hashes = [audioHashes, displayUri, coverThumbUri]
        console.log(hashes)
        return hashes;
    }

    const addToIpfs = async(file) => {
        const hash = await ipfs.add(file);
        return `ipfs://${hash.path}`;
    };

    const uploadFile = async (file) => {

            const presignedUrl = await getPresignedUrls(file.type);
            const fileS3uri = await uploadToS3(
                file.type,
                file,
                presignedUrl
            );

        return fileS3uri;
    }

    const ipfsViaLambda = async (filesName, isCompressed) => {
        console.log(filesName)
        const payload = {
            'rawAudio': filesNames[0],
            'compressedAudio': 'compressed/'+filesNames[0]
        }

        console.log(payload)
        const fileHashes = await axios.post(
            `${AWS_API_BASE_URL}/uploadToIpfs`, payload
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
