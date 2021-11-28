import AllTracksView from '../components/views/all-tracks-view';
import Head from 'next/head';
import {SWRConfig} from 'swr';
import allTracksFetcher, {allTracksApi} from '../fetchers/all-tracks-fetcher';
import Pagination from '../components/pagination';

export const getServerSideProps = async() => {
    const data = await allTracksFetcher();
    return {
        props: {
            fallback: {
                [JSON.stringify([allTracksApi, 1, null])]: data
            }
        }
    };
};

const AllTracksPage = ({fallback}) => {
    const title = 'Listen to Hen Radio';
    const description = 'Hic et Nunc NFT audio player, all tracks';
    const image = 'https://hen.radio/images/hen-radio-logo-social.png';
    const url = 'https://hen.radio';

    return (
        <SWRConfig
            value={{
                fallback,
                refreshInterval: 3000
            }}
        >
            <Head>
                <meta charSet="utf-8"/>
                <title>Hen Radio | NFT Music Player</title>
                <meta name="description" content={description}/>
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
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <AllTracksView/>
            <Pagination page={1} search={null}/>
        </SWRConfig>
    );
};

export default AllTracksPage;


