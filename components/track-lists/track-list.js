import styles from './styles.module.css';
import AddToPlaylist from '../add-to-playlist/add-to-playlist';
import RemoveFromPlaylist from '../add-to-playlist/remove-from-playlist';
import TrackLinks from './track-links';
import TrackPlayPauseButton from '../radio-player/track-play-pause-button';

const TrackList = ({
                       tracks,
                       playlist
                   }) =>
    <>
        {!tracks.length ? <p>No audio tracks available</p> : (
            <div>
                {tracks.map((t, i) =>
                    <div key={t.id} className={styles.trackRow}>
                        <TrackPlayPauseButton
                            id={t.id}
                            index={i}
                            tracks={tracks}
                        />
                        {
                            playlist?.curator === 'Mine'
                                ? <RemoveFromPlaylist
                                    playlistName={playlist.name}
                                    track={t}
                                />
                                : <AddToPlaylist track={t}/>
                        }
                        <TrackLinks
                            track={t}
                            walletAddress={t.creator.walletAddress}
                            name={t.creator.name}
                        />
                        <div className={styles.priceData}>
                            <p className={styles.priceText}>{t.availability}</p>
                            {t.price
                                ? (
                                    <p className={styles.priceText}>{t.price}</p>)
                                : null}
                        </div>
                    </div>
                )}
            </div>
        )}
    </>
;

export default TrackList;
