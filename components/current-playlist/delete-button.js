import styles from './styles.module.css';
import { useState } from 'react';
import DeleteIcon from '../icons/delete-icon';
import useUserPlaylists from '../../hooks/use-user-playlists';

const DeleteButton = ({playlist}) => {
    const {deleteUserPlaylist} = useUserPlaylists();
    const [showConfirm, setShowConfirm] = useState(false);

    const toggleConfirm = () => {
        setShowConfirm(prevState => !prevState);
    };

    const handleDeletePlaylist = async() => {
        deleteUserPlaylist(playlist);
    };

    return (
        <div className={styles.shareLinkHolder}>
            {showConfirm && <button
                onClick={handleDeletePlaylist}
                className={styles.addToPlaylist_addToggle}
                title='Delete playlist'
            >Delete</button>}
            <button
                title="Delete playlist"
                className={`${styles.button} ${styles.button_link} ${styles.playerIconHolder}`}
                onClick={toggleConfirm}
            >
                {playlist.curator == "Mine" && <DeleteIcon/>}
            </button>
        </div>
    );
};

export default DeleteButton;
