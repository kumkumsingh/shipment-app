import * as React from 'react';
import ShipmentForm from '../../components/ShipmentForm'
import { useEffect , useContext} from 'react'
import { AppContext } from '../../provider/storeContext';
 

const HomePage = () => {
//     const { state, dispatch } = useContext(AppContext);

//  useEffect(() =>{
//     dispatch({type: 'UPDATE_SHIPMENT',id:3})
//  }, [dispatch, state])
    return(
        <React.Fragment>
        <ShipmentForm/> 
        </React.Fragment>
    );
};

export default HomePage;