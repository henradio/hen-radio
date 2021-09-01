import TrackList from '../track-lists/track-list';
import useRadio from '../../hooks/use-radio';
import { useEffect } from 'react';
import usePlaylist from '../../hooks/use-playlist';
import { audio } from '../../constants';
import styles from './styles.module.css';
import { getTrimmedWallet } from '../../utilities/general';
import useTrack from '../../hooks/use-track';

const ObjktView = ({walletAddress, objkt, tracks}) => {
    const {
        playerState,
        controls,
        isTrackPlaying,
    } = useRadio();

    const {setTracks} = usePlaylist();
    const {trackState} = useTrack();

    if(audio) {
        audio.onended = () => {
            if(!tracks.length) return;
            controls.next(tracks)();
        };
    }

    useEffect(() => {
        setTracks(tracks);
        if(trackState.currentTrack === null) {
            const foundIndex = tracks.findIndex(t => t.id === Number(objkt));
            controls.initialiseTrack(tracks)(foundIndex !== -1 ? foundIndex : 0)();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tracks]);

    if(!tracks) return <p>Loading...</p>;

    return (
        <>
            <h2 className={styles.subTitle}>Tracks by {getTrimmedWallet(
                walletAddress)} {trackState.currentTrack?.creator?.name || ''}</h2>
            <TrackList
                tracks={tracks}
                isTrackPlaying={isTrackPlaying}
            />
        </>
    );
};

export default ObjktView;


