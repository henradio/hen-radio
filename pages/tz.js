import WalletView from '../components/views/wallet-view';
import getWalletsWithAudio from '../api/get-wallets-with-audio';
import Head from 'next/head';
import axios from 'axios';
import {BLOCKLIST_WALLET} from '../constants';

export const getStaticProps = async() => {
    const [allWallets, blockedWallets] = await Promise.all([
        getWalletsWithAudio(),
        axios.get(BLOCKLIST_WALLET)
    ]);

    const wallets = allWallets.filter(w => !blockedWallets.data.includes(w));
    return {
        props: {wallets},
        revalidate: 300
    };
};

const Tz = ({wallets}) => {
    const title = 'Hen Radio';
    const description = 'Find Hic et Nunc audio NFT audio player, search by wallet address';
    const image = 'https://hen.radio/images/hen-radio-logo-social.png';
    const url = 'https://hen.radio/tz';

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
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
            />
        </Head>
        <WalletView wallets={wallets}/>
    </>;
};

export default Tz;
