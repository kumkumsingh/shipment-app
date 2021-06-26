import * as React from 'react';
import { createContext , useReducer} from 'react'
import { shipmentReducer, ShipmentActions , initialState} from './reducers';
import  { InitialStateType } from '../interfaces/shipment'
import logger from 'use-reducer-logger';

 
   const AppContext = createContext<{
    state: InitialStateType;
    dispatch: React.Dispatch<ShipmentActions>;
  }>({
    state: initialState,
    dispatch: () => null
  });
//   const mainReducer = ({ shipments}: InitialStateType, action: ShipmentActions) => ({
//     products: shipmentReducer(shipments, action)

//   });
   const AppProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(logger(shipmentReducer), initialState);
    return (
      <AppContext.Provider value={{state, dispatch}}>
        {children}
      </AppContext.Provider>
    )
  }
  
  export { AppContext, AppProvider };