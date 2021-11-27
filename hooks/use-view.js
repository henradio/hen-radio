import {useContext} from 'react';
import {ViewContext} from '../context/view-context';

const useView = () => useContext(ViewContext);

export default useView;
