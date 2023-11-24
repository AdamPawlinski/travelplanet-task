import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { SelectboxProps } from '../types/selectboxProps';
import SelectOption from './SelectOption';
import { Room, RoomStatus } from '../types';

export default function Selectbox(props: SelectboxProps) {
  const {placeholder, options} = props;  
  const [roomStatus, setRoomStatus] = useState<RoomStatus[]>([])
  const isOpen = useRef(false)

  const sortFunc = (a: Room, b: Room) => {
    return a.price.value - b.price.value
  }

  const fetchAvailability: () => Promise<Room[] | void> = async () => {
    options.map(async(option, index) => {
      const res = await fetch(`https://dcontent.inviacdn.net/shared/dev/test-api/room/${index + 1}`,
        {
          method: 'GET'
        },
      )
      if (!res.ok) {
        throw Error(res.statusText)
      }
      const data = await res.json()
      setRoomStatus(oldData => [...oldData, data])
    })
  }
  const handleOpen = () => {
    isOpen.current = !isOpen.current
  }
  console.log(roomStatus)

  useEffect(() => {
    // if (isOpen.current) {
      console.log('fetch')
      fetchAvailability()
    // }
  },[isOpen.current])

  return (
    <select id="hotelRooms" name="hotel-rooms" onChange={() => handleOpen} >
      { 
      options.sort(sortFunc).map(room => (
          <SelectOption option={room} availability={roomStatus} key={room.id} />
        ))
       || <option>{placeholder}</option>
      } 
    </select>
  )
}