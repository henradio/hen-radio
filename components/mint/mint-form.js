import { ErrorMessage, Field, Form, Formik } from 'formik';
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
    "audio/x-wav"
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
    thumbnail: yup.mixed().required(),
    license: yup.string(),
    licenseUrl: yup.string(),
});

const bytesToMb = bytes => bytes / 1_000_000;

const licenses = {
    NO: {
        title: 'No license / All rights reserved'
    },
    CCBY: {
        title: 'Attribution 4.0 International',
        url: "https://creativecommons.org/licenses/by/4.0/"
    },
    CCBYND: {
        title: 'Attribution-NoDerivatives 4.0 International',
        url: "http://creativecommons.org/licenses/by-nd/4.0/"
    },
    CCBYSA: {
        title: 'Attribution-ShareAlike 4.0 International',
        url: "https://creativecommons.org/licenses/by-sa/4.0/"
    },
    CCBYNC: {
        title: 'Attribution-NonCommercial 4.0 International',
        url: "https://creativecommons.org/licenses/by-nc/4.0/"
    },
    CCBYNCND: {
        title: 'Attribution-NonCommercial-NoDerivatives 4.0 International',
        url: "https://creativecommons.org/licenses/by-nc-nd/4.0/"
    },
    CCBYNCSA: {
        title: 'Attribution-NonCommercial-ShareAlike 4.0 International',
        url: "https://creativecommons.org/licenses/by-nc-sa/4.0/"
    },
    CC0: {
        title: 'Public Domain Dedication',
        url: "https://creativecommons.org/publicdomain/zero/1.0/"
    },
}

const MintForm = ({ handleSubmit, mintPayload }) => {

    const initialValues = {
        title: mintPayload?.title || '',
        description: mintPayload?.description || '',
        tags: mintPayload?.tags || '',
        amount: mintPayload?.amount || '',
        royalties: mintPayload?.royalties || '',
        audio: mintPayload?.audio || '',
        cover: mintPayload?.cover || '',
        thumbnail: mintPayload?.thumbnail || '',
        license: mintPayload?.license || '',
        licenseUrl: mintPayload?.licenseUrl || '',
    };

    const handleDropdownChange = (formik) => (event) => {
        let key = event.target.value;
        formik.setFieldValue('license', licenses[key].title);
        formik.setFieldValue('licenseUrl', licenses[key].url);
    };

    const handleFileChange = (name, allowedTypes, maxBytes, formik) =>
        (event) => {
            formik.setTouched({ [name]: true }, false);

            const fileObj = event.target.files && event.target.files[0];
            if (!fileObj) {
                const error = 'Missing file';
                formik.setFieldError(name, error);
                event.target.value = '';
                return;
            }

            if (!fileObj.type || !(allowedTypes.includes(fileObj.type))) {
                const mimetypes = allowedTypes.join(', ');
                const error = `You can only upload files with ${mimetypes} mimetypes`;
                formik.setFieldError(name, error);
                event.target.value = '';
                return;
            }

            if (fileObj.size > maxBytes) {
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
                            <ErrorMessage
                                component="span"
                                className={styles.errorMessage}
                                name="title"
                            />
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
                                component="textarea"
                            />
                            <ErrorMessage
                                component="span"
                                className={styles.errorMessage}
                                name="description"
                            />
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
                            <ErrorMessage
                                component="span"
                                className={styles.errorMessage}
                                name="tags"
                            />
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
                            <ErrorMessage
                                component="span"
                                className={styles.errorMessage}
                                name="amount"
                            />
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
                            <ErrorMessage
                                component="span"
                                className={styles.errorMessage}
                                name="royalties"
                            />
                        </div>
                        <div className={styles.formField}>
                            <label
                                className={styles.label}
                                htmlFor="audio"
                            >
                                Upload audio (mp3, ogg, wav, max 100MB)
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
                            <ErrorMessage
                                component="span"
                                className={styles.errorMessage}
                                name="audio"
                            />
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
                            <ErrorMessage
                                component="span"
                                className={styles.errorMessage}
                                name="cover"
                            />
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
                            <ErrorMessage
                                component="span"
                                className={styles.errorMessage}
                                name="thumbnail"
                            />
                        </div> <div className={styles.formField}>
                            <label
                                className={styles.label}
                                htmlFor={'license'}
                            >License</label>
                            <select
                                className={styles.dropdown}
                                onChange={handleDropdownChange(formik)}
                            >
                                <option value="NO">No License / All Rights Reserved</option>
                                <option value="CCBY">CC BY</option>
                                <option value="CCBYND">CC BY-ND</option>
                                <option value="CCBYSA">CC BY-SA</option>
                                <option value="CCBYNC">CC BY-NC</option>
                                <option value="CCBYNCND">CC BY-NC-ND</option>
                                <option value="CCBYNCSA">CC BY-NC-SA</option>
                                <option value="CC0">CCO (Public Domain)</option>
                            </select>
                            <div>
                                {formik.values.licenseUrl && <a href={formik.values.licenseUrl} target="_blank"><u>{formik.values.license}</u></a>}
                            </div>
                            <ErrorMessage
                                component="span"
                                className={styles.errorMessage}
                                name="license"
                            />
                        </div>
                        <button
                            className={styles.formButton}
                            type="submit"
                        >Preview
                        </button>
                        <p className={styles.smallPrint}
                        >Copyminting is minting other artists work without their consent.
                            <br />This will result in an immediate and irrevocable ban.
                            <br />Report copyminting on our or Hen's Discord.</p>
                    </Form>
                }
            </Formik>
        </div>
    );
};

export default MintForm;
