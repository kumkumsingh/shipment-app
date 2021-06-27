import * as React from 'react'
import { Segment , Button, Header} from 'semantic-ui-react';
import { FormDataType, ShipmentType } from '../interfaces/shipment'
import { fetchShipment, updateShipment } from '../services/shipment'
import { useEffect , useContext} from 'react'
import { AppContext } from '../provider/storeContext';

interface IShipmentListProps {
   formData:FormDataType
  }
const ShipmentList = (props:IShipmentListProps) =>{
    const { state, dispatch } = useContext(AppContext);
    useEffect(()=>{
        const fetchData = async() =>{
          const data = await fetchShipment()
          dispatch({type:'FETCH_SHIPMENT', payload:data})
     
    }
          fetchData()
      
        
    },[dispatch])
    console.log('state',state)
    const updateShipmentClick = async (id:number) =>{
        try{
             const response = await updateShipment(props.formData, id)
             dispatch({type: 'UPDATE_SHIPMENT', payload:response })
              }
              catch (err) {
              console.log(err.error)
            }

    }
    return(
        <React.Fragment>
        <Header as="h2" textAlign="center" color="blue">Your shipment lists</Header>
        {state.shipments?.map((shipment: ShipmentType) => {
       return (
         
       <Segment.Group horizontal>
       <Segment>Customer: &nbsp;{shipment.customer}</Segment>
       <Segment>Vessels:  &nbsp;{shipment.vessel}</Segment>
       <Segment>Shipment-eta: &nbsp;{shipment['shipment-eta']}</Segment>
       <Segment><Button content="Update" color="blue" onClick={()=>updateShipmentClick(shipment.id)}/></Segment>
     </Segment.Group>
    )
        })}
        </React.Fragment>
    )

}

export default ShipmentList