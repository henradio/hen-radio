import AllTracksView from '../components/views/all-tracks-view';
import Head from 'next/head';
import {SWRConfig} from 'swr';
import allTracksFetcher, {allTracksApi} from '../fetchers/all-tracks-fetcher';
import Pagination from '../components/pagination';

export const getServerSideProps = async() => {
    const data = await allTracksFetcher();
    const swrKey = JSON.stringify([allTracksApi, 1, null]);
    return {
        props: {
            swrKey,
            fallback: {
                [swrKey]: data
            }
        }
    };
};

const AllTracksPage = ({fallback, swrKey}) => {
    const title = 'Listen to Hen Radio';
    const description = 'Hic et Nunc NFT audio player, all tracks';
    const image = 'https://www.henradio.xyz/images/hen-radio-logo-social.png';
    const url = 'https://www.henradio.xyz';

    return (
        <SWRConfig
            value={{
                fallback,
                refreshInterval: 1000 * 60 * 15
            }}
        >
            <Head>
                <meta charSet="utf-8"/>
                <title>Hen Radio | NFT Music Player</title>
                <meta name="description" content={description}/>
                <link rel="canonical" href={`http://www.henradio.xyz`}/>
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
            <AllTracksView swrKey={swrKey} fetcher={allTracksFetcher}/>
            <Pagination page={1} search={null}/>
        </SWRConfig>
    );
};

export default AllTracksPage;


