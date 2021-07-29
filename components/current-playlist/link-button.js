import styles from './styles.module.css';
import LinkIcon from '../icons/link-icon';
import { useState } from 'react';
import { useRouter } from 'next/router';

const LinkButton = ({tracks}) => {
    const router = useRouter()
    const {slug} = router.query;
    const [showMessage, setShowMessage] = useState(false);

    const handleCopyShareLink = async() => {
        const trackIds = tracks.map(t => t.id).join(',');
        const link = slug
            ? `https://hen.radio/curated/${slug}`
            : `https://hen.radio/playlists/${trackIds}`
        await navigator.clipboard
            .writeText(link);
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 1300);
    };

    return (
        <div className={styles.shareLinkHolder}>
            <button
                title="Copy Playlist Url"
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
