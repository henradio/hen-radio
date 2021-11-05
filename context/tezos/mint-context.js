import {createContext, useState} from 'react';
import useCompress from '../../hooks/use-audio-compression';

const {create} = require('ipfs-http-client');

export const MintContext = createContext();

const MintProvider = ({children}) => {

    const {handleCompress} = useCompress();

    const handleMint = async(filePath, getUrl) => {
        handleCompress();
        console.log('handle mint');
    };

    return (
        <MintContext.Provider
            value={{handleMint}}
        >
            {children}
        </MintContext.Provider>
    );

};

export default MintProvider;
