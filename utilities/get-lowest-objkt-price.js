import {convertPriceToXtz} from './general';

const getLowestObjktPrice = swaps => swaps?.length
    ? convertPriceToXtz(swaps[0].price) + 'xtz'
    : '';

export default getLowestObjktPrice
