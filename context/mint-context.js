import { useState, createContext } from 'react';
import { MAX_FILE_SIZE_BYTES, AWS_API_BASE_URL, AWS_WEBSOCKET_URL } from '../constants';
import axios from 'axios';

const bytesToMb = bytes => bytes / 1000000;
export const MintContext = createContext()

const MintProvider = ({ children }) => {


    const [fileError, setFileError] = useState();
    const [fileContents, setFileContents] = useState();
    const [fileName, setFileName] = useState();
    const [fileSize, setFileSize] = useState();
    const [fileType, setFileType] = useState();

    const handleFileChange = (event) => {

        const fileObj = event.target.files && event.target.files[0];

        if (!fileObj) {
            return;
        }

        const [type] = fileObj.type.split('/');

        if (fileObj.size > MAX_FILE_SIZE_BYTES) {
 

                setFileError(`File is too large, file size is ${bytesToMb(
                    fileObj.size,
                ).toFixed(2)} MB, maximum allowed size - 1 MB.`)

            return;
        }

        // eslint-disable-next-line no-param-reassign
        event.target.value = '';

        setFileError(null)
        setFileName(fileObj.name)
        setFileSize(fileObj.size)
        setFileType(fileObj.type)
        setFileContents(fileObj)

    };

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


async function uploadToS3({ fileType, fileContents }, presignedPostUrl) {

    console.log(fileType)
    const formData = new FormData();
    formData.append('Content-Type', fileType);
    console.log('ppu', presignedPostUrl)
    Object.entries(presignedPostUrl.fields).forEach(([k, v]) => {
        formData.append(k, v);
    });
    formData.append('file', fileContents); // The file has be the last element

    const response = await axios.post(presignedPostUrl.url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

    console.log(response);

    return presignedPostUrl.filePath;
}

const handlePreview = () => {
        console.log("handlePreview")
}

    return (
        <MintContext.Provider
        value={{
            fileError,
            fileContents,
            fileName,
            fileType,
            fileSize,
            handleFileChange,
            handlePreview,
            callCompression,
            getPresignedUrls,
            uploadToS3
        }}>
        {children}
        </MintContext.Provider>
       
    )

}

export default MintProvider;