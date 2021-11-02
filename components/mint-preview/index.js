import React, { Image } from 'react'
import { getIpfsUrl } from '../../utilities/general';
import styles from './styles.module.css'


export const Preview = ({ title, description, rawAudio, cover, thumb, tags }) => {
  return (

    <div className={styles.container}>
      <div className={styles.media}>
        <div>
          <Image src={cover} alt="" /><br />
          <audio src={rawAudio} controls />
        </div>

      </div>
      <div className={styles.info}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  )
}
