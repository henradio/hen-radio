import '../styles/globals.css';
import Providers from '../components/layout/providers';
import Head from 'next/head';

const MyApp = ({Component, pageProps}) =>
    <>
        <Head>
            <title>Hen Radio | NFT Music Player</title>
            <link rel="icon" href="/favicon.png"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source Code Pro"/>
        </Head>
        <Providers>
            <Component {...pageProps} />
        </Providers>
    </>
;

export default MyApp;
