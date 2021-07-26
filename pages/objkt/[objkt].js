import Head from 'next/head';
import ObjktView from '../../components/views/objkt-view';
import getObjktById from '../../api/get-objkt-by-id';
import getObjktsCreatedBy from '../../api/get-objkts-created-by';
import { useRouter } from 'next/router';
import getAllTrackIds from '../../api/get-all-track-ids';
import { getTrimmedWallet } from '../../utilities/general';

export const getStaticPaths = async() => {
    const objkts = await getAllTrackIds();
    return {
        paths: objkts.map(objkt => ({params: {objkt}})),
        fallback: true,
    };
};

export const getStaticProps = async({params}) => {
    const {objkt} = params;
    const track = await getObjktById(objkt);
    let tracks = [];
    if(track) tracks = await getObjktsCreatedBy(track.creator.walletAddress);
    const currentTrack = tracks.find(t => t.id === Number(objkt)) || null;

    return {
        props: {objkt, tracks, currentTrack, walletAddress: track.creator.walletAddress},
        revalidate: 300,
    };
};

const PlayObjktPage = ({objkt, tracks, currentTrack, walletAddress}) => {
    const {isFallback} = useRouter();

    if(isFallback) {
        if(typeof window !== 'undefined') {
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }

        return <p>Loading...</p>;
    }

    const byName = currentTrack.creator?.name
        ? ` by ${currentTrack.creator.name}`
        : ` by ${getTrimmedWallet(walletAddress)}`;
    const title = currentTrack
        ? `Listen to ${currentTrack.title}${byName} on Hen Radio`
        : 'Not found';
    const description = currentTrack?.description
        ? `${currentTrack.description}`
        : 'An audio objkt with this id could not be found.';
    const image = 'https://hen.radio/images/hen-radio-logo-social.png';
    const url = `https://hen.radio/objkt/${objkt}`;

    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <title>{currentTrack.title + byName} | Hen Radio | NFT Music Player</title>
                <meta name="description" content={description}/>
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
            <ObjktView
                walletAddress={walletAddress}
                tracks={tracks}
                currentTrack={currentTrack}
                objkt={objkt}
            />
        </>
    );
};

export default PlayObjktPage;


