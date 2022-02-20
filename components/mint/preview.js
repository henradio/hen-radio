import styles from './styles.module.css';

const Preview = ({mintPayload, handleBack, triggerMint, isMinting}) => {
    const {title, description, cover, audio, royalties, license} = mintPayload;
    
    return (
        <div className={styles.column}>
            <p>
                <button onClick={handleBack}>
                    back
                </button>
            </p>
            <div className={styles.media}>
                <img
                    className={styles.image}
                    src={URL.createObjectURL(cover)}
                    alt="Cover image"
                />
                <audio
                    src={URL.createObjectURL(audio)}
                    controls
                />
            </div>
            <div className={styles.info}>
                <h2 className={styles.infoTitle}>Title</h2>
                <div className={styles.infoText}>{title}</div>
                <h2 className={styles.infoTitle}>Description</h2>
                <div className={styles.infoText}>{description}</div>
                <h2 className={styles.licenseTitle}>License</h2>
                <div className={styles.license}>{license}</div>
            </div>
            {!isMinting && <button
                className={styles.formButton}
                onClick={triggerMint}
            >
                mint OBJKT
            </button>}
            <p>this operation costs 0.08~ tez<br/>Your royalties upon each sale are {royalties}%</p>
        </div>
    );
};

export default Preview;
