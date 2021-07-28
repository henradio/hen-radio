import styles from './styles.module.css';
import Image from 'next/image';
import { getIpfsUrl } from '../../utilities/general';

const TrackRowAvatar = (track) =>
    <div className={styles.trackRow_avatar}>
        <Image
            width={26}
            height={26}
            alt={'Artist\'s avatar'}
            src={track.displayUri
                ? getIpfsUrl(track.displayUri)
                : '/images/playlist-default.png'}
        />
    </div>;
