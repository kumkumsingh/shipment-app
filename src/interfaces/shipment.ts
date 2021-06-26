
export type InitialStateType = {
    shipments: ShipmentType[];
  }
  export type ShipmentType = {
    customer: string;
    vessel: string;
    "shipment-eta": string;
  }
