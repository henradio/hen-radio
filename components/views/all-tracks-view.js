import TrackList from '../track-lists/track-list';
import useRadio from '../../hooks/use-radio';
import {useEffect} from 'react';
import {audio} from '../../constants';
import SearchBar from '../track-lists/search-bar';
import useTrack from '../../hooks/use-track';
import useSWR from 'swr';
import allTracksFetcher, {allTracksApi} from '../../fetchers/all-tracks-fetcher';
import serialise from '../../fetchers/serialiser';
import usePlaylist from '../../hooks/use-playlist';

const AllTracksView = ({page = 1, search = null}) => {
    const {data} = useSWR([allTracksApi, page, search], allTracksFetcher, {use: [serialise]});
    const {tracks, objkt} = data;
    const {setTracks} = usePlaylist();
    const {controls} = useRadio();

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
            controls.initialiseTrack(tracks)(
                foundIndex !== -1 ? foundIndex : 0)();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tracks]);

    if(!tracks) return <p>Loading...</p>;

    return (
        <>
            <SearchBar/>
            <TrackList tracks={tracks}/>
        </>
    );
};

export default AllTracksView;


