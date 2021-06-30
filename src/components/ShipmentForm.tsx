import * as React from 'react'
import { Button, Form, Header , Message} from 'semantic-ui-react'
import styled from 'styled-components'
import cargo from '../images/cargo.jpg'
import { useEffect, useContext, useState } from 'react'
import { AppContext } from '../provider/storeContext'
import { createShipment, fetchShipment, updateShipment } from '../services/shipment'
import ShipmentList from './ShipmentList'
import { MatchEtaType } from '../interfaces/shipment'
import { notify } from '../utils/helper'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const moment = require('moment')

const InnerDiv = styled.div`
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width:100vw;
    height:50vh;
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
type ShipmentType = {
    customer: string;
    vessel: string;
    'shipment-eta': string;
  }
const ShipmentForm = () => {
  const { state, dispatch } = useContext(AppContext)
  const [formData, setFormData] = useState<ShipmentType>({
    customer: '',
    vessel: '',
    'shipment-eta': ''
  })

  // const [matchEtaData, setMatchEtaData] = useState<MatchEtaType>()
  // useEffect(() =>{
  //     setMatchEtaData(state.matchEta)
  // }, [state])
  // console.log('matchEtaData', matchEtaData)
  const onSubmit = async (e:any) => {
    try {
    //   if (state.matchEta) {
    //     const response = await updateShipment(formData, state.matchEta.id)
    //     dispatch({ type: 'UPDATE_SHIPMENT', payload: response })
    //   } else {
        const response = await createShipment(formData)
        dispatch({ type: 'CREATE_SHIPMENT', payload: response })
    //   }
    } catch (err) {
        notify(err.response.data)
    }
  }
  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <>
      <InnerDiv style={{
        backgroundImage: `url(${cargo})`
      }}>
        <StyledHeader as="h1">Cargoplot will match you with the most suitable freight forwarders. Get competitive pricing and service to transport your goods.</StyledHeader>
        <StyledForm onSubmit={onSubmit}>
          <Form.Field>
            <StyledLabel>Customer Name:</StyledLabel>
            <input placeholder='customer' name="customer" disabled={state.matchEta.matchEta} onChange={handleInputChange}
              value={formData.customer}/>
          </Form.Field>
          <Form.Field>
            <StyledLabel>Vessel Name:</StyledLabel>
            <input placeholder='vessel' name="vessel" disabled={state.matchEta.matchEta} onChange={handleInputChange}
              value={formData.vessel}/>
          </Form.Field>
          <Form.Field>
            <StyledLabel>Shipment date:</StyledLabel>
            <input placeholder='date' name="shipment-eta" onChange={handleInputChange}
            //   value={moment(formData['shipment-eta']).format('YYYY-MM-DD')} 
              value={formData['shipment-eta']}/>
          </Form.Field>
          <Button type='submit' color="blue">{state.matchEta.matchEta ? 'Update shipment' : 'Add shipment'}</Button>
          <ToastContainer />
        </StyledForm>

      </InnerDiv>
      <ShipmentList formData={formData}/>
    </>
  )
}

export default ShipmentForm
