import * as styles from './styles.module.css';

const Toast = ({message, handleCloseToast}) =>
    <>
        {message && (
            <div className={styles.toast}>
                <p className={styles.toastText}>{message}</p>
                <button onClick={handleCloseToast}>Close</button>
            </div>
        )}
    </>
;

export default Toast;
