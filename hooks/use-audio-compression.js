import { useContext } from 'react';
import { CompressContext } from '../context/audio-compression-context';

const useCompress = () => useContext(CompressContext);

export default useCompress;