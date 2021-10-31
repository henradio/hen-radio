import React from 'react'
import { AudioComponent } from './audio'
import styles from './styles.module.css'


export const Preview = ({ title, description, mimeType, previewUri, tags }) => {
  return (
    <div className={styles.container}>
      <div className={styles.media}>
      parsedArtifactUri = HashToURL(artifactUri, 'IPFS')
      parsedDisplayUri = HashToURL(displayUri, 'IPFS')
      return (
          <AudioComponent
            artifactUri={parsedArtifactUri}
            displayUri={parsedDisplayUri}
            previewUri={previewUri}
            preview={preview}
            onDetailView={interactive}
            displayView={displayView}
          />
      )
      </div>
      <div className={styles.info}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  )
}
