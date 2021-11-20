import {
    setObjktBlockList,
    setWalletBlockList,
    setBanBlockList,
} from '../constants'

const axios = require('axios')

const getBlockLists = async () => {

        const blockObjkt = await axios.get(process.env.REACT_APP_BLOCKLIST_OBJKT) // loads blocked objkt
        const blockwallet = await axios.get(process.env.REACT_APP_BLOCKLIST_WALLET) // loads blocked wallets

        setObjktBlockList(blockObjkt.data)
        setWalletBlockList(blockwallet.data)



}

export default getBlockLists;
