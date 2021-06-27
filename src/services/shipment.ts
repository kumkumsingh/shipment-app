import api from '../api'
import { FormDataType}  from '../interfaces/shipment'

export const createShipment = async (payload:FormDataType): Promise<any> => {
    const response = await api.post(`/shipment`, payload)
    return response.data
  }
  export const fetchShipment = async (): Promise<any> => {
    const response = await api.get(`/shipment`)
    return response.data
  }
  export const fetchVessel = async (name:string): Promise<any> => {
    const response = await api.get(`/vessel/${name}`)
    return response.data
  }
   export const updateShipment = async (payload:FormDataType, id:number): Promise<any> => {
    const response = await api.put(`/shipment/${id}`, payload)
    return response.data
  }