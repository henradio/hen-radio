import Layout from '../components/layout/layout';
import AllTracksView from '../components/views/all-tracks-view';
import getAllTracks from '../api/get-all-tracks';
import Head from 'next/head';
import Metadata from '../components/head/metadata';

export async function getServerSideProps() {
    const tracks = await getAllTracks();

    return {props: {tracks}};
}

const AllTracksPage = ({tracks}) =>
    <>
        <Head>
            <meta charSet="utf-8"/>
            <title>Hen Radio</title>
            <link rel="canonical" href={`http://hen.radio`}/>
            <Metadata
                title={'Listen to Hen Radio'}
                description={'Hic et Nunc audio NFT audio player and playlists'}
                image={''}
                url={'https://hen.radio'}
            />
        </Head>
        <Layout>
            <AllTracksView tracks={tracks} objkt={null}/>
        </Layout>
    </>
;

export default AllTracksPage;


