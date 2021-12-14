import styles from './styles.module.css';
import Link from 'next/link';
import { getTrimmedWallet } from '../../utilities/general';
import useStation from '../../hooks/use-station';

const TrackLinks = ({track, walletAddress, name}) => {
    const {stationQuery} = useStation();

return(
    <p className={styles.trackRow_text}>
        <Link href={{pathname:`/objkt/${track.id}`, query:stationQuery}}>
            <a className={styles.trackRow_link}>
                <span className={styles.trackRow_title}>#{track.id} {track.title}</span>
            </a>
        </Link>
        <br/>
        By{' '}
        <span className={styles.trackRow_link}>
            <Link href={{pathname:`/tz/${track.creator.walletAddress}`, query:stationQuery}}>
                {`${name || ''} ${getTrimmedWallet(walletAddress)}`}
            </Link>
        </span>
    </p>
);
};

export default TrackLinks;
