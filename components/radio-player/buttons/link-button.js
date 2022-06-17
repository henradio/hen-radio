import styles from '../styles.module.css';
import LinkIcon from '../../icons/link-icon';
import { useState } from 'react';

const LinkButton = ({track}) => {
    const [showMessage, setShowMessage] = useState(false);

    const handleCopyShareLink = async() => {
        await navigator.clipboard.writeText(`https://www.henradio.xyz/objkt/${track.id}`);
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 1300);
    };

    return (
        <div className={styles.shareLinkHolder}>
            <button
                title="Copy Track Url"
                className={`${styles.button} ${styles.button_link} ${styles.playerIconHolder}`}
                onClick={handleCopyShareLink}
            >
                <LinkIcon/>
            </button>
            {showMessage ? <p className={styles.shareLinkMessage}>Copied Url</p> : null}
        </div>
    );
};

export default LinkButton;
