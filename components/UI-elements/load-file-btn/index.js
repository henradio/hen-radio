import React, { useState } from 'react'
import styles from './styles.module.css'

const Buffer = require('buffer').Buffer

export const Upload = ({
  label,
  allowedTypes,
  allowedTypesLabel,
  onChange = () => null,
}) => {
  const [title, setTitle] = useState(label)

  const onFileChange = async (e) => {
    const { files } = e.target
    const file = files[0]

    setTitle(file.name)
    ////////////// TODO get MIME type
    const mimeType = "audio/wav"
    ////////
    const buffer = Buffer.from(await file.arrayBuffer())

    // set reader for preview
    const reader = new FileReader()
    reader.addEventListener('load', (e) => {
      onChange({ title, mimeType, file, buffer, reader: e.target.result })
    })
    reader.readAsDataURL(file)
  }

  const props = {
    type: 'file',
    name: 'file',
  }

  if (allowedTypes) {
    props['accept'] = allowedTypes.join(',')
  }

  return (
    <div className={styles.container}>
      <label>
        {title}
        <input {...props} onChange={onFileChange} />
      </label>
    </div>
  )
}
