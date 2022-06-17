import WalletView from '../../components/views/wallet-view';
import Head from 'next/head';
import getWalletsWithAudio from '../../api/get-wallets-with-audio';
import getObjktsCreatedBy from '../../api/get-objkts-created-by';
import WalletTrackList from '../../components/track-lists/wallet-track-list';
import getObjktsOwnedBy from '../../api/get-objkts-owned-by';
import {useRouter} from 'next/router';
import {getBlockedTracks, getBlockedWallets} from '../../api/get-blocked-lists';
import getTzProfileClaims from '../../api/get-tzprofile-claims';
import getProfile from '../../api/get-profile';
import Image from 'next/image';
import Profile from '../../components/profile';
import {getIpfsUrl} from '../../utilities/general';

export const getServerSideProps = async({params}) => {
    const {walletAddress} = params;
    const [allWallets, blockedWallets, blockedTracks] = await Promise.all([
        getWalletsWithAudio(),
        getBlockedWallets(),
        getBlockedTracks()
    ]);
    if(blockedWallets.includes(walletAddress)) {
        return {
            notFound: true
        };
    }
    const wallets = allWallets.filter(w => !blockedWallets.includes(w));
    const tracksCreated = await getObjktsCreatedBy(walletAddress);
    const tracksOwned = await getObjktsOwnedBy(walletAddress);
    const tracks = [...tracksCreated, ...tracksOwned]
        .filter(t => !blockedTracks.includes(t));
    const creator = walletAddress;
    const tzProfile = await getTzProfileClaims(walletAddress);
    const profile = await getProfile(walletAddress);
    return {
        props: {
            creator,
            tracks,
            wallets,
            profile,
            tzProfile
        }
    };
};

const Tz = ({creator, tracks, wallets, profile, tzProfile}) => {
    const {isFallback} = useRouter();

    if(isFallback) {
        if(typeof window !== 'undefined') {
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }

        return <p>Loading...</p>;
    }

    const title = profile?.name
        ? `Listen to ${profile?.name} on Hen Radio`
        : 'Listen to Hen Radio';
    const description = 'Hen Radio artist profile for Hic et Nunc audio NFTs';
    const image = profile?.metadata?.identicon
        ? getIpfsUrl(profile?.metadata?.identicon)
        : 'https://www.henradio.xyz/images/hen-radio-logo-social.png';
    const url = `https://www.henradio.xyz/tz/${creator}`;

    return <>
        <Head>
            <meta charSet="utf-8"/>
            <title>{profile?.name || 'Artist Profile'} | Hen Radio</title>
            <meta name="description" content={description}/>
            <link rel="canonical" href={url}/>
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
        <Profile tzProfile={tzProfile} profile={profile}/>
        <WalletTrackList tracks={tracks} walletAddress={creator} objkt={null}/>
        <WalletView wallets={wallets}/>
    </>;
};

export default Tz;
