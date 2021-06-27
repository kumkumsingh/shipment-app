import  { InitialStateType, ShipmentType } from '../interfaces/shipment'
import { VesselType } from '../interfaces/vessel'

export const initialState : InitialStateType= {
    shipments: [],
    vessel:{ vessel:'','vessel-eta':''}
  }
export type ShipmentActions =
|{ type: "FETCH_SHIPMENT", payload:ShipmentType[]}
|{ type: "FETCH_VESSEL", payload:VesselType}
| { type: "CREATE_SHIPMENT" | "UPDATE_SHIPMENT", payload:ShipmentType}

export const shipmentReducer = (state:InitialStateType, action:ShipmentActions) => {
    switch (action.type) {
        case 'CREATE_SHIPMENT': 
        return{
            ...state,
           shipments:[...state.shipments, action.payload]
        }
        case 'FETCH_SHIPMENT': 
        return { ...state, shipments:action.payload }
        case 'FETCH_VESSEL': 
        return {...state,vessel:action.payload }
         case 'UPDATE_SHIPMENT': 
         const findShipmentIndex = state.shipments.findIndex(value => value.id === action.payload.id);
          if(findShipmentIndex !== -1){
                state.shipments[findShipmentIndex] = action.payload
            }
        return { ...state, shipments:state.shipments }
      default:
        return state;
    }
  }

  