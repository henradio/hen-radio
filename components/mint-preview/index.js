import styles from './styles.module.css'

const Preview = ({ title, description, cover, audio }) => {
  console.log(audio)
  return (

    <div className={styles.container}>
      <div className={styles.media}>
        <div>
          <img src={URL.createObjectURL(cover)} alt="Cover image" /><br />
          <audio src={URL.createObjectURL(audio)} controls />
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