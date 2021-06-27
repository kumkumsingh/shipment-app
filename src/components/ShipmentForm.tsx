import * as React from 'react'
import { Button, Form, Header } from 'semantic-ui-react'
import styled from 'styled-components'
import cargo from '../images/cargo.jpg'
import { useForm } from 'react-hook-form'
import { useEffect , useContext, useState} from 'react'
import { AppContext } from '../provider/storeContext';
import { createShipment, fetchShipment , updateShipment} from '../services/shipment'

const InnerDiv = styled.div`
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width:100vw;
    height:100vh;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;    
`;
const StyledHeader = styled(Header)`
    color: white;
    font-size:20px;
    height:5%;
    width:60%;
    margin-top:20px;
    text-align:center;
`;
const StyledForm = styled(Form)`
    height: 80%;
    width:40%;
    margin-top:2%;
`;
const StyledLabel = styled.label`
    color:white!important;
    font-size:18px!important;
`;
type ShipmentType = {
    customer: string;
    vessel: string;
    "shipment-eta": string;
  }
const ShipmentForm = () => {
        const { state, dispatch } = useContext(AppContext);
          const [formData, setFormData] = useState<ShipmentType>({
    customer: "",
    vessel: "",
     "shipment-eta": ""
  })

  const onSubmit = async (e:any) => {
      try{
        //   const data = await fetchShipment()
  
        //   dispatch({type:'FETCH_SHIPMENT', payload:data})
    // await createShipment(formData)
    // dispatch({type: 'CREATE_SHIPMENT', payload: { customer: formData.customer, vessel: formData.vessel, "shipment-eta": formData["shipment-eta"] }})
     const response = await updateShipment(formData, 4)
     dispatch({type: 'UPDATE_SHIPMENT', payload:response })
      }
      catch (err) {
      console.log(err.error)
    }
  }
  
  useEffect(()=>{
      const fetchData = async() =>{
        const data = await fetchShipment()
        dispatch({type:'FETCH_SHIPMENT', payload:data})
   
  }
        fetchData()
    
      
  },[dispatch])
  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
return (
    
<InnerDiv style={{ 
                    backgroundImage: `url(${cargo})`,
                }}>
<StyledHeader as="h1">Cargoplot will match you with the most suitable freight forwarders. Get competitive pricing and service to transport your goods.</StyledHeader>
  <StyledForm onSubmit={onSubmit}>
    <Form.Field>
      <StyledLabel>Customer Name:</StyledLabel>
      <input placeholder='customer' name="customer"   onChange={handleInputChange}
              value={formData.customer}/>
    </Form.Field>
    <Form.Field>
      <StyledLabel>Vessel Name:</StyledLabel>
      <input placeholder='vessel' name="vessel"   onChange={handleInputChange}
              value={formData.vessel}/>
    </Form.Field>
    <Form.Field>
      <StyledLabel>Shipment date:</StyledLabel>
      <input placeholder='date' name="shipment-eta"   onChange={handleInputChange}
             value={formData["shipment-eta"]} />
    </Form.Field>
    <Button type='submit' color="blue" >Submit</Button>
  </StyledForm>
  </InnerDiv>
)
}

export default ShipmentForm