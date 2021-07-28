import { useEffect, useState } from 'react';
import CurrentPlaylist from '../current-playlist/current-playlist';
import PlaylistTracks from '../radio-player/playlist-tracks';
import Playlists from '../playlists/playlists';
import useUserPlaylists from '../../hooks/use-user-playlists';
import { playlists as initialPlaylists } from '../../playlists/playlists';
import usePlaylist from '../../hooks/use-playlist';

const PlaylistView = () => {
    const {setTracks} = usePlaylist();
    const {userPlaylists} = useUserPlaylists();
    const [playlists, setPlaylists] = useState(initialPlaylists);
    const [selectedPlaylist, setSelectedPlaylist] = useState(playlists[0]);

    useEffect(() => {
        const nextPlaylists = [...userPlaylists, ...initialPlaylists];
        setPlaylists(nextPlaylists);
    }, [userPlaylists]);

    useEffect(() => {
        setSelectedPlaylist(prevState => {
            const sp = playlists.find(np => prevState.name === np.name) || playlists[0];
            return {...sp, forceUpdate: (sp?.forceUpdate || 0) + 1}; // Todo: Remove the need for forceUpdate
        });
    }, [playlists]);

    useEffect(() => {
        setTracks(selectedPlaylist.tracks);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedPlaylist]);

    const handlePlaylistChange = (playlist) => () => setSelectedPlaylist(playlist);

    return (
        <>
            <CurrentPlaylist playlist={selectedPlaylist}/>
            <PlaylistTracks playlist={selectedPlaylist}/>
            <Playlists
                handlePlaylistChange={handlePlaylistChange}
                playlists={playlists}
            />
        </>
    );
};

export default PlaylistView;


