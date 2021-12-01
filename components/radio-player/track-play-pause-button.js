import useRadio from '../../hooks/use-radio';
import styles from '../track-lists/styles.module.css';
import LoadingIcon from '../icons/loading-icon';
import PauseIcon from '../icons/pause-icon';
import PlayIcon from '../icons/play-icon';

const TrackPlayPauseButton = ({id, tracks, className = ''}) => {
    const {controls, playerState, isTrackPlaying} = useRadio();
    const handleSelectTrack = controls.selectTrack(tracks);

    if(playerState.isLoading) return (
        <span className={`${className} ${styles.icon_loading_small} ${styles.playerControlIcon_small}`}>
            <LoadingIcon/>
        </span>
    );

    return isTrackPlaying(id)
        ? (
            <button
                className={`${className} ${styles.button} ${styles.button_pause_small} ${styles.playerControlIcon_small}`}
                onClick={controls.pause}
            ><PauseIcon/></button>
        ) : (
            <button
                className={`${className} ${styles.button} ${styles.button_play_small} ${styles.playerControlIcon_small}`}
                onClick={handleSelectTrack(tracks.findIndex(t => t.id === id))}
            ><PlayIcon/></button>
        );
};

export default TrackPlayPauseButton;
