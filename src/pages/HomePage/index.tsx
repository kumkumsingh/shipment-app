import * as React from 'react';
import CreateShipment from '../../components/CreateShipment';
import ShipmentList from '../../components/ShipmentList';
 

const HomePage = () => {

    return(
        <React.Fragment>
           <CreateShipment />
           <ShipmentList/>        
        </React.Fragment>
    );
};

export default HomePage;