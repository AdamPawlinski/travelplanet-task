import * as React from 'react';
import { useEffect, useRef } from 'react';
import { SelectOptionProps } from '../types/selectOptionProps';
import { RoomStatus } from '../types';

export default function SelectOption(props: SelectOptionProps) {
  const { option, availability } = props;
  const roomAvailability = useRef<RoomStatus>()

  useEffect(
    () => {
      //@ts-ignore
      roomAvailability.current = availability.filter(
        room => availability.indexOf(room) + 1 === Number(option.id)
      )
    }, []
  )
  return (
    <option value={option.id}>
      <span>{option.id} </span>
      <span>{option.name} </span>
      <span>{option.price.value} {option.price.currencyCode}</span>
      <span>{roomAvailability.current?.availabilityStatus}</span>
    </option>
  )
}