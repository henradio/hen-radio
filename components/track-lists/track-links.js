import styles from './styles.module.css';
import Link from 'next/link';

const TrackLinks = ({track, creator, alias}) =>
    <span className={styles.trackRow_text}>
        <a
            href={`https://hicetnunc.xyz/objkt/${track.id}`}
            className={styles.trackRow_link}
        >#{track.id} {track.name}</a>
        <br/>
        By{' '}
        <span className={styles.trackRow_link}>
            <Link href={`/tz/${track.creator}`}>
                {`${alias || ''} ${creator}`}
            </Link>
        </span>
    </span>
;

export default TrackLinks;
