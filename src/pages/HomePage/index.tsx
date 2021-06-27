import * as React from 'react';
import ShipmentForm from '../../components/ShipmentForm'
import { ShipmentType } from '../../interfaces/shipment'
import { fetchShipment, updateShipment } from '../../services/shipment'
import { useEffect , useContext} from 'react'
import { AppContext } from '../../provider/storeContext';
import { Segment , Button, Header} from 'semantic-ui-react';
import { fetchVessel } from '../../services/shipment'
 

const HomePage = () => {
    // const { state, dispatch } = useContext(AppContext);
    // useEffect(()=>{
    //     const fetchData = async() =>{
    //       const data = await fetchShipment()
    //       dispatch({type:'FETCH_SHIPMENT', payload:data})
     
    // }
    //       fetchData()
      
        
    // },[dispatch])
    // console.log('state',state)
    // const updateShipmentClick = async (shipment: ShipmentType) =>{
    //     try{
    //          const response = await updateShipment(shipment, shipment.id)
    //          dispatch({type: 'UPDATE_SHIPMENT', payload:response })
    //           }
    //           catch (err) {
    //           console.log(err.error)
    //         }

    // }

    const { state, dispatch } = useContext(AppContext);
    useEffect(()=>{
        const fetchData = async() =>{
          const data = await fetchVessel('MONACO-MAERSK')
          dispatch({type:'FETCH_VESSEL', payload:data})
     
    }
          fetchData()
      
        
    },[dispatch])
    return(
        <React.Fragment>
           <ShipmentForm/>        
        </React.Fragment>
    );
};

export default HomePage;