import { useEffect, useState } from 'react';
import TrackList from './track-list';
import FilterTypes from '../../enums/filter-types';
import TracksFilterBar from './tracks-filter-bar';
import useRadio from '../../hooks/use-radio';
import usePlaylist from '../../hooks/use-playlist';
import { audio } from '../../constants';
import useTrack from '../../hooks/use-track';

const WalletTrackList = ({walletAddress, tracks, objkt}) => {
    const {
        controls,
        isTrackPlaying,
    } = useRadio();
    const {trackState} = useTrack();
    const {setTracks} = usePlaylist();
    const [filteredTracks, setFilteredTracks] = useState([]);
    const [filter, setFilter] = useState(FilterTypes.ALL);

    if(audio) {
        audio.onended = () => {
            if(!filteredTracks.length) return;
            controls.next(filteredTracks)();
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

    useEffect(() => {
        if(!tracks) return;
        setFilteredTracks(tracks.filter(t => {
            switch(filter) {
                case FilterTypes.ALL:
                    return true;
                case FilterTypes.CREATIONS:
                    return t.creator.walletAddress === walletAddress;
                case FilterTypes.COLLECTIONS:
                    return t.creator.walletAddress !== walletAddress;
                default:
                    return true;
            }
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tracks, filter]);

    if(!tracks) return <p>Loading...</p>;

    return (
        <>
            <TracksFilterBar filter={filter} setFilter={setFilter}/>
            <TrackList
                tracks={filteredTracks}
                isTrackPlaying={isTrackPlaying}
            />
        </>
    );
};

export default WalletTrackList;
