import styles from './styles.module.css'

const Preview = ({ title, description, cover, rawAudio }) => {
  return (

    <div className={styles.container}>
      <div className={styles.media}>
        <div>
          <img src={URL.createObjectURL(cover)} alt="Cover image" /><br />
          <audio src={URL.createObjectURL(rawAudio)} controls />
        </div>

      </div>
      <div className={styles.info}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>

    </div>
  )
}

export default Preview