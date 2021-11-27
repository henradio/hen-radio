import styles from './styles.module.css';
import Link from 'next/link';
import { getTrimmedWallet } from '../../utilities/general';

const TrackLinks = ({track, walletAddress, name}) =>
    <span className={styles.trackRow_text}>
        <a
            href={`https://hicetnunc.art/objkt/${track.id}`}
            className={styles.trackRow_link}
        >
            <span className={styles.trackRow_title}>#{track.id} {track.title}</span>
        </a>
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
