import TrackList from '../track-lists/track-list';
import useRadio from '../../hooks/use-radio';
import {useEffect, useState} from 'react';
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

const ObjktView = ({walletAddress, objkt, tracks}) => {
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

    console.log(objkt);

    const coverHash = objkt?.displayUri?.slice(7) || '';
    const srcSet = ipfsUrls.map((url) => `${url}/${coverHash}`).join(', ');
    return (
        <>
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
                                {objkt.price ? `Price: ${objkt.price}`: null}
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
            <Swaps objkt={objkt} />
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


