import React, { createContext } from 'react'

interface TabContextProps {
    value: string | number;
    onChange: (any) => void;
}

export const TabContext = createContext<TabContextProps>({
    value: '',
    onChange: () => { },
})
