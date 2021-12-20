import MintForm from './mint-form';
import Preview from './preview';
import useMint from '../../hooks/use-mint';
import {useState} from 'react';
import styles from './styles.module.css';

const Minter = () => {
    const {handleMint} = useMint();
    const [mintPayload, setMintPayload] = useState();
    const [isMinting, setIsMinting] = useState(false);
    const [isForm, setIsForm] = useState(true);

    const handleSubmit = (values) => {
        setIsMinting(false)
        setMintPayload(values);
        setIsForm(false);
    };

    const triggerMint = () => {
        setIsMinting(true)
        handleMint(mintPayload);
    };
    const handleBack = () => setIsForm(true);

    return (
        <>
            <h1 className={styles.mainTitle}>Mint</h1>
            <div className={styles.container}>
               {isForm ? <MintForm handleSubmit={handleSubmit}
                    mintPayload={mintPayload}
                /> :
                <Preview
                    hidden={isForm}
                    mintPayload={mintPayload}
                    handleBack={handleBack}
                    triggerMint={triggerMint}
                    isMinting={isMinting}
                />
            }
        </div></>
    );
};

export default Minter;
