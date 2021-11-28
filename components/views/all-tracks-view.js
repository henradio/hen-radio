import TrackList from '../track-lists/track-list';
import useRadio from '../../hooks/use-radio';
import {useEffect} from 'react';
import {audio} from '../../constants';
import FilterButtons from '../track-lists/filter-buttons';
import useTrack from '../../hooks/use-track';
import useSWR from 'swr';
import allTracksFetcher, {allTracksApi} from '../../fetchers/all-tracks-fetcher';
import Pagination from '../pagination';
import serialise from '../../fetchers/serialiser';

const AllTracksView = () => {
    const {data} = useSWR([allTracksApi, 1, 250], allTracksFetcher, { use: [serialise] });
    const {tracks, objkt} = data;
    const {
        controls,
        isTrackPlaying
    } = useRadio();

    const {trackState} = useTrack();

    if(audio) {
        audio.onended = () => {
            if(!tracks.length) return;
            controls.next(tracks)();
        };
    }

    useEffect(() => {
        if(trackState.currentTrack === null) {
            const foundIndex = tracks.findIndex(t => t.id === Number(objkt));
            controls.initialiseTrack(tracks)(
                foundIndex !== -1 ? foundIndex : 0)();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tracks]);

    if(!tracks) return <p>Loading...</p>;

    return (
        <>
            <FilterButtons/>
            <TrackList
                tracks={tracks}
                isTrackPlaying={isTrackPlaying}
            />
            <Pagination/>
        </>
    );
};

export default AllTracksView;


