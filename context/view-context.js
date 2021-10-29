import {createContext, useState} from 'react';

export const ViewContext = createContext({});

const ViewProvider = ({children}) => {
    const [viewType, setViewType] = useState('grid');

    const toggleViewType = () => {
        switch(viewType) {
            case 'grid':
                setViewType('list');
                break;
            case 'list':
                setViewType('grid');
                break;
            default:
                console.log('Unhandled type');
        }
    };

    const handleViewSelect = (event) => {
        setViewType(event.target.value);
    };

    return (
        <ViewContext.Provider
            value={{
                viewType,
                setViewType,
                toggleViewType,
                handleViewSelect
            }}
        >
            {children}
        </ViewContext.Provider>
    );
};

export default ViewProvider;
