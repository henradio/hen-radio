import Layout from '../components/layout/layout';
import PlaylistView from '../components/views/playlist-view';
import Head from 'next/head';
import Metadata from '../components/head/metadata';

const PlaylistsPage = () =>
    <>
        <Head>
            <meta charSet="utf-8"/>
            <title>Playlists | Hen Radio</title>
            <link rel="canonical" href={`http://hen.radio/playlists`}/>
            <Metadata
                title={'Listen to Hen Radio'}
                description={'Hic et Nunc audio NFT audio player and playlists'}
                image={''}
                url={'https://hen.radio/playlists'}
            />
        </Head>
        <Layout>
            <PlaylistView/>
        </Layout>
    </>
;

export default PlaylistsPage;


