import styles from './styles.module.css';
import Image from 'next/image';
import LinkButton from './link-button';
import DeleteButton from './delete-button';

const CurrentPlaylist = ({playlist}) =>
    <div className={styles.currentPlaylistWrapper}>
        <div className={styles.currentPlaylistRow}>
            <div className={styles.currentPlaylistColumnImage}>
                <div>
                    <Image
                        width={180}
                        height={180}
                        src={playlist.img || '/images/playlist-default.png'}
                        alt=""
                        className={styles.currentPlaylistImage}
                    />
                </div>
            </div>
            <div className={styles.currentPlaylistColumnInfo}>
                <h1 className={styles.currentPlaylistText}>{playlist.name}</h1>
                <p className={styles.currentPlaylistArtist}>
                    By {playlist.curator}
                </p>
                <p className={styles.currentPlaylistDescription}>{playlist.description}</p>
                <div className={styles.actionBar}>
                    <LinkButton tracks={playlist.tracks}/>
                    <DeleteButton playlist={playlist}/>
                </div>
            </div>
        </div>
    </div>
;

export default CurrentPlaylist;
