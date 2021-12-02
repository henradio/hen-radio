import {createContext} from 'react';
import useTezos from '../hooks/use-tezos';
import {OpKind} from '@taquito/taquito';

export const ToolsContext = createContext({
    getBalance: async() => {},
    batchSwap: async() => {},
    batchCancel: async() => {},
    batchTransfer: async() => {},
    collect: async() => {},
    swap: async() => {},
    cancel: async() => {},
    xtzTransfer: async() => {}
});

const contracts = {
    subjkt: 'KT1My1wDZHDGweCrJnQJi3wcFaS67iksirvj',
    v1: 'KT1Hkg5qeNhfwpKW4fXvq7HGZB9z2EnmCCA9',
    v2: 'KT1HbQepzV1nVGg8QVznG7z4RcHseD5kwqBn',
    objkts: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton'
};

const confirmations = 2;

const ToolsProvider = ({children}) => {
    const {Tezos, auth} = useTezos();

    const getBalance = async() => {
        const balance = await Tezos.tz.getBalance(auth.address);

        return balance / 1000000;
    };

    const batchSwap = async(objktsToSwap) => {
        try {
            const objkts = await Tezos.wallet.at(contracts.objkts);
            const marketplace = await Tezos.wallet.at(contracts.v2);

            const list = objktsToSwap.reduce((arr, o) =>
                    [
                        ...arr,
                        {
                            kind: OpKind.TRANSACTION,
                            ...objkts.methods.update_operators([
                                {
                                    add_operator: {
                                        operator: contracts.v2,
                                        token_id: parseInt(o.id),
                                        owner: auth.address
                                    }
                                }])
                                .toTransferParams(
                                    {amount: 0, mutez: true, storageLimit: 100}
                                )
                        },
                        {
                            kind: OpKind.TRANSACTION,
                            ...marketplace.methods.swap(
                                o.creator,
                                parseInt(o.amount),
                                parseInt(o.id),
                                parseFloat(o.royalties),
                                parseFloat(o.xtz) * 1000000
                            )
                                .toTransferParams(
                                    {amount: 0, mutez: true, storageLimit: 270}
                                )
                        },
                        {
                            kind: OpKind.TRANSACTION,
                            ...objkts.methods.update_operators([
                                {
                                    remove_operator: {
                                        operator: contracts.v2,
                                        token_id: parseFloat(o.id),
                                        owner: auth.address
                                    }
                                }])
                                .toTransferParams(
                                    {amount: 0, mutez: true, storageLimit: 175}
                                )
                        }
                    ]
                , []);
            const batch = await Tezos.wallet.batch(list);
            const operation = await batch.send();
            await operation.confirmation(confirmations);
        } catch(e) {
            console.log('Error:', e);
            return false;
        }
        return true;
    };

    const batchCancel = async(swapsToCancel) => {
        try {
            const v2 = await Tezos.wallet.at(contracts.v2);
            const list = await swapsToCancel.reduce(
                (arr, swapId) => ([
                    ...arr,
                    {
                        kind: OpKind.TRANSACTION,
                        ...v2.methods.cancel_swap(swapId).toTransferParams(
                            {amount: 0, storageLimit: 150}
                        )
                    }
                ]),
                []
            );

            const batch = await Tezos.wallet.batch(list);
            const operation = await batch.send();
            await operation.confirmation(confirmations);
        } catch(e) {
            console.log('Error:', e);
            return false;
        }
        return true;
    };

    const batchTransfer = async(objktsToTransfer) => {
        try {
            const objkts = await Tezos.wallet.at(contracts.objkts);
            const params = [
                {
                    from_: auth.address,
                    txs: objktsToTransfer.map(data => ({
                            to_: data.address,
                            token_id: data.id,
                            amount: data.amount
                        })
                    )
                }
            ];
            const operation = await objkts.methods.transfer(params)
                .send({amount: 0, mutez: true});
            await operation.confirmation(confirmations);
        } catch(e) {
            console.log('Error:', e);
            return false;
        }
        return true;
    };

    const collect = async(swapId, xtzAmount) => {
        try {
            const v2 = await Tezos.wallet.at(contracts.v2);
            const operation = await v2.methods
                .collect(parseFloat(swapId))
                .send({
                    amount: parseFloat(xtzAmount),
                    mutez: true,
                    storageLimit: 310
                });
            await operation.confirmation(confirmations);
        } catch(e) {
            console.log('Error:', e);
            return false;
        }
        return true;
    };

    const swap = async({amount, creator, id, royalties, xtz}) => {
        try {
            const objkts = await Tezos.wallet.at(contracts.objkts);
            const marketplace = await Tezos.wallet.at(contracts.v2);

            const list = [
                {
                    kind: OpKind.TRANSACTION,
                    ...objkts.methods.update_operators([
                        {
                            add_operator: {
                                operator: contracts.v2,
                                token_id: parseInt(id),
                                owner: auth.address
                            }
                        }])
                        .toTransferParams(
                            {amount: 0, mutez: true, storageLimit: 100}
                        )
                },
                {
                    kind: OpKind.TRANSACTION,
                    ...marketplace.methods.swap(
                        creator,
                        parseInt(amount),
                        parseInt(id),
                        parseFloat(royalties),
                        parseFloat(xtz) * 1000000
                    )
                        .toTransferParams(
                            {amount: 0, mutez: true, storageLimit: 270}
                        )
                },
                {
                    kind: OpKind.TRANSACTION,
                    ...objkts.methods.update_operators([
                        {
                            remove_operator: {
                                operator: contracts.v2,
                                token_id: parseFloat(id),
                                owner: auth.address
                            }
                        }])
                        .toTransferParams(
                            {amount: 0, mutez: true, storageLimit: 175}
                        )
                }
            ];
            const batch = await Tezos.wallet.batch(list);
            const operation = await batch.send();
            await operation.confirmation(confirmations);
        } catch(e) {
            console.log('Error:', e);
            return false;
        }
        return true;
    };

    const cancel = async(id) => {
        try {
            const v2 = await Tezos.wallet.at(contracts.v2);
            const list = [
                {
                    kind: OpKind.TRANSACTION,
                    ...v2.methods.cancel_swap(id).toTransferParams(
                        {amount: 0, storageLimit: 150}
                    )
                }
            ]

            const batch = await Tezos.wallet.batch(list);
            const operation = await batch.send();
            await operation.confirmation(confirmations);
        } catch(e) {
            console.log('Error:', e);
            return false;
        }
        return true;
    };

    const xtzTransfer = async(xtz) => {
        try {
            const operation = await Tezos.wallet
                .transfer(
                    {to: 'tz1fxorokU3AWY3C7cZGQEfoX22w2V7SMTke', amount: xtz}
                ).send();
            await operation.confirmation(confirmations);
        } catch(e) {
            console.log('Error:', e);
            return false;
        }
        return true;
    };

    return (
        <ToolsContext.Provider
            value={{
                getBalance,
                batchSwap,
                batchCancel,
                batchTransfer,
                collect,
                swap,
                cancel,
                xtzTransfer
            }}
        >
            {children}
        </ToolsContext.Provider>
    );
};

export default ToolsProvider;
