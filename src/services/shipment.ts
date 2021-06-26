import api from '../api'
import { ShipmentType }  from '../interfaces/shipment'

export const createShipment = async (payload:ShipmentType): Promise<any> => {
    const response = await api.post(`/shipment`, payload)
    return response.data
  }