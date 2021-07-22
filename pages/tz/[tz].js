import WalletView from '../../components/views/wallet-view';
import Head from 'next/head';
import Metadata from '../../components/head/metadata';
import getWalletsWithAudio from '../../api/get-wallets-with-audio';

export const getServerSideProps = async({params}) => {
    const wallets = await getWalletsWithAudio();

    return {props: {wallets}};
};

const Tz = ({wallets}) =>
    <>
        <Head>
            <meta charSet="utf-8"/>
            <title>Wallets | Hen Radio</title>
            <link rel="canonical" href={`http://hen.radio/tz`}/>
            <Metadata
                title={'Listen to Hen Radio'}
                description={'Hic et Nunc audio NFT audio player and playlists'}
                image={''}
                url={'https://hen.radio/tz'}
            />
        </Head>
        <WalletView wallets={wallets}/>
    </>
;

export default Tz;
