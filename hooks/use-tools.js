import {useContext} from 'react';
import {ToolsContext} from '../context/tools-context';

const useTools = () => useContext(ToolsContext);

export default useTools;
