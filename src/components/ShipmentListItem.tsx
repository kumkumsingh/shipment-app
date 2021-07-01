import * as React from 'react'
import { Segment, Button, Input, Message, Modal } from 'semantic-ui-react'
import { ShipmentType } from '../interfaces/shipment'
import { fetchVessel, updateShipment } from '../services/shipment'
import { useContext, useState } from 'react'
import { AppContext } from '../provider/storeContext'

import styled from 'styled-components'
import { notify } from '../utils/helper'
import 'react-toastify/dist/ReactToastify.css'
import moment from 'moment'

const StyledSegement = styled(Segment)`
  width: 150px !important;
`
const ModalSegement = styled(Segment)`
  display:flex;
  flex-direction:row;
  justify-content:space-between;
`
type IShipmentListItem = {
 shipment:ShipmentType
}
const ShipmentListItem = (props:IShipmentListItem) => {
  const { state, dispatch } = useContext(AppContext)
  const [updatedShipmentEta, setUpdatedShipmentEta] = useState<string>()
  const [open, setOpen] = React.useState(false)

  const fetchVesselData = async (name: string, eta: string) => {
    dispatch({ type: 'SHIPMENT_DETAILS', payload: props.shipment })

    try {
      const data = await fetchVessel(name)

      dispatch({ type: 'FETCH_VESSEL', payload: data })

      if (eta < data['vessel-eta']) {
        dispatch({ type: 'MATCH_VESSEL_SHIPMENT', payload: true })
      }
    } catch (err) {
      notify(err.error)
    }
  }
  const handleSubmit = async () => {
    try {
      const response = await updateShipment({
        customer: state.details.customer,
        vessel: state.details.vessel,
        'shipment-eta': moment(updatedShipmentEta).format('YYYY-MM-DD')
      }, state.details.id)
      dispatch({ type: 'UPDATE_SHIPMENT', payload: response })
      setOpen(false)
      notify('Successfully updated')
    } catch (err) {
      notify(err.response.data)
    }
  }
  return (<Segment.Group horizontal key={props.shipment.id}>
    <StyledSegement>Customer: &nbsp;{props.shipment.customer}</StyledSegement>
    <StyledSegement>Vessels: &nbsp;{props.shipment.vessel}</StyledSegement>
    <StyledSegement>Shipment-eta: &nbsp;{props.shipment['shipment-eta']}</StyledSegement>
    <StyledSegement>

      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        key={props.shipment.id}
        trigger={
          <Button
            key={props.shipment.id}
            content="Vessel details"
            color="blue"
            onClick={() => fetchVesselData(props.shipment.vessel, props.shipment['shipment-eta'])}
          />
        }

      >
        <Modal.Header>Details </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <ModalSegement>
              <p>Customer: {props.shipment.customer}</p>
              <p>Vessel: {props.shipment.vessel}</p>
            </ModalSegement>
            <ModalSegement><p>Shipment-ETA: {props.shipment['shipment-eta']}</p>
              <p>Vessel-ETA: {state.vessel['vessel-eta']}</p>  </ModalSegement>
            {state.matchEta && <Message color="red">Update your shipment</Message>}
            {state.matchEta && <Segment>Select new shipment date:<Input type="date" fluid name="shipment-eta" onChange={(e) => { setUpdatedShipmentEta(e.target.value) }}></Input></Segment>}
            <Modal.Actions>
              <Button color='blue' onClick={() => setOpen(false)}>
            Cancel
              </Button>
              {state.matchEta ? (<Button
                color="blue"
                disabled={!updatedShipmentEta}
                content={'Update shipment ETA'}
                onClick={handleSubmit}
              />) : (<Button
                color="blue"
                content={'Ok'}
                onClick={()=>setOpen(false)}
              />) }

            </Modal.Actions>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </StyledSegement>
  </Segment.Group>)
}
export default ShipmentListItem
