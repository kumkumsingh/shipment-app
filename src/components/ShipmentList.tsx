import * as React from 'react'
import { Segment, Button, Header, Popup, Message } from 'semantic-ui-react'
import { FormDataType, ShipmentType } from '../interfaces/shipment'
import { fetchShipment, updateShipment, fetchVessel } from '../services/shipment'
import { useEffect, useContext, useState } from 'react'
import { AppContext } from '../provider/storeContext'
import styled from 'styled-components'
import { notify } from '../utils/helper'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StyledSegement = styled(Segment)`
  width: 150px !important;
`
interface IShipmentListProps {
  formData: FormDataType
}
const ShipmentList = (props: IShipmentListProps) => {
  const { state, dispatch } = useContext(AppContext)
  const [matchEta, setMatchEta] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchShipment()
      dispatch({ type: 'FETCH_SHIPMENT', payload: data })
    }
    fetchData()
  }, [dispatch])

  const fetchVesselData = async (name: string, eta: string) => {
    try {
      const data = await fetchVessel(name)
      dispatch({ type: 'FETCH_VESSEL', payload: data })
      if (eta < data['vessel-eta']) {
        setMatchEta(true)
      }
    } catch (err) {
        notify(err.error)
    }
  }
  const shipmentVesselMatch = (id: number) => {
    dispatch({ type: 'MATCH_VESSEL_SHIPMENT', payload: { matchEta, id } })

    // try{
    //      const response = await updateShipment(props.formData, id)
    //      dispatch({type: 'UPDATE_SHIPMENT', payload:response })
    //       }
    //       catch (err) {
    //       console.log(err.error)
    //     }
  }
  return (
    <React.Fragment>
      <Header as="h2" textAlign="center" color="blue">
        Your shipment lists
      </Header>
      {state?.shipments?.map((shipment: ShipmentType) => {
        return (
          <Segment.Group horizontal>
            <StyledSegement>Customer: &nbsp;{shipment.customer}</StyledSegement>
            <StyledSegement>Vessels: &nbsp;{shipment.vessel}</StyledSegement>
            <StyledSegement>Shipment-eta: &nbsp;{shipment['shipment-eta']}</StyledSegement>
            <StyledSegement>
              <Popup
                trigger={
                  <Button
                    content="Vessel details"
                    color="blue"
                    onClick={() => fetchVesselData(shipment.vessel, shipment['shipment-eta'])}
                  />
                }
                hoverable
              >
                <Popup.Header>Vessel Details </Popup.Header>
                <ToastContainer />
                <Popup.Content>
                  <Segment>Vessel : &nbsp;{state?.vessel?.name}</Segment>
                  <Segment>Vessel ETA: &nbsp;{state?.vessel?.['vessel-eta']}</Segment>
                  {matchEta && <Message color="red">Update your shipment </Message>}
                  {matchEta && (
                    <Button
                      color="blue"
                      onClick={() => shipmentVesselMatch(shipment.id)}
                    >
                      Ok
                    </Button>
                  )}
                </Popup.Content>
              </Popup>
            </StyledSegement>
          </Segment.Group>
        )
      })}
    </React.Fragment>
  )
}

export default ShipmentList
