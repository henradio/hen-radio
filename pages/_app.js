import '../styles/globals.css';
import Providers from '../components/layout/providers';
import Head from 'next/head';

const MyApp = ({Component, pageProps}) =>
    <>
        <Head>
            <title>Hen Radio | NFT Music Player</title>
            <link rel="icon" href="/favicon.png" />
        </Head>
        <Providers>
            <Component {...pageProps} />
        </Providers>
    </>
;

export default MyApp;
