import { useState } from 'react'
import Preview from '../components/mint-preview'
import useMint from '../hooks/use-mint';


const Mint = () => {

    const MAX_EDITIONS = 10000;
    const MIN_ROYALTIES = 10;
    const MAX_ROYALTIES = 25;
    const MAX_FILE_SIZE_BYTES = 100000000;
    const MAX_COVER_SIZE_BYTES = 10000000;
    const MAX_THUMB_SIZE_BYTES = 1000000;
    const bytesToMb = bytes => bytes / 1000000;

    const { handleMint } = useMint();

    const [step, setStep] = useState(0)
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [rawAudio, setRawAudio] = useState();
    const [cover, setCover] = useState();
    const [thumbnail, setThumbnail] = useState();
    const [tags, setTags] = useState('');
    const [fileType, setFileType] = useState();
    const [amount, setAmount] = useState(1)
    const [royalties, setRoyalties] = useState(10)
    const [fileError, setFileError] = useState();

    const handleFileChange = (e) => {
        const fileObj = e.target.files[0]


        if (fileObj.size > MAX_FILE_SIZE_BYTES) {


            setFileError(`File is too large, file size is ${bytesToMb(
                fileObj.size,
            ).toFixed(2)} MB, maximum allowed size - 1 MB.`)

            return;
        }

        setFileError(null)
        setRawAudio(fileObj)

    };

    const handleCoverUpload = async (e) => {
        console.log(e.target.files)
        const coverObj = e.target.files[0]

        if (coverObj.size > MAX_COVER_SIZE_BYTES) {


            setFileError(`File is too large, file size is ${bytesToMb(
                coverObj.size,
            ).toFixed(2)} MB, maximum allowed size - 1 MB.`)

            return;
        }

        setCover(coverObj)

    }

    const handleThumbUpload = (e) => {

        const thumbObj = e.target.files[0]
        if (thumbObj.size > MAX_THUMB_SIZE_BYTES) {


            setFileError(`File is too large, file size is ${bytesToMb(
                thumbObj.size,
            ).toFixed(2)} MB, maximum allowed size - 1 MB.`)

            return;
        }
        setThumbnail(thumbObj)
    }

    return <>

        {step === 0 && (

            <>
                <form>
                    <input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="title"
                        label="title"
                        value={title}
                    />
                    <input
                        type="text"
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="description"
                        label="description"
                        value={description}
                    />

                    <input
                        type="text"
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="tags (comma separated. example: illustration, digital)"
                        label="tags"
                        value={tags}
                    />

                    <input
                        type="number"
                        min={1}
                        max={MAX_EDITIONS}
                        onChange={(e) => setAmount(e.target.value)}
                        onBlur={(e) => {
                            setAmount(e.target.value)
                        }}
                        placeholder={`editions (no. editions, 1-${MAX_EDITIONS})`}
                        label="editions"
                        value={amount}
                    />

                    <input
                        type="number"
                        min={MIN_ROYALTIES}
                        max={MAX_ROYALTIES}
                        onChange={(e) => setRoyalties(e.target.value)}
                        onBlur={(e) => {
                            setRoyalties(e.target.value)
                        }}
                        placeholder={`royalties after each sale (between ${MIN_ROYALTIES}-${MAX_ROYALTIES}%)`}
                        label="royalties"
                        value={royalties}
                    />
                    <div>
                        <label>Upload audio (wav, mp3, ogg, max 100MB)</label>
                        <input type="file" accept="audio/*"

                            onChange={handleFileChange}
                        />
                    </div>
                    <div>
                        <label>Upload cover image (jpeg or gif, max 10MB)</label>
                        <input type="file" accept="image/*"
                            onChange={handleCoverUpload}
                        />
                    </div>
                    <div>
                        <label>Upload thumbnail image (jpeg or gif, max 1MB)</label>
                        <input type="file" accept=".jpg, .jpeg, .gif"
                            onChange={handleThumbUpload}
                        />
                    </div>
                    <button onClick={(e) => {

                        setStep(1)
                    }}>
                        Preview
                    </button>
                </form>
            </>
        )}

        {step === 1 && (
            <>
                <div style={{ display: 'flex' }}>
                    <button onClick={() => setStep(0)}>
                        <strong>back</strong>
                    </button>
                </div>



                <Preview
                    title={title}
                    description={description}
                    cover={cover}
                    rawAudio={rawAudio}
                />



                <button onClick={handleMint}>
                    mint OBJKT
                </button>



                <p>this operation costs 0.08~ tez</p>
                <p>Your royalties upon each sale are {royalties}%</p>

            </>
        )}
    </>

}

export default Mint;