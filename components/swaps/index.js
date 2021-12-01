import useTools from '../../hooks/use-tools';
import useToast from '../../hooks/use-toast';
import useTezos from '../../hooks/use-tezos';
import mutezToXtz from '../../utilities/mutez-to-xtz';
import styles from './styles.module.css';
import objktFetcher, {objktFetcherApi} from '../../fetchers/objkt-fetcher';
import useSWR, {mutate} from 'swr';
import serialise from '../../fetchers/serialiser';
import getLowestObjktPrice from '../../utilities/get-lowest-objkt-price';

const updateAvailability = availability => {
    const [amount, total] = availability.split('/');
    return `${amount - 1}/${total}`;
};

const Swaps = ({objktId}) => {
    const {data} = useSWR([objktFetcherApi, objktId], objktFetcher, {use: [serialise]});
    const {objkt, tracks, ...rest} = data;

    const {auth} = useTezos();
    const {collect} = useTools();
    const {setMessage} = useToast();

    const handleCollect = (swapId, xtzAmount) => async() => {
        setMessage('Transaction in progress…');
        const isSuccessful = await collect(swapId, xtzAmount);
        setMessage(isSuccessful ? 'Purchase Successful' : 'Failed');
        if(!isSuccessful) return;
        const swaps = objkt.swaps.reduce((arr, s) => {
            const newS = {...s};
            if(newS.id === swapId) {
                newS.amount_left = newS.amount_left - 1;
            }
            if(newS.amount_left <= 0) return arr;
            return arr.concat(newS);
        }, []);
        const availability = updateAvailability(objkt.availability);
        const price = getLowestObjktPrice(swaps);
        await mutate(JSON.stringify([objktFetcherApi, objktId]), {
            objkt: {
                ...objkt,
                swaps,
                availability,
                price
            },
            tracks: tracks.map(t => {
                if(t.id === objkt.id) {
                    t.availability = availability;
                    t.price = price
                }
                return t
            }),
            ...rest
        }, false);
        setTimeout(() => {
            setMessage(null);
        }, 2000);
    };

    // const handleDecrement = (swapId) => async () => {
    //     const swaps = objkt.swaps.reduce((arr, s) => {
    //         const newS = {...s};
    //         if(newS.id === swapId) {
    //             newS.amount_left = newS.amount_left - 1;
    //         }
    //         if(newS.amount_left <= 0) return arr;
    //         return arr.concat(newS);
    //     }, []);
    //     const availability = updateAvailability(objkt.availability);
    //     const price = getLowestObjktPrice(swaps);
    //     await mutate(JSON.stringify([objktFetcherApi, objktId]), {
    //         objkt: {
    //             ...objkt,
    //             availability,
    //             price,
    //             swaps
    //         },
    //         tracks: tracks.map(t => {
    //             if(t.id === objkt.id) {
    //                 t.availability = availability;
    //                 t.price = price
    //             }
    //             return t
    //         }),
    //         ...rest
    //     }, false);
    // };

    return (
        <div className={styles.swapsContainer}>
            {objkt?.swaps?.length ? (
                <>
                    <h2 className={styles.swapTitle}>Swaps</h2>
                    <ul className={styles.swapList}>
                        {objkt.swaps.map((swap, i) => (
                            <li key={swap.id} className={styles.swapListItem}>
                                <p>
                                    Price: {mutezToXtz(swap.price)}xtz
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
                                {/*<button*/}
                                {/*    onClick={handleDecrement(swap.id,*/}
                                {/*        swap.price)}*/}
                                {/*>Decrement*/}
                                {/*</button>*/}
                            </li>
                        ))}
                    </ul>
                </>
            ) : null}
        </div>
    );
};

export default Swaps;
