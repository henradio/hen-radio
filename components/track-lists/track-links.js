import styles from './styles.module.css';
import Link from 'next/link';
import { getTrimmedWallet } from '../../utilities/general';

const TrackLinks = ({track, walletAddress, name}) =>
    <p className={styles.trackRow_text}>
        <Link href={`/objkt/${track.id}`}>
            <a className={styles.trackRow_link}>
                <span className={styles.trackRow_title}>#{track.id} {track.title}</span>
            </a>
        </Link>
        <br/>
        By{' '}
        <span className={styles.trackRow_link}>
            <Link href={`/tz/${track.creator.walletAddress}`}>
                {`${name || ''} ${getTrimmedWallet(walletAddress)}`}
            </Link>
        </span>
    </p>
;

export default TrackLinks;
