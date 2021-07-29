import Head from 'next/head';
import { playlists } from '../../playlists/playlists';
import PlaylistView from '../../components/views/playlist-view';

export const getStaticPaths = async() => {
    return {
        paths: playlists.map((p) => ({params: {slug: p.slug}})),
        fallback: false,
    };
};

export const getStaticProps = async({params}) => {
    const {slug} = params;

    return {props: {slug}};
};

const PlaylistsPage = ({slug}) => {
    const selectedPlaylist = playlists.find(p => p.slug === slug);
    const title = `${selectedPlaylist.name} | Hen Radio`;
    const description = selectedPlaylist.description || 'Curated playlist for Hen Radio';
    const image = 'https://hen.radio/images/hen-radio-logo-social.png';
    const url = `https://hen.radio/curated/${selectedPlaylist.slug}`;

    return <>
        <Head>
            <meta charSet="utf-8"/>
            <title>{title}</title>
            <meta name="description" content={description}/>
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
        <PlaylistView initialPlaylists={playlists} slug={slug}/>
    </>;
};

export default PlaylistsPage;


