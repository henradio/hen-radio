import {useContext} from 'react';
import {ObjktsContext} from '../context/objkts-context';

const useObjkts = () => useContext(ObjktsContext);

export default useObjkts;
