import styles from './styles.module.css';
import DeleteIcon from '../icons/delete-icon';
import useUserPlaylists from '../../hooks/use-user-playlists';

const DeleteButton = ({playlist}) => {
    const {deleteUserPlaylist} = useUserPlaylists();

    const handleDeletePlaylist = async() => {
        deleteUserPlaylist(playlist);
    };

    return (
        <div className={styles.shareLinkHolder}>
            <button
                title="Delete playlist"
                className={`${styles.button} ${styles.button_link} ${styles.playerIconHolder}`}
                onClick={handleDeletePlaylist}
            >
                {playlist.curator == "Mine" && <DeleteIcon/>}
            </button>
        </div>
    );
};

export default DeleteButton;
