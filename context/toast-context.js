import {createContext, useEffect, useState} from 'react';
import Toast from '../components/toast/toast';

export const ToastContext = createContext();

const styles = {
    toast: {
        position: 'fixed',
        right: '40px',
        bottom: '40px',
        width: '240px',
        padding: '24px',
        boxShadow: '3px 3px 12px rgba(0, 0, 0, 0.4)',
        backgroundColor: '#ffffff'
    },
    toastText: {
        margin: '0 0 16px'
    }
};

const ToastProvider = ({children}) => {
    const [message, setMessage] = useState(null);

    const handleCloseToast = () => {
        setMessage(null);
    };

    useEffect(() => {
        console.log(message);
    }, [message])

    return (
        <ToastContext.Provider
            value={{
                message,
                setMessage,
                handleCloseToast
            }}
        >
            {children}
            <Toast message={message} handleCloseToast={handleCloseToast}/>
        </ToastContext.Provider>
    );
};

export default ToastProvider;

