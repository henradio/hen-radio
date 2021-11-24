import WalletView from '../components/views/wallet-view';
import getWalletsWithAudio from '../api/get-wallets-with-audio';
import Head from 'next/head';
import useBlocklist from '../hooks/use-blocklist';
import { useState, useEffect } from 'react';

export const getStaticProps = async() => {
    const wallets = await getWalletsWithAudio();

    return {
        props: {wallets},
        revalidate: 300,
    };
};

const Tz = ({wallets}) => {
    const title = 'Hen Radio';
    const description = 'Find Hic et Nunc audio NFT audio player, search by wallet address';
    const image = 'https://hen.radio/images/hen-radio-logo-social.png';
    const url = 'https://hen.radio/tz';

    const { filterWallets, fetchBlockLists } = useBlocklist();
    const [cleanWallets, setCleanWallets] = useState(wallets);
 
    useEffect(() => {
        cleanFeed();
    }, []);

    const cleanFeed = async () => {
        const blocklists = await fetchBlockLists();
        const cleanWallets = await filterWallets(wallets, blocklists);
        setCleanWallets(cleanWallets);
    }
    
    return <>
        <Head>
            <meta charSet="utf-8"/>
            <title>Wallets | Hen Radio | NFT Music Player</title>
            <meta name="description" content={description}/>
            <link rel="canonical" href={`http://hen.radio/tz`}/>
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
        <WalletView wallets={cleanWallets}/>
    </>;
};

export default Tz;
