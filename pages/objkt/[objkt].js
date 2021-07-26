import getUserMetadataByWalletId from '../../api/get-user-metadata-by-wallet-id';
import Head from 'next/head';
import ObjktView from '../../components/views/objkt-view';
import getWalletsWithAudio from '../../api/get-wallets-with-audio';
import getObjktById from '../../api/get-objkt-by-id';
import getObjktsCreatedBy from '../../api/get-objkts-created-by';
import { useRouter } from 'next/router';

export async function getStaticPaths() {
    const objkts = await getWalletsWithAudio();

    return {
        paths: objkts.map(objkt => ({params: {objkt}})),
        fallback: true,
    };
}

export const getStaticProps = async({params}) => {
    const {objkt} = params;
    const wallets = await getWalletsWithAudio();
    const track = await getObjktById(objkt);
    let tracks = [];
    if(track) tracks = await getObjktsCreatedBy(track.creator_id);
    const currentTrack = tracks.find(t => t.id === Number(objkt)) || null;
    let creator = track.creator_id;
    if(currentTrack) {
        const response = await getUserMetadataByWalletId(creator);
        if(response.status === 200) creator = await response.data;
    }

    return {
        props: {wallets, objkt, tracks, currentTrack, creator, walletAddress: track.creator_id},
        revalidate: 300,
    };
};

const PlayObjktPage = ({objkt, tracks, currentTrack, creator, walletAddress}) => {
    const {isFallback} = useRouter();

    if(isFallback) {
        setTimeout(() => {
            window.location.reload();
        }, 2000);

        return <p>Loading...</p>;
    }

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
    const image = 'https://hen.radio/images/hen-radio-logo-social.png';
    const url = `https://hen.radio/objkt/${objkt}`;

    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <title>{currentTrack.name + byName} | Hen Radio | NFT Music Player</title>
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
                creator={creator}
                tracks={tracks}
                objkt={objkt}
            />
        </>
    );
};

export default PlayObjktPage;


