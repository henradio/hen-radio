import { useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import useMint from '../hooks/use-mint';
import Preview from '../components/mint-preview'

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
const bytesToMb = bytes => bytes / 1_000_000;

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

const Mint = () => {

    const { handleMint } = useMint();
    const [step, setStep] = useState(0);
    const [mintPayload, setMintPayload] = useState();

    const handleSubmit = (values) => {
        setMintPayload(values);
        setStep(1);
    };

    const triggerMint = () => {
        handleMint(mintPayload);
    };

    const handleFileChange = (name, allowedTypes, maxBytes, formik) =>
        (event) => {
            formik.setTouched({ [name]: true }, false);

            const fileObj = event.target.files && event.target.files[0];
            if (!fileObj) {
                const error = 'Missing file'
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

    return <>
        {step === 0 && (
            <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {(formik) =>
                    <Form>
                        <>{/*JSON.stringify(formik.errors)*/}</>
                        <div>
                            <label htmlFor={'title'}>Title</label>
                            <Field
                                id="title"
                                name="title"
                                type="text"
                            />
                            <ErrorMessage name="title" />
                        </div>
                        <div>
                            <label htmlFor={'description'}>Description</label>
                            <Field
                                id="description"
                                name="description"
                                type="text"
                            />
                            <ErrorMessage name="description" />
                        </div>
                        <div>
                            <label htmlFor={'tags'}>Tags</label>
                            <Field
                                id="tags"
                                name="tags"
                                type="text"
                                placeholder="tags (comma separated. example: illustration, digital)"
                            />
                            <ErrorMessage name="tags" />
                        </div>
                        <div>
                            <label htmlFor={'amount'}>Editions
                                (1–{MAX_EDITIONS})</label>
                            <Field
                                id="amount"
                                name="amount"
                                type="number"
                                min={1}
                                max={MAX_EDITIONS}
                            />
                            <ErrorMessage name="amount" />
                        </div>
                        <div>
                            <label htmlFor={'royalties'}>Royalties</label>
                            <Field
                                id="royalties"
                                name="royalties"
                                type="number"
                                min={MIN_ROYALTIES}
                                max={MAX_ROYALTIES}
                                placeholder={`royalties after each sale (between ${MIN_ROYALTIES}-${MAX_ROYALTIES}%)`}
                            />
                            <ErrorMessage name="royalties" />
                        </div>
                        <div>
                            <label htmlFor="audio">Upload audio (mp3, ogg, wav,
                                flac, max 100MB)</label>
                            <input
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
                            <ErrorMessage name="audio" />
                        </div>
                        <div>
                            <label htmlFor="cover">Upload cover (png, jpeg, gif, max
                                10MB)</label>
                            <input
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
                            <ErrorMessage name="cover" />
                        </div>
                        <div>
                            <label htmlFor="thumbnail">Upload thumbnail (png, jpeg,
                                gif, max 1MB)</label>
                            <input
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
                            <ErrorMessage name="thumbnail" />
                        </div>
                        <button type="submit">Preview</button>
                    </Form>
                }
            </Formik>
        )}
        {step === 1 && (
            <>
                <div style={{ display: 'flex' }}>
                    <button onClick={() => setStep(0)}>
                        <strong>back</strong>
                    </button>
                </div>



                <Preview
                    title={mintPayload.title}
                    description={mintPayload.description}
                    cover={mintPayload.cover}
                    audio={mintPayload.audio}
                />



                <button onClick={triggerMint}>
                    mint OBJKT
                </button>



                <p>this operation costs 0.08~ tez</p>
                <p>Your royalties upon each sale are {mintPayload.royalties}%</p>
            </>
        )}
    </>;
}
    ;

export default Mint;
