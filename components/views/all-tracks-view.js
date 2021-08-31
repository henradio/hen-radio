import TrackList from '../track-lists/track-list';
import useRadio from '../../hooks/use-radio';
import { useEffect } from 'react';
import usePlaylist from '../../hooks/use-playlist';
import { audio } from '../../constants';
import FilterButtons from '../track-lists/filter-buttons';
import useTrack from '../../hooks/use-track';

const AllTracksView = ({objkt, tracks}) => {
    const {
        controls,
        isTrackPlaying,
    } = useRadio();

    const {filteredTracks, setTracks} = usePlaylist();
    const {trackState} = useTrack();
    if(audio) {
        audio.onended = () => {
            if(!tracks.length) return;
            controls.next(filteredTracks)();
        };
    }

    useEffect(() => {
        setTracks(tracks);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tracks]);

    useEffect(() => {
        if(trackState.currentTrack === null) {
            const foundIndex = tracks.findIndex(t => t.id === Number(objkt));
            controls.initialiseTrack(tracks)(foundIndex !== -1 ? foundIndex : 0)();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tracks]);

    if(!filteredTracks) return <p>Loading...</p>;

    return (
        <>
            <FilterButtons/>
            <TrackList
                tracks={filteredTracks}
                isTrackPlaying={isTrackPlaying}
            />
        </>
    );
};

export default AllTracksView;


