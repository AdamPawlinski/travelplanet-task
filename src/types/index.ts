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
}

export enum RoomAvailability {
  available = "available",
  onRequest = "onRequest",
  soldout = "soldout",
  error = "error"
}

export interface RoomStatus {
  availabilityStatus: RoomAvailability,
  price: Price,
}

export interface RoomWithStatus extends Room {
  availabilityStatus?: RoomAvailability,
  priceDifference?: number,
};