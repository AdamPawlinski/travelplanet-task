export type Price = {
  value: number, 
  currencyCode: string
}
export interface Room {
  id: string;
  name: string;
  price: Price,  
}

export enum RoomAvailability {
  available = "available",
  onRequest = "onRequest",
  soldout = "soldout",
  error = "error"
}

export type RoomStatus = {
  availabilityStatus: RoomAvailability,
  price: Price,
}