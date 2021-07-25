import AllTracksView from '../../components/views/all-tracks-view';
import getAllTracks from '../../api/get-all-tracks';
import getUserMetadataByWalletId from '../../api/get-user-metadata-by-wallet-id';
import Head from 'next/head';

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
            : '';
    const title = currentTrack
        ? `Listen to ${currentTrack.name}${byName} on Hen Radio`
        : 'Not found';
    const description = currentTrack?.description
        ? `${currentTrack.description}`
        : 'An audio objkt with this id could not be found.';
    const image = 'https://hen.radio/_next/image?url=%2Fimages%2Fhen-radio-logo-social.png&w=1024&q=75';
    const url = `https://hen.radio/objkt/${objkt}`;

    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <title>{currentTrack ? currentTrack.name + byName : 'All'} | Hen Radio | NFT Music Player</title>
                <link rel="canonical" href={`http://hen.radio/${objkt}`}/>
                <meta name="twitter:card" content="summary"/>
                <meta name="twitter:site" content="@hen_radio"/>
                <meta name="twitter:creator" content="@hen_radio"/>
                <meta name="twitter:title" content={title}/>
                <meta
                    name="twitter:description"
                    content={description}
                />
                <meta
                    name="twitter:image"
                    content={image}
                />
                <meta property="og:title" content={title}/>
                <meta property="og:url" content={url}/>
                <meta property="og:type" content="gallery"/>
                <meta
                    property="og:description"
                    content={description}
                />
                <meta
                    property="og:image"
                    content={image}
                />
                <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <AllTracksView tracks={tracks} objkt={objkt}/>
        </>
    );
};

export default PlayObjktPage;


