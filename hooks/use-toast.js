import { useContext } from 'react';
import { ToastContext } from '../context/toast-context';

const useToast = () => useContext(ToastContext);

export default useToast;
