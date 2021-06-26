import  { InitialStateType } from '../interfaces/shipment'

export const initialState : InitialStateType= {
    shipments: []
  }
export type ShipmentActions =
|{ type: "UPDATE_SHIPMENT", id: number }
| { type: "CREATE_SHIPMENT" , payload:{customer: string,
        vessel: string, 
        "shipment-eta": string}}
               
export const shipmentReducer = (state:InitialStateType, action:ShipmentActions) => {
    switch (action.type) {
        case 'CREATE_SHIPMENT': 
        return{
            ...state,
           shipments:[...state.shipments, action.payload]
        }
        // case 'UPDATE_SHIPMENT': 
        // return{
        //     ...state

        // }
      default:
        return state;
    }
  }

  