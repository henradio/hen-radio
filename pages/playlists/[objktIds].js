import Metadata from '../../components/head/metadata';
import Head from 'next/head';
import getTracksByObjktIds from '../../api/get-tracks-by-objkt-ids';
import AllTracksView from '../../components/views/all-tracks-view';

export const getServerSideProps = async({params}) => {
    const {objktIds: objktIdStr} = params;
    const objktIds = objktIdStr?.split(',').map(id => Number(id));
    const tracks = await getTracksByObjktIds(objktIds);
    return {props: {objktIds, tracks}};
};

const PlaylistsPage = ({objktIds, tracks}) =>
    <>
        <Head>
            <meta charSet="utf-8"/>
            <title>Playlist with Objkts {objktIds.join(', ')} | Hen Radio</title>
            <link rel="canonical" href={`http://hen.radio/playlists/${objktIds.join(',')}`}/>
            <Metadata
                title={'Listen to Hen Radio'}
                description={'Hic et Nunc NFT audio player and playlists'}
                image={''}
                url={'https://hen.radio/playlists'}
            />
        </Head>
        <AllTracksView tracks={tracks} objkt={null}/>
    </>
;

export default PlaylistsPage;
