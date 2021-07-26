import { useEffect, useState } from 'react';
import getUserMetadataByWalletId from '../../api/get-user-metadata-by-wallet-id';
import WalletList from '../wallets/wallet-list';
import styles from './styles.module.css';

const WalletView = ({wallets}) => {
    const [walletsWithAudio, setWalletsWithAudio] = useState([]);
    const [filteredWallets, setFilteredWallets] = useState([]);

    useEffect(() => {
        (async() => {
            const walletsWithMetadata = (
                await Promise.allSettled([...wallets].map(id => getUserMetadataByWalletId(id))))
                .filter(res => res.status === 'fulfilled')
                .map((res) => ({
                    ...res.value.data,
                    walletId: res.value.config.url.split('/')[5],
                }));

            setWalletsWithAudio(walletsWithMetadata);
            setFilteredWallets(walletsWithMetadata);
        })();
    }, [wallets]);

    const [walletIdInput, setWalletIdInput] = useState('');

    const handleWalletIdChange = (event) => {
        const search = event.target.value.toLowerCase();
        setFilteredWallets(walletsWithAudio.filter(w => (
                w.walletId.toLowerCase().includes(search) ||
                w.twitter?.toLowerCase().includes(search) ||
                w.alias?.toLowerCase().includes(search)
            ),
        ));
        setWalletIdInput(event.target.value);
    };

    return (
        <>
            <div className={styles.walletIdEntry}>
                <input
                    className={styles.walletInput}
                    value={walletIdInput}
                    placeholder={'Filter on wallet address and name'}
                    onChange={handleWalletIdChange}
                />
            </div>
            <WalletList wallets={filteredWallets}/>
        </>
    );
};

export default WalletView;
