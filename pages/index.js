import AllTracksView from '../components/views/all-tracks-view';
import getAllTracks from '../api/get-all-tracks';
import Head from 'next/head';
import Metadata from '../components/head/metadata';

export const getServerSideProps = async() => {
    const tracks = await getAllTracks();

    return {props: {tracks}};
};

const AllTracksPage = ({tracks}) =>
    <>
        <Head>
            <meta charSet="utf-8"/>
            <title>Hen Radio</title>
            <link rel="canonical" href={`http://hen.radio`}/>
            <Metadata
                title={'Listen to Hen Radio'}
                description={'Hic et Nunc NFT audio player, all tracks'}
                image={''}
                url={'https://hen.radio'}
            />
        </Head>
        <AllTracksView tracks={tracks} objkt={null}/>
    </>
;

export default AllTracksPage;


