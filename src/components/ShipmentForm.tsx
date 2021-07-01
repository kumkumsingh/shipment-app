import * as React from 'react'
import { Button, Form, Header } from 'semantic-ui-react'
import styled from 'styled-components'
import cargo from '../images/cargo.jpg'
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormDataType } from '../interfaces/shipment';

const InnerDiv = styled.div`
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width:100vw;
    height:50%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;    
`
const StyledHeader = styled(Header)`
    color: white;
    font-size:20px;
    height:5%;
    width:60%;
    margin-top:20px;
    text-align:center;
`
const StyledForm = styled(Form)`
    height: 80%;
    width:40%;
    margin-top:2%;
`
const StyledLabel = styled.label`
    color:white!important;
    font-size:18px!important;
`
type IShipmentForm = {
    onSubmit: (data:FormDataType) => Promise<void> ;
    buttonContent:string ;
    defaultValues?:FormDataType;
}
const ShipmentForm = (props:IShipmentForm) => {
  const { register, handleSubmit } = useForm({
    defaultValues: props.defaultValues
});
  return (
    <>
      <InnerDiv style={{
        backgroundImage: `url(${cargo})`
      }}>
        <StyledHeader as="h1">Cargoplot will match you with the most suitable freight forwarders. Get competitive pricing and service to transport your goods.</StyledHeader>
        <StyledForm onSubmit={handleSubmit(props.onSubmit)}>
          <Form.Field>
            <StyledLabel>Customer Name:</StyledLabel>
            <input {...register("customer")} placeholder='customer'/>
          </Form.Field>
          <Form.Field>
            <StyledLabel>Vessel Name:</StyledLabel>
              <input {...register("vessel")} placeholder='vessel'/>
          </Form.Field>
          <Form.Field>
            <StyledLabel>Shipment date:</StyledLabel>
            <input {...register("shipment-eta")} type="date" placeholder='Select the date'/>
          </Form.Field>
           <Button color="blue">
            {props.buttonContent}           
           </Button>
          <ToastContainer />
        </StyledForm>

      </InnerDiv>
    </>
  )
}

export default ShipmentForm
