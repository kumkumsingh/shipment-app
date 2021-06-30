import { InitialStateType, ShipmentType } from '../interfaces/shipment'
import { VesselType } from '../interfaces/vessel'

export const initialState : InitialStateType = {
  shipments: [],
  vessel: { name: '', 'vessel-eta': '' },
  matchEta: false,
  details: { id: 0, customer: '', vessel: '', 'shipment-eta': '' }
}
export type ShipmentActions =
|{ type: 'FETCH_SHIPMENT', payload:ShipmentType[]}
|{ type: 'FETCH_VESSEL', payload:VesselType}
|{ type: 'MATCH_VESSEL_SHIPMENT', payload:boolean}
| { type: 'CREATE_SHIPMENT' | 'UPDATE_SHIPMENT' | 'SHIPMENT_DETAILS', payload:ShipmentType}

export const shipmentReducer = (state:InitialStateType, action:ShipmentActions) => {
  switch (action.type) {
    case 'CREATE_SHIPMENT':
      return {
        ...state,
        shipments: state.shipments ? [...state.shipments, action.payload] : [action.payload]
      }
    case 'MATCH_VESSEL_SHIPMENT':
      return {
        ...state,
        matchEta: action.payload
      }
    case 'FETCH_SHIPMENT':
      return { 
        ...state, 
        shipments: action.payload 
      }
    case 'FETCH_VESSEL':
      return { 
        ...state, 
        vessel: action.payload
      }
    case 'SHIPMENT_DETAILS':
      return { 
        ...state, 
        details: action.payload 
      }
    case 'UPDATE_SHIPMENT':
      const findShipmentIndex = state.shipments.findIndex(value => value.id === action.payload.id)
      if (findShipmentIndex !== -1) {
        state.shipments[findShipmentIndex] = action.payload
      }
      return {
        ...state,
        shipments: state.shipments,
        matchEta: initialState.matchEta,
        vessel: initialState.vessel,
        details: initialState.details
      }

    default:
      return state
  }
}
