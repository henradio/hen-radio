import { useEffect, useState } from 'react';
import { gql, request } from 'graphql-request';
import CurrentPlaylist from '../current-playlist/current-playlist';
import PlaylistTracks from '../radio-player/playlist-tracks';
import Playlists from '../playlists/playlists';
import usePlaylist from '../../hooks/use-playlist';
import { ipfsUrls } from '../../constants';
import useUserPlaylists from '../../hooks/use-user-playlists';
import { playlists as initialPlaylists } from '../../playlists/playlists';

const query = gql`
    query AudioObjktData($objktIds: [bigint!]) {
        hic_et_nunc_token(where: {
            id: {_in: $objktIds},
            mime: {_in: ["audio/ogg", "audio/wav", "audio/mpeg"]},
            token_holders: {
                quantity: {_gt: "0"},
                holder_id: {_neq: "tz1burnburnburnburnburnburnburjAYjjX"}
            }
        }) {
            id
            artifact_uri
            creator_id
            description
            display_uri
        }
    }
`;

export async function getStaticProps(context) {
    const search = context.query;
    const objktIdsStr = new URLSearchParams(search).get('objktIds');
    const objktIds = objktIdsStr?.split(',').map(id => Number(id)) || null;
    return {
        props: {objktIds}, // will be passed to the page component as props
    };
}

const PlaylistView = ({objktIds}) => {
    const {setTracks} = usePlaylist();

    useEffect(() => {
        if(objktIds) {
            (async() => {
                const response = await request('https://api.hicdex.com/v1/graphql', query,
                    {objktIds});
                const tracks = response?.hic_et_nunc_token?.sort(
                    (a, b) => objktIds.indexOf(a.id) - objktIds.indexOf(b.id));
                setTracks(tracks.map(o => ({
                    id: o.id,
                    creator: o.creator_id,
                    name: o.title,
                    src: `${ipfsUrls[~~(Math.random() * ipfsUrls.length)]}/${o.artifact_uri.slice(
                        7)}`,
                    mimeType: o.mime,
                    displayUri: o.display_uri,
                })));
            })();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    const handlePlaylistChange = (playlist) => () => setSelectedPlaylist(playlist);

    return (
        <>
            {!objktIds && <CurrentPlaylist playlist={selectedPlaylist}/>}
            <PlaylistTracks playlist={selectedPlaylist}/>
            <Playlists
                handlePlaylistChange={handlePlaylistChange}
                playlists={playlists}
            />
        </>
    );
};

export default PlaylistView;


