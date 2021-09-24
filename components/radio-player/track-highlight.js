import styles from './styles.module.css';
import Image from 'next/image';
import { getIpfsUrl } from '../../utilities/general';
import { ipfsUrls } from '../../constants';
import useToken from '../../hooks/use-token';


const TrackHighlight = ({ track }) => {
    const coverHash = track?.displayUri?.slice(7) || '';
    const srcSet = ipfsUrls.map((url) => `${url}/${coverHash}`).join(', ');
    const {walletToCredit, setWalletToCredit} = useToken();

    function sendToken() {

        setWalletToCredit(Math.random());

    }

    return (
        <div className={styles.currentPlaylistWrapper}>
            <div className={styles.currentPlaylistRow}>
                <div className={styles.currentPlaylistColumnImage}>
                    <div>

                        <Image
                            src={track?.displayUri
                                ? getIpfsUrl(track.displayUri)
                                : '/images/playlist-default.png'}
                            srcSet={track?.displayUri ? srcSet : 'images/playlist-default.png'}
                            width={180}
                            height={180}
                            alt=""
                            className={styles.currentPlaylistImage}
                        />
                    </div>
                    <button onClick={sendToken}>#</button>
                </div>
                <div className={styles.currentPlaylistColumnInfo}>
                    <h1 className={styles.currentPlaylistText}>{track?.title}</h1>
                    <p className={styles.currentPlaylistArtist}>
                        By <a href="https://hicetnunc.xyz">{track?.creator.name}</a>
                    </p>
                    <p className={styles.currentPlaylistDescription}>{track?.description}</p>
                    <hr />
                </div>
            </div>
        </div>

    )
}
export default TrackHighlight;
