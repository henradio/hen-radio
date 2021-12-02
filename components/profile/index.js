import Image from 'next/image';
import styles from './styles.module.css';
import {getIpfsUrl, getTrimmedWallet} from '../../utilities/general';

const TzProfile = ({tzProfile}) => {
    if(!tzProfile || !Object.entries(tzProfile).length) return null;
    return (
        <p className={styles.text}>
            {tzProfile?.['twitter'] && <span>
                <a href={tzProfile['twitter'].link}>@{tzProfile['twitter'].username}</a>
            </span>}
        </p>
    )
};

const Profile = ({tzProfile, profile}) => {
    if(!profile) return null;
    return (
        <div className={styles.profileContainer}>
            <div className={styles.imageHolder}>
                <Image
                    width={180}
                    height={180}
                    src={getIpfsUrl(profile?.metadata?.identicon) || '/images/playlist-default.png'}
                    alt=""
                />
            </div>
            <div className={styles.profileMetadata}>
                {(profile?.name || tzProfile?.basic?.alias) && <h2 className={styles.title}>{profile?.name || tzProfile?.basic?.alias}</h2>}
                <p className={styles.text}><a href={`https://tzkt.io/${profile?.address}/operations`}>{getTrimmedWallet(profile.address)}</a></p>
                {(profile.metadata?.description || tzProfile?.basic?.description) && <p className={styles.text}>{profile.metadata.description}</p>}
                <TzProfile tzProfile={tzProfile} />
            </div>
        </div>
    );
};

export default Profile;
