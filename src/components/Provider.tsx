'use client'

import { Provider } from 'jotai'

interface ChidrenType{
    children: React.ReactNode
}

export default function AtomProvider({children}:ChidrenType){
    return(
        <Provider>
            {children}
        </Provider>
    );
}