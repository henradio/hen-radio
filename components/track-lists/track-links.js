import styles from './styles.module.css';
import Link from 'next/link';
import { getTrimmedWallet } from '../../utilities/general';

const TrackLinks = ({track, walletAddress, name}) =>
    <span className={styles.trackRow_text}>
        <a
            href={`https://objkt.com/asset/hicetnunc/${track.id}`}
            className={styles.trackRow_link}
        >#{track.id} {track.title}</a>
        <br/>
        By{' '}
        <span className={styles.trackRow_link}>
            <Link href={`/tz/${track.creator.walletAddress}`}>
                {`${name || ''} ${getTrimmedWallet(walletAddress)}`}
            </Link>
        </span>
    </span>
;

export default TrackLinks;
