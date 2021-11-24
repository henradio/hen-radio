import WalletView from '../../components/views/wallet-view';
import Head from 'next/head';
import getWalletsWithAudio from '../../api/get-wallets-with-audio';
import getObjktsCreatedBy from '../../api/get-objkts-created-by';
import WalletTrackList from '../../components/track-lists/wallet-track-list';
import getObjktsOwnedBy from '../../api/get-objkts-owned-by';
import { useRouter } from 'next/router';
import useBlocklist from '../../hooks/use-blocklist';
import { useState, useEffect } from 'react';

export const getServerSideProps = async ({ params }) => {
    const { walletAddress } = params;
    const wallets = await getWalletsWithAudio();
    const tracksCreated = await getObjktsCreatedBy(walletAddress);
    const tracksOwned = await getObjktsOwnedBy(walletAddress);
    const tracks = [...tracksCreated, ...tracksOwned];
    const creator = walletAddress;

    return {
        props: { creator, tracks, wallets }
    };
};

const Tz = ({ creator, tracks, wallets }) => {
    const { isFallback } = useRouter();
    const { filterFeeds, filterWallets, fetchBlockLists } = useBlocklist();
    const [cleanTracks, setCleanTracks] = useState(tracks);
    const [cleanWallets, setCleanWallets] = useState(tracks);

    useEffect(() => {
        cleanFeed();
    }, []);

    const cleanFeed = async () => {
        const blocklists = await fetchBlockLists();
        const cleanTracks = await filterFeeds(tracks, blocklists);
        const cleanWallets = await filterWallets(wallets, blocklists);
        setCleanTracks(cleanTracks);
        setCleanWallets(cleanWallets);
    }

    if (isFallback) {
        if (typeof window !== 'undefined') {
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }

        return <p>Loading...</p>;
    }

    const title = 'Listen to Hen Radio';
    const description = 'Hic et Nunc audio NFT audio player and playlists';
    const image = 'https://hen.radio/images/hen-radio-logo-social.png';
    const url = 'https://hen.radio/tz';

    return <>
        <Head>
            <meta charSet="utf-8" />
            <title>Wallets | Hen Radio</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={`http://hen.radio/tz`} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@hen_radio" />
            <meta name="twitter:creator" content="@hen_radio" />
            <meta name="twitter:title" content={title} />
            <meta
                name="twitter:description"
                content={description}
            />
            <meta
                name="twitter:image"
                content={image}
            />
            <meta property="og:title" content={title} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content="gallery" />
            <meta
                property="og:description"
                content={description}
            />
            <meta
                property="og:image"
                content={image}
            />
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <WalletTrackList tracks={cleanTracks} walletAddress={creator} objkt={null} />
        <WalletView wallets={cleanWallets} />
    </>;
};

export default Tz;
