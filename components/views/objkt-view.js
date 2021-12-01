import TrackList from '../track-lists/track-list';
import useRadio from '../../hooks/use-radio';
import {useEffect} from 'react';
import usePlaylist from '../../hooks/use-playlist';
import {audio, ipfsUrls} from '../../constants';
import styles from './styles.module.css';
import {getIpfsUrl, getTrimmedWallet} from '../../utilities/general';
import useTrack from '../../hooks/use-track';
import Image from 'next/image';
import AddToPlaylist from '../add-to-playlist/add-to-playlist';
import LinkButton from '../radio-player/buttons/link-button';
import Link from 'next/link';
import Swaps from '../swaps';
import Head from 'next/head';
import useSWR from 'swr';
import objktFetcher, {objktFetcherApi} from '../../fetchers/objkt-fetcher';
import serialise from '../../fetchers/serialiser';

const ObjktView = ({objktId}) => {
    const {data} = useSWR([objktFetcherApi, objktId], objktFetcher, {use: [serialise]});
    const {walletAddress, objkt, tracks} = data;

    const {
        controls,
        isTrackPlaying
    } = useRadio();

    const {setTracks} = usePlaylist();
    const {trackState} = useTrack();

    if(audio) {
        audio.onended = () => {
            if(!tracks.length) return;
            controls.next(tracks)();
        };
    }

    useEffect(() => {
        setTracks(tracks);
        if(trackState.currentTrack === null) {
            const foundIndex = tracks.findIndex(t => t.id === Number(objkt.id));
            controls.initialiseTrack(tracks)(
                foundIndex !== -1 ? foundIndex : 0)();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tracks]);

    if(!tracks) return <p>Loading...</p>;

    const coverHash = objkt?.displayUri?.slice(7) || '';
    const srcSet = ipfsUrls.map((url) => `${url}/${coverHash}`).join(', ');

    const byName = objkt.creator?.name
        ? ` by ${objkt.creator.name}`
        : ` by ${getTrimmedWallet(walletAddress)}`;
    const title = objkt
        ? `Listen to ${objkt.title}${byName} on Hen Radio`
        : 'Not found';
    const description = objkt?.description
        ? `${objkt.description}`
        : 'An audio objkt with this id could not be found.';
    const image = 'https://hen.radio/images/hen-radio-logo-social.png';
    const url = `https://hen.radio/objkt/${objkt.id}`;

    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <title>{objkt.title + byName} | Hen Radio | NFT Music
                                              Player</title>
                <meta name="description" content={description}/>
                <link rel="canonical" href={`http://hen.radio/${objkt.id}`}/>
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
            <div className={styles.objktContainer}>
                <div className={styles.objktImageHolder}>
                    <Image
                        src={objkt?.displayUri
                            ? getIpfsUrl(objkt.displayUri)
                            : '/images/playlist-default.png'}
                        srcSet={objkt?.displayUri
                            ? srcSet
                            : '/images/playlist-default.png'}
                        width={180}
                        height={180}
                        alt=""
                        className={styles.objktImage}
                    />
                </div>
                <div className={styles.objktMetaRow}>
                    <div>
                        <p>
                            <a href={`https://hicetnunc.art/objkt/${objkt.id}`}>
                                #{objkt.id}
                            </a>
                            <br/>
                            <Link href={`/objkt/${objkt.id}`}>
                                <a>
                                    <strong>{objkt.title}</strong>
                                </a>
                            </Link>
                            <br/>
                            <span>
                                by&nbsp;
                                <Link href={`/tz/${objkt.creator.walletAddress}`}>
                                    <a>
                                        {getTrimmedWallet(
                                            objkt.creator.walletAddress)} {objkt.creator.name}
                                    </a>
                                </Link>
                            </span>
                        </p>
                        {objkt?.availability ? (
                            <div>
                                <p className={styles.objktPriceText}>Editions: {objkt.availability}</p>
                                <p className={styles.objktPriceText}>
                                    {objkt.price
                                        ? `Price: ${objkt.price}`
                                        : null}
                                </p>
                            </div>
                        ) : null}
                        <div className={styles.objktActionsBar}>
                            {objkt ? <AddToPlaylist track={objkt}/> : null}
                            {objkt ? <LinkButton track={objkt}/> : null}
                        </div>
                    </div>
                </div>
            </div>
            <Swaps objktId={objktId}/>
            <h2 className={styles.subTitle}>All tracks by {getTrimmedWallet(
                walletAddress)} {trackState.currentTrack?.creator?.name ||
            ''}</h2>
            <TrackList
                tracks={tracks}
                isTrackPlaying={isTrackPlaying}
            />
        </>
    );
};

export default ObjktView;


