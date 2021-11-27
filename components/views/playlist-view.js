import { useEffect, useState } from 'react';
import CurrentPlaylist from '../current-playlist/current-playlist';
import PlaylistTracks from '../radio-player/playlist-tracks';
import Playlists from '../playlists/playlists';
import useUserPlaylists from '../../hooks/use-user-playlists';
import usePlaylist from '../../hooks/use-playlist';
import { useRouter } from 'next/router';

const PlaylistView = ({initialPlaylists, slug}) => {
    const router = useRouter()

    const {setTracks} = usePlaylist();
    const {userPlaylists} = useUserPlaylists();
    const [playlists, setPlaylists] = useState(initialPlaylists);
    const [selectedPlaylist, setSelectedPlaylist] = useState(playlists.find(p => p.slug === slug) || playlists[0]);

    useEffect(() => {
        const nextPlaylists = [...userPlaylists, ...initialPlaylists];
        setPlaylists(nextPlaylists);
    }, [userPlaylists, initialPlaylists]);

    useEffect(() => {
        setSelectedPlaylist(playlists.find(p => p.slug === slug) || playlists[0]);
    }, [slug, playlists]);

    useEffect(() => {
        setTracks(selectedPlaylist.tracks);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedPlaylist]);

    const handlePlaylistChange = (playlist) => async () => {
        if(playlist.slug) {
            await router.push(`/curated/${playlist.slug}`);
            return;
        }
        setSelectedPlaylist(playlist);
    };

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


