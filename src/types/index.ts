export * from './buttonProps';
export * from './selectboxProps';

export type Price = {
  value: number, 
  currencyCode: string
}
export interface Room {
  id: string;
  name: string;
  price: Price,  
  availabilityStatus?: RoomAvailability,
  priceDifference?: number,
}

export enum RoomAvailability {
  available = "available",
  onRequest = "onRequest",
  soldout = "soldOut",
  error = "error"
}

export interface RoomStatus {
  availabilityStatus: RoomAvailability,
  price?: Price,
}
