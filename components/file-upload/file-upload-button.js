import {ErrorMessage} from 'formik';

const FileUploadButton = () => {
    return (
        <div>
            <div className={styles.uploadFormHolder}>
                <label
                    className={styles.labelUpload}
                    htmlFor="picture"
                >
                    Upload Image
                </label>
                <button
                    className={styles.buttonUpload}
                    onClick={handleClick}
                >
                    {currentImage && <img
                        className={styles.buttonImage}
                        src={currentImage}
                        alt="Current image"
                    />}
                    {isSaving ? (
                        <span className={styles.buttonSpinner}/>
                    ) : (
                        <span className={styles.buttonPlus}>+</span>
                    )}

                </button>
                <input
                    className={styles.inputFileUpload}
                    hidden
                    ref={hiddenFileInput}
                    type="file"
                    accept="image/*"
                    id="picture"
                    name="picture"
                    onChange={handleFileChange(
                        'picture',
                        ALLOWED_TYPES,
                        MAX_SIZE_BYTES
                    )}
                />
            </div>
            <div>
                <ErrorMessage name="picture"/>
            </div>
        </div>
    )
}
