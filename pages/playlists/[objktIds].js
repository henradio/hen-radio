import Head from 'next/head';
import AllTracksView from '../../components/views/all-tracks-view';
import playlistFetcher, {playlistApi} from '../../fetchers/playlist-fetcher';
import {SWRConfig} from 'swr';

export const getServerSideProps = async({params}) => {
    const {objktIds: objktIdStr} = params;
    const data = await playlistFetcher(playlistApi, objktIdStr);
    const swrKey = JSON.stringify([playlistApi, objktIdStr]);
    return {
        props: {
            objktIdStr,
            swrKey,
            fallback: {
                [swrKey]: data
            }
        }
    };
};

const PlaylistsPage = ({fallback, swrKey, objktIdStr}) => {
    const title = 'Listen to Hen Radio';
    const description = 'Hic et Nunc NFT audio player and playlists';
    const url = 'https://www.henradio.xyz/playlists';
    const image = 'https://www.henradio.xyz/images/hen-radio-logo-social.png';
    return (
        <SWRConfig
            value={{
                fallback,
                refreshInterval: 1000 * 60 * 15
            }}
        >
            <Head>
                <meta charSet="utf-8"/>
                <title>Playlist | Hen Radio |
                       NFT
                       Music Player</title>
                <meta name="description" content={description}/>
                <link
                    rel="canonical"
                    href={`http://www.henradio.xyz/playlists/${objktIdStr}`}
                />
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
            <AllTracksView swrKey={swrKey} fetcher={playlistFetcher}/>
        </SWRConfig>
    );
};

export default PlaylistsPage;
