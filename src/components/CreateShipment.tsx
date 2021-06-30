import * as React from 'react'
import ShipmentForm from './ShipmentForm'
import { AppContext } from '../provider/storeContext'
import { useContext } from 'react'
import { createShipment } from '../services/shipment'
import { notify } from '../utils/helper'

const CreateShipment = () => {
  const { dispatch } = useContext(AppContext)

  const onSubmit = async (data: any) => {
    try {
      const response = await createShipment(data)
      dispatch({ type: 'CREATE_SHIPMENT', payload: response })
    } catch (err) {
      notify(err.response.data)
    }
  }
  return <ShipmentForm onSubmit={onSubmit} buttonContent={'Add shipment'} />
}
export default CreateShipment
