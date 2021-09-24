import { useContext } from 'react';
import { TokenContext } from '../context/token-context';

const useToken = () => useContext(TokenContext);

export default useToken;
