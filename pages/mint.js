import { useState } from 'react'
import { Container } from '../components/UI-elements/Container'
import { Input, Textarea } from '../components/UI-elements/input'
import { Upload } from '../components/UI-elements/load-file-btn'
import { Preview } from '../components/mint-preview'
import useAudioCompression from '../hooks/use-audio-compression'

const Mint = () => {

    const MAX_EDITIONS = 10000;
    const MIN_ROYALTIES = 10;
    const MAX_ROYALTIES = 25;

    const { handleFileChange, handlePreview } = useAudioCompression();

    const [step, setStep] = useState(0)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState('')
    const [amount, setAmount] = useState()
    const [royalties, setRoyalties] = useState()
    const [file, setFile] = useState() // the uploaded file
    const [cover, setCover] = useState() // the uploaded or generated cover image
    const [thumbnail, setThumbnail] = useState() // the uploaded or generated cover image

    return <>

            {step === 0 && (
                
                <>
                    <Container>
                            <Input
                                type="text"
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="title"
                                label="title"
                                value={title}
                            />

                            <Input
                                type="text"
                                onChange={(e) => setTags(e.target.value)}
                                placeholder="tags (comma separated. example: illustration, digital)"
                                label="tags"
                                value={tags}
                            />

                            <Input
                                type="number"
                                min={1}
                                max={MAX_EDITIONS}
                                onChange={(e) => setAmount(e.target.value)}
                                onBlur={(e) => {
                                    limitNumericField(e.target, 1, MAX_EDITIONS)
                                    setAmount(e.target.value)
                                }}
                                placeholder={`editions (no. editions, 1-${MAX_EDITIONS})`}
                                label="editions"
                                value={amount}
                            />

                            <Input
                                type="number"
                                min={MIN_ROYALTIES}
                                max={MAX_ROYALTIES}
                                onChange={(e) => setRoyalties(e.target.value)}
                                onBlur={(e) => {
                                    limitNumericField(e.target, MIN_ROYALTIES, MAX_ROYALTIES)
                                    setRoyalties(e.target.value)
                                }}
                                placeholder={`royalties after each sale (between ${MIN_ROYALTIES}-${MAX_ROYALTIES}%)`}
                                label="royalties"
                                value={royalties}
                            />
                    </Container>

                    <Container>
                            <Upload
                                label="Upload OBJKT"
                                onChange={handleFileChange}
                            />
                    </Container>

                    {file && needsCover && (
                        <Container>
                                <Upload
                                    label="Upload cover image"
                                    onChange={handleCoverUpload}
                                />
                        </Container>
                    )}

                    <Container>
                            <button onClick={handlePreview}>
                                Preview
                            </button>
                    </Container>
                </>
            )}

            {step === 1 && (
                <>
                    <Container>
                            <div style={{ display: 'flex' }}>
                                <button onClick={() => setStep(0)} fit>
                                        <strong>back</strong>
                                </button>
                            </div>
                    </Container>

                    <Container>
                            <Preview
                                mimeType={file.mimeType}
                                previewUri={file.reader}
                                title={title}
                                description={description}
                                tags={tags}
                            />
                    </Container>

                    <Container>
                            <button onClick={handleMint} fit>
                                mint OBJKT
                            </button>
                    </Container>

                    <Container>
                            <p>this operation costs 0.08~ tez</p>
                            <p>Your royalties upon each sale are {royalties}%</p>
                    </Container>
                </>
            )}
        </>
    
}

export default Mint;