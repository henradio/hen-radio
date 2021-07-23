import '../styles/globals.css';
import Providers from '../components/layout/providers';
import Head from 'next/head';

const MyApp = ({Component, pageProps}) => {
    const title = 'Listen to Hen Radio';
    const description = 'Hic et Nunc NFT audio player, all tracks';
    const image = 'https://hen.radio/_next/image?url=%2Fimages%2Fplaylist-default.png&w=256&q=75';
    const url = 'https://hen.radio';

    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <title>Hen Radio</title>
                <link rel="canonical" href={`http://hen.radio`}/>
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
            <Providers>
                <Component {...pageProps} />
            </Providers>
        </>

    );
};

export default MyApp;
