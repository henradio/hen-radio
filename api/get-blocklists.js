import {
    setObjktBlockList,
    setWalletBlockList,
    BLOCKLIST_WALLET,
    BLOCKLIST_OBJKT
} from '../constants'

const axios = require('axios')

const getBlockLists = async () => {
    const blockObjkt = await axios.get(BLOCKLIST_OBJKT) // loads blocked objkt
    const blockwallet = await axios.get(BLOCKLIST_WALLET) // loads blocked wallets

    setObjktBlockList(blockObjkt.data)
    setWalletBlockList(blockwallet.data)



}

export default getBlockLists;
