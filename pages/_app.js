import '../styles/globals.css';
import Providers from '../components/layout/providers';
import Head from 'next/head';
import NProgress from 'nprogress';
import {useEffect} from 'react';
import {useRouter} from 'next/router';

const MyApp = ({Component, pageProps}) => {
        const router = useRouter();

        useEffect(() => {
            const handleStart = (url) => {
                NProgress.start();
            };
            const handleStop = () => {
                NProgress.done();
            };

            router.events.on('routeChangeStart', handleStart);
            router.events.on('routeChangeComplete', handleStop);
            router.events.on('routeChangeError', handleStop);

            return () => {
                router.events.off('routeChangeStart', handleStart);
                router.events.off('routeChangeComplete', handleStop);
                router.events.off('routeChangeError', handleStop);
            };
        }, [router]);

        return <>
            <Head>
                <title>Hen Radio | NFT Music Player</title>
                <link rel="icon" href="/favicon.png"/>
            </Head>
            <Providers>
                <Component {...pageProps} />
            </Providers>
        </>;
    }
;

export default MyApp;
