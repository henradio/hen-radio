import { useContext } from 'react';
import { UploadContext } from '../context/file-upload-context';

const useFileUpload = () => useContext(UploadContext);

export default useFileUpload;