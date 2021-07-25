import PlaylistView from '../components/views/playlist-view';
import Head from 'next/head';

const PlaylistsPage = () => {
    const title = 'Listen to Hen Radio';
    const description = 'Hic et Nunc NFT audio player and playlists';
    const image = 'https://hen.radio/images/hen-radio-logo-social.png';
    const url = 'https://hen.radio/playlists';

    return <>
        <Head>
            <meta charSet="utf-8"/>
            <title>Playlists | Hen Radio | NFT Music Player</title>
            <link rel="canonical" href={`http://hen.radio/playlists`}/>
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
        <PlaylistView/>
    </>;
};

export default PlaylistsPage;


