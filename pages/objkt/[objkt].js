import Layout from '../../components/layout/layout';
import AllTracksView from '../../components/views/all-tracks-view';
import getAllTracks from '../../api/get-all-tracks';
import Head from 'next/head';
import Metadata from '../../components/head/metadata';
import getUserMetadataByWalletId from '../../api/get-user-metadata-by-wallet-id';

export const getServerSideProps = async({params}) => {
    const {objkt} = params;
    const tracks = await getAllTracks();
    const currentTrack = tracks.find(t => t.id === Number(objkt)) || null;
    let creator = null;
    if(currentTrack) {
        const response = await getUserMetadataByWalletId(currentTrack.creator);
        if(response.status === 200) creator = await response.data;
    }

    return {props: {objkt, tracks, currentTrack, creator}};
};

const PlayObjktPage = ({objkt, tracks, currentTrack, creator}) => {
    const byName = creator?.twitter
        ? ` by @${creator.twitter}`
        : creator?.alias
        ? ` by ${creator.alias}`
        : ''
    const title = currentTrack ? `Listen to ${currentTrack.name}${byName} on Hen Radio` : 'Not found';
    const description = currentTrack ? `${currentTrack.description}` : 'An audio objkt with this id could not be found.';
    const image = currentTrack ? `${currentTrack.img}` : '';
    const url = `https://hen.radio/objkt/${objkt}`

    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <title>{currentTrack ? currentTrack.name + byName : 'All'} | Hen Radio</title>
                <link rel="canonical" href={`http://hen.radio/${objkt}`}/>
                <Metadata title={title} description={description} image={image} url={url}/>
            </Head>
            <AllTracksView tracks={tracks} objkt={objkt}/>
        </>
    );
};

export default PlayObjktPage;


