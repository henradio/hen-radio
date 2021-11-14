import MintForm from './mint-form';
import Preview from './preview';
import useMint from '../../hooks/use-mint';
import {useState} from 'react';
import styles from './styles.module.css';

const Minter = () => {
    const {handleMint} = useMint();
    const [mintPayload, setMintPayload] = useState();

    const handleSubmit = (values) => {
        setMintPayload(values);
    };

    const triggerMint = () => {
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
                />
            }
        </div>
    );
};

export default Minter
