import { useState, createContext } from 'react';
import { AWS_API_BASE_URL, AWS_WEBSOCKET_URL } from '../../constants';
const { create } = require('ipfs-http-client')
import useCompress from '../../hooks/use-audio-compression';
import axios from 'axios';

export const MintContext = createContext()

const MintProvider = ({ children }) => {

    const { handleCompress } = useCompress();

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

    const handleMint = async (filePath, getUrl) => {
        handleCompress()
        console.log("handle mint");


    }



    return (
        <MintContext.Provider
            value={{
                handleMint
            }}>
            {children}
        </MintContext.Provider>

    )

}

export default MintProvider;