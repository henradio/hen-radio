import styles from './styles.module.css';
import PlayPauseButton from './buttons/play-pause-button';
import MuteButton from './buttons/mute-button';
import useRadio from '../../hooks/use-radio';
import usePlaylist from '../../hooks/use-playlist';
import { getIpfsUrl, getTrimmedWallet } from '../../utilities/general';
import AddToPlaylist from '../add-to-playlist/add-to-playlist';
import { ipfsUrls } from '../../constants';
import PrevButton from './buttons/prev-button';
import NextButton from './buttons/next-button';
import Image from 'next/image';
import LinkButton from './buttons/link-button';
import useTrack from '../../hooks/use-track';
import Link from 'next/link';

const Player = () => {
    const {tracks} = usePlaylist();
    const {
        audioError,
        playerState,
        controls,
    } = useRadio();
    const {trackState} = useTrack();
    const track = trackState?.currentTrack;
    return (
        <div className={styles.controlsLayout}>
            <div className={styles.playerBar}>
                <PrevButton tracks={tracks}/>
                <PlayPauseButton/>
                <NextButton tracks={tracks}/>
                <input
                    className={`${styles.radioRange} ${styles.volumeControl}`}
                    title="volume"
                    type="range"
                    value={playerState.volume}
                    min="0"
                    max="1"
                    step="0.01"
                    onChange={controls.volume}
                />
                <MuteButton/>
                {audioError && <p className={styles.errorText}>{audioError}</p>}
            </div>
            <div className={styles.trackMetaRow}>
                <div className={styles.trackActionsBar}>
                    {track ? <AddToPlaylist track={track}/> : null}
                    {track ? <LinkButton track={track}/> : null}
                </div>
                {trackState.currentTrack !== null
                    ? (
                        <div className={styles.currentTrack}>
                            <p className={styles.trackRow_text}>
                                <a
                                    href={`https://hicetnunc.art/objkt/${track.id}`}
                                    className={styles.trackRow_link}
                                >
                                    #{track.id}
                                </a>
                                <br/>
                                <Link href={`/objkt/${track.id}`}>
                                    <a className={styles.trackRow_link}>
                                        <strong>{track.title}</strong>
                                    </a>
                                </Link>
                                <br/>
                                <span>by&nbsp;
                                    <Link href={`/tz/${track.creator.walletAddress}`}>
                                        <a>
                                            {getTrimmedWallet(track.creator.walletAddress)} {track.creator.name}
                                        </a>
                                    </Link>
                                </span>
                            </p>
                        </div>
                    ) : null}
            </div>
            {track?.availability ? <div className={styles.priceData}>
                <p className={styles.priceText}>Editions: {track.availability}</p>
                {track.price ? (<p className={styles.priceText}>Price: {track.price}</p>) : null}
            </div> : null}
        </div>
    );
};

const RadioPlayer = () => {
    const {trackState} = useTrack();
    const track = trackState?.currentTrack;

    const coverHash = track?.displayUri?.slice(7) || '';
    const srcSet = ipfsUrls.map((url) => `${url}/${coverHash}`).join(', ');
    return (
        <div className={styles.radioPlayerContainer}>
            <div className={styles.currentPlaylistImageHolder}>
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
            <Player/>
        </div>
    );
};

export default RadioPlayer;
