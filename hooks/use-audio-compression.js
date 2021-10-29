import { useContext } from 'react';
import { CompressAudioContext } from '../../context/compress-audio-context';
const useAudioCompression = () => useContext(CompressAudioContext);

export default useAudioCompression;