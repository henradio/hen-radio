import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as yup from 'yup';
import styles from './styles.module.css';

const MAX_EDITIONS = 10000;
const MIN_ROYALTIES = 10;
const MAX_ROYALTIES = 25;
const MAX_AUDIO_SIZE_BYTES = 1_000_000_00;
const MAX_COVER_SIZE_BYTES = 1_000_000_0;
const MAX_THUMB_SIZE_BYTES = 1_000_000;
const ALLOWED_AUDIO_TYPES = [
    'audio/wav',
    'audio/ogg',
    'audio/mpeg',
    'audio/flac'
];
const ALLOWED_IMAGE_TYPES = [
    'image/png',
    'image/jpeg',
    'image/gif'
];

const validationSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    tags: yup.string().required(),
    amount: yup.number()
        .min(1)
        .max(MAX_EDITIONS),
    royalties: yup.number()
        .min(MIN_ROYALTIES)
        .max(MAX_ROYALTIES),
    audio: yup.mixed().required(),
    cover: yup.mixed().required(),
    thumbnail: yup.mixed().required()
});

const initialValues = {
    title: '',
    description: '',
    tags: '',
    amount: '',
    royalties: '',
    audio: '',
    cover: '',
    thumbnail: ''
};

const bytesToMb = bytes => bytes / 1_000_000;

const MintForm = ({handleSubmit}) => {

    const handleFileChange = (name, allowedTypes, maxBytes, formik) =>
        (event) => {
            formik.setTouched({[name]: true}, false);

            const fileObj = event.target.files && event.target.files[0];
            if(!fileObj) {
                const error = 'Missing file';
                formik.setFieldError(name, error);
                event.target.value = '';
                return;
            }

            if(!fileObj.type || !(allowedTypes.includes(fileObj.type))) {
                const mimetypes = allowedTypes.join(', ');
                const error = `You can only upload files with ${mimetypes} mimetypes`;
                formik.setFieldError(name, error);
                event.target.value = '';
                return;
            }

            if(fileObj.size > maxBytes) {
                const fileSize = bytesToMb(fileObj.size).toFixed(2);
                const error = `File is too large, file size is ${fileSize}MB, maximum allowed size - 1MB.`;
                formik.setFieldError(name, error);
                event.target.value = '';
                return;
            }

            formik.setFieldValue(name, fileObj);
        };

    return (
        <div className={styles.column}>
            <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {(formik) =>
                    <Form>
                        <div className={styles.formField}>
                            <label
                                className={styles.label}
                                htmlFor={'title'}
                            >Title</label>
                            <Field
                                className={styles.input}
                                id="title"
                                name="title"
                                type="text"
                            />
                            <ErrorMessage name="title"/>
                        </div>
                        <div className={styles.formField}>
                            <label
                                className={styles.label}
                                htmlFor={'description'}
                            >Description</label>
                            <Field
                                className={styles.input}
                                id="description"
                                name="description"
                                type="text"
                            />
                            <ErrorMessage name="description"/>
                        </div>
                        <div className={styles.formField}>
                            <label
                                className={styles.label}
                                htmlFor={'tags'}
                            >Tags</label>
                            <Field
                                className={styles.input}
                                id="tags"
                                name="tags"
                                type="text"
                                placeholder="tags (comma separated. example: illustration, digital)"
                            />
                            <ErrorMessage name="tags"/>
                        </div>
                        <div className={styles.formField}>
                            <label
                                className={styles.label}
                                htmlFor={'amount'}
                            >
                                Editions (1–{MAX_EDITIONS})
                            </label>
                            <Field
                                className={styles.input}
                                id="amount"
                                name="amount"
                                type="number"
                                min={1}
                                max={MAX_EDITIONS}
                            />
                            <ErrorMessage name="amount"/>
                        </div>
                        <div className={styles.formField}>
                            <label
                                className={styles.label}
                                htmlFor={'royalties'}
                            >Royalties</label>
                            <Field
                                className={styles.input}
                                id="royalties"
                                name="royalties"
                                type="number"
                                min={MIN_ROYALTIES}
                                max={MAX_ROYALTIES}
                                placeholder={`royalties after each sale (between ${MIN_ROYALTIES}-${MAX_ROYALTIES}%)`}
                            />
                            <ErrorMessage name="royalties"/>
                        </div>
                        <div className={styles.formField}>
                            <label
                                className={styles.label}
                                htmlFor="audio"
                            >
                                Upload audio (mp3, ogg, wav, flac, max 100MB)
                            </label>
                            <input
                                className={styles.input}
                                id="audio"
                                name="audio"
                                type="file"
                                onChange={handleFileChange(
                                    'audio',
                                    ALLOWED_AUDIO_TYPES,
                                    MAX_AUDIO_SIZE_BYTES,
                                    formik
                                )}
                                accept="audio/*"
                            />
                            <ErrorMessage name="audio"/>
                        </div>
                        <div className={styles.formField}>
                            <label
                                className={styles.label}
                                htmlFor="cover"
                            >
                                Upload cover (png, jpeg, gif, max 10MB)
                            </label>
                            <input
                                className={styles.input}
                                id="cover"
                                name="cover"
                                type="file"
                                onChange={handleFileChange(
                                    'cover',
                                    ALLOWED_IMAGE_TYPES,
                                    MAX_COVER_SIZE_BYTES,
                                    formik
                                )}
                                accept="image/*"
                            />
                            <ErrorMessage name="cover"/>
                        </div>
                        <div className={styles.formField}>
                            <label
                                className={styles.label}
                                htmlFor="thumbnail"
                            >
                                Upload thumbnail (png, jpeg, gif, max 1MB)
                            </label>
                            <input
                                className={styles.input}
                                id="thumbnail"
                                name="thumbnail"
                                type="file"
                                onChange={handleFileChange(
                                    'thumbnail',
                                    ALLOWED_IMAGE_TYPES,
                                    MAX_THUMB_SIZE_BYTES,
                                    formik
                                )}
                                accept="image/*"
                            />
                            <ErrorMessage name="thumbnail"/>
                        </div>
                        <button
                            className={styles.formButton}
                            type="submit"
                        >Preview</button>
                    </Form>
                }
            </Formik>
        </div>
    );
};

export default MintForm;
