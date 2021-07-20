import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import WalletTrackList from '../track-lists/wallet-track-list';
import styles from './styles.module.css';
import useWallet from '../../hooks/use-wallet';
import getUserMetadataByWalletId from '../../api/get-user-metadata-by-wallet-id';

const WalletView = ({wallets}) => {
    const router = useRouter();
    const {tz} = router.query;
    const {walletId, setWalletId, objkts, isLoading, setIsLoading, error} = useWallet();
    const [walletsWithAudio, setWalletsWithAudio] = useState([]);

    useEffect(() => {
        if(!tz || tz === walletId) return;
        setWalletId(tz);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tz]);

    useEffect(() => {
        (async() => {
            const walletsWithMetadata = (await Promise.allSettled(
                [...wallets]
                    .map(id => getUserMetadataByWalletId(id)),
            ))
                .filter(res => res.status === 'fulfilled')
                .map((res) => ({
                    ...res.value.data,
                    walletId: res.value.config.url.split('/')[5],
                }));

            setWalletsWithAudio(walletsWithMetadata);
        })();
    }, [wallets]);

    const [walletIdInput, setWalletIdInput] = useState('');

    const handleWalletIdChange = (event) => {
        setWalletIdInput(event.target.value);
    };

    const handleWalletIdSelect = (walletId) => () => {
        setWalletId(walletId);
    };

    const handleGetTracks = () => {
        setWalletId(walletIdInput);
        setWalletIdInput('');
        setIsLoading(true);
        if(walletIdInput) history.push(`/tz/${walletIdInput}`);
    };

    return (
        <>
            {objkts ? (
                <>
                    {isLoading ? <p>Loading...</p> : <WalletTrackList/>}
                </>
            ) : (<>{isLoading ? <p>Loading...</p> : null}</>)}
            <div className={styles.walletIdEntry}>
                <input
                    className={styles.walletInput}
                    value={walletIdInput}
                    placeholder={'Enter a wallet address'}
                    onChange={handleWalletIdChange}
                />
                <button
                    className={styles.button_getObjktData}
                    onClick={handleGetTracks}
                    disabled={!walletIdInput}
                >Get Tracks
                </button>
            </div>
            {error && <p className={styles.errorText}>{error}</p>}
            <div>
                <h2 className={styles.walletTitle}>Wallets</h2>
                {walletsWithAudio.map((w) => (
                    <div
                        key={w.walletId}
                        className={styles.walletRow}
                    >
                        <button
                            className={styles.walletRow_button}
                            onClick={handleWalletIdSelect(w.walletId)}
                        >{w.walletId}</button>
                        {w.twitter ? <div>
                            <a
                                className={styles.walletRow_alias}
                                href={`https://twitter.com/${w.twitter}`}
                            >@{w.twitter}</a>
                        </div> : null}
                        <img
                            alt={'Artist\'s avatar'}
                            className={styles.walletRow_avatar}
                            src={`https://services.tzkt.io/v1/avatars2/${w.walletId}`}
                        />
                    </div>
                ))}
            </div>
        </>
    );
};

export default WalletView;


