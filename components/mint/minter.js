import MintForm from './mint-form';
import Preview from './preview';
import useMint from '../../hooks/use-mint';
import {useState} from 'react';
import styles from './styles.module.css';

const Minter = () => {
    const {handleMint} = useMint();
    const [mintPayload, setMintPayload] = useState();
    const [isMinting, setIsMinting] = useState(false)

    const handleSubmit = (values) => {
        setIsMinting(false)
        setMintPayload(values);
    };

    const triggerMint = () => {
        setIsMinting(true)
        handleMint(mintPayload);
    };

    const handleBack = () => setMintPayload(null);
    return (
        <div className={styles.container}>
            {!mintPayload
                ? <MintForm handleSubmit={handleSubmit}/>
                : <Preview
                    mintPayload={mintPayload}
                    handleBack={handleBack}
                    triggerMint={triggerMint}
                    isMinting={isMinting}
                />
            }
        </div>
    );
};

export default Minter
