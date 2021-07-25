import styles from '../views/styles.module.css';
import Link from 'next/link';
import Image from 'next/image';

const WalletList = ({wallets}) => <div>
    <h2 className={styles.subTitle}>Wallets</h2>
    {wallets.map((w) => (
        <div key={w.walletId} className={styles.walletRow}>
                <span className={styles.walletRow_button}>
                    <Link href={`/tz/${w.walletId}`}>{w.walletId}</Link>
                </span>
            {w.twitter ? <div>
                <a
                    className={styles.walletRow_alias}
                    href={`https://twitter.com/${w.twitter}`}
                >@{w.twitter}</a>
            </div> : null}
            <div className={styles.trackRow_avatar}>
                <Image
                    width={26}
                    height={26}
                    alt={'Artist\'s avatar'}
                    src={`https://services.tzkt.io/v1/avatars2/${w.walletId}`}
                />
            </div>
        </div>
    ))}
</div>;

export default WalletList;
