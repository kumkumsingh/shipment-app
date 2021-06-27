
export type InitialStateType = {
    shipments: ShipmentType[];
  }
  export type ShipmentType = {
    id:number;
    customer: string;
    vessel: string;
    "shipment-eta": string;
  }
  export type FormDataType = {
    customer: string;
    vessel: string;
    "shipment-eta": string;
  }
