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

const Player = () => {
    const {filteredTracks} = usePlaylist();
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
                <PrevButton tracks={filteredTracks}/>
                <PlayPauseButton/>
                <NextButton tracks={filteredTracks}/>
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
            </div>
            <div className={styles.trackMetaRow}>
                {track ? <AddToPlaylist track={track}/> : null}
                {track ? <LinkButton track={track}/> : null}
                {trackState.currentTrack !== null
                    ? (
                        <div className={styles.currentTrack}>
                            <span className={styles.trackRow_text}>
                                <a
                                    href={`https://hicetnunc.xyz/objkt/${track.id}`}
                                    className={styles.trackRow_link}
                                >#{track.id}</a>
                                {' '}
                                {track.title}
                                <br/>
                                By <a
                                href={`https://hicetnunc.xyz/tz/${track.creator.walletAddress}`}
                                className={styles.trackRow_link}
                            >{getTrimmedWallet(
                                track.creator.walletAddress)} {track.creator.name}</a>
                            </span>
                        </div>
                    ) : null}
            </div>
            {track?.availability ? <div className={styles.priceData}>
                <p className={styles.priceText}>Editions: {track.availability}</p>
                {track.price ? (<p className={styles.priceText}>Price: {track.price}</p>) : null}
            </div> : null}
            {audioError && <p className={styles.errorText}>{audioError}</p>}
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
