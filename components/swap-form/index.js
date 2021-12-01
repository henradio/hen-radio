import {Field, Form, Formik} from 'formik';
import useTezos from '../../hooks/use-tezos';
import styles from './styles.module.css';
import {objktFetcherApi} from '../../fetchers/objkt-fetcher';
import {mutate} from 'swr';
import useTools from '../../hooks/use-tools';
import useToast from '../../hooks/use-toast';

const getTotalPossessed = (tokenHolders, address) => tokenHolders
    .reduce((count, th) =>
            th.holder_id === address
                ? count + th.quantity
                : count
        , 0);

const SwapForm = ({objkt}) => {
    const {auth} = useTezos();
    const {swap} = useTools();
    const {setMessage} = useToast();
    if(!objkt) return null;
    if(!auth) return null;

    const totalPossessed = getTotalPossessed(objkt.token_holders, auth.address);
    if(totalPossessed < 1) return null;

    const handleSubmit = async({xtz, amount}) => {
        try {
            setMessage('Transaction in progress…');
            const isSuccessful = await swap({
                ...objkt,
                creator: auth.address,
                xtz: Number(xtz),
                amount: Number(amount)
            });
            setMessage(isSuccessful ? 'Objkts Swapped' : 'Failed');
            if(isSuccessful) {
                setTimeout(() => {
                    mutate(JSON.stringify([objktFetcherApi, objkt.id.toString()]));
                }, 2500);
            }
        } catch(e) {
            setMessage('Failed');
            console.log('Error: ', e);
        }
        setTimeout(() => {
            setMessage(null);
        }, 3200);
    };

    return (
        <div>
            <h2 className={styles.swapTitle}>Swap</h2>
            <p className={styles.formText}>Owned: {totalPossessed}</p>
            <Formik
                initialValues={{
                    xtz: '',
                    amount: ''
                }}
                onSubmit={handleSubmit}
            >
                <Form>
                    <p className={styles.formField}>
                        <label
                            className={styles.formLabel}
                            htmlFor={`xtz`}
                        >xtz</label>
                        <Field
                            className={styles.formInput}
                            id="xtz"
                            name="xtz"
                            type="number"
                            min={0}
                        />
                    </p>
                    <p className={styles.formField}>
                        <label
                            className={styles.formLabel}
                            htmlFor={`amount`}
                        >Amount</label>
                        <Field
                            className={styles.formInput}
                            id="amount"
                            name="amount"
                            type="number"
                            min={1}
                            max={totalPossessed}
                            step={1}
                        />
                    </p>
                    <button type="submit">Swap</button>
                </Form>
            </Formik>
        </div>
    );
};

export default SwapForm;
