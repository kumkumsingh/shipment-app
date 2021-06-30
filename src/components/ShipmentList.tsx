import * as React from 'react'
import { Header } from 'semantic-ui-react'
import { ShipmentType } from '../interfaces/shipment'
import { fetchShipment } from '../services/shipment'
import { useEffect, useContext } from 'react'
import { AppContext } from '../provider/storeContext'
import 'react-toastify/dist/ReactToastify.css';
import ShipmentListItem from './ShipmentListItem'

const ShipmentList = () => {
  const { state, dispatch } = useContext(AppContext)

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchShipment()
      dispatch({ type: 'FETCH_SHIPMENT', payload: data })
    }
    fetchData()
  }, [dispatch])
  return (
    <React.Fragment>
      <Header as="h2" textAlign="center" color="blue">
        Your shipment lists
      </Header>
      {state?.shipments?.map((shipment: ShipmentType) => {
        return (
            <div key={shipment.id}>
         
            <ShipmentListItem shipment={shipment}/>
    
          </div>
        )
      })}
    </React.Fragment>
  )
}

export default ShipmentList
