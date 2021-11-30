import Head from 'next/head';
import ObjktView from '../../components/views/objkt-view';
import getObjktById from '../../api/get-objkt-by-id';
import getObjktsCreatedBy from '../../api/get-objkts-created-by';
import {useRouter} from 'next/router';
import {getTrimmedWallet} from '../../utilities/general';
import {getBlockedTracks} from '../../api/get-blocked-lists';

export const getServerSideProps = async({params}) => {
    const {objktId} = params;
    const blockedObjkts = await getBlockedTracks();
    if(blockedObjkts.data.includes(objktId)) {
        return {
            notFound: true
        };
    }
    const objkt = await getObjktById(objktId);
    let tracks = [];
    if(objkt) tracks = await getObjktsCreatedBy(objkt.creator.walletAddress);

    return {
        props: {
            tracks,
            objkt,
            walletAddress: objkt.creator.walletAddress
        }
    };
};

const PlayObjktPage = ({tracks, objkt, walletAddress}) => {
    const {isFallback} = useRouter();

    if(isFallback) {
        if(typeof window !== 'undefined') {
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }

        return <p>Loading...</p>;
    }

    const byName = objkt.creator?.name
        ? ` by ${objkt.creator.name}`
        : ` by ${getTrimmedWallet(walletAddress)}`;
    const title = objkt
        ? `Listen to ${objkt.title}${byName} on Hen Radio`
        : 'Not found';
    const description = objkt?.description
        ? `${objkt.description}`
        : 'An audio objkt with this id could not be found.';
    const image = 'https://hen.radio/images/hen-radio-logo-social.png';
    const url = `https://hen.radio/objkt/${objkt.id}`;

    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <title>{objkt.title + byName} | Hen Radio | NFT Music Player</title>
                <meta name="description" content={description}/>
                <link rel="canonical" href={`http://hen.radio/${objkt.id}`}/>
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
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <ObjktView
                walletAddress={walletAddress}
                tracks={tracks}
                objkt={objkt}
            />
        </>
    );
};

export default PlayObjktPage;


