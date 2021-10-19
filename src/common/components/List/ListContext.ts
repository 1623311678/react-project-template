import React, { createContext } from 'react'

interface ListContextProps {
    loading: boolean;
}

export const ListContext = createContext<ListContextProps>({
    loading: false
})
