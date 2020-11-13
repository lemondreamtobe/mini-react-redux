import { createContext } from 'react'

export const Context = createContext(null)

export default function Provider (props) {
  return (
    <Context.Provider value={props.store}>
    	{props.children}
    </Context.Provider>
  )
}