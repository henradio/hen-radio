import useTools from '../../hooks/use-tools';
import useToast from '../../hooks/use-toast';
import useTezos from '../../hooks/use-tezos';
import mutezToXtz from '../../utilities/mutez-to-xtz';
import {useEffect, useState} from 'react';
import styles from './styles.module.css';

const Swaps = ({objkt: initialObjkt}) => {
    const {auth} = useTezos();
    const {collect} = useTools();
    const {setMessage} = useToast();
    const [objkt, setObjkt] = useState(initialObjkt);

    useEffect(() => {
        console.log(objkt);
    }, [objkt])

    const handleCollect = (swapId, xtzAmount) => async() => {
        setMessage('Transaction in progress…');
        const isSuccessful = await collect(swapId, xtzAmount);
        setMessage(isSuccessful ? 'Purchase Successful' : 'Failed');
        if(!isSuccessful) return;
        setObjkt(prevState => ({
                ...prevState,
                swaps: prevState.swaps.reduce((arr, s) => {
                    const newS = {...s};
                    if(newS.id === swapId) {
                        newS.amount_left = newS.amount_left - 1;
                    }
                    if(newS.amount_left <= 0) return arr;
                    return arr.concat(newS);
                }, [])
            }
        ));
        setTimeout(() => {
            setMessage(null);
        }, 2000);
    };

    return (
        <div className={styles.swapsContainer}>
            {objkt?.swaps?.length ? (
                <>
                    <h2 className={styles.swapTitle}>Swaps</h2>
                    <ul className={styles.swapList}>
                        {objkt.swaps.map((swap, i) => (
                            <li key={swap.id} className={styles.swapListItem}>
                                <p>Price: {mutezToXtz(swap.price)}xtz
                                   Available: {swap.amount_left}/{swap.amount}<br/>Listed
                                   By: {swap.creator_id}
                                </p>
                                {auth && <p>
                                    <button
                                        onClick={handleCollect(swap.id,
                                            swap.price)}
                                    >Collect
                                    </button>
                                </p>}
                            </li>
                        ))}
                    </ul>
                </>
            ) : null}
        </div>
    )
}

export default Swaps;
