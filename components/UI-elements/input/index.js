import React from 'react'
import styles from './styles.module.css'

export const Input = ({
  type = 'text',
  placeholder = 'placeholder',
  name = 'input-name-not-set',
  min,
  max,
  maxlength = 500,
  label,
  onChange = () => null,
  onBlur = () => null,
  onWheel = () => null,
  disabled,
  value,
  pattern
}) => (
  <div className={styles.container}>
    <label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        min={min}
        max={max}
        maxLength={maxlength}
        defaultValue={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        pattern={pattern}
        onWheel={onWheel}
      />
      <p>{label}</p>
    </label>
  </div>
)
