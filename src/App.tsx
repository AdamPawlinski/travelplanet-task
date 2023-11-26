import * as React from 'react';
import Selectbox from './components/Selectbox';
import Button from './components/Button';
import { ButtonType } from './types/buttonProps';
import { useEffect, useState, useRef } from 'react';
import type { RoomStatus, Room, RoomWithStatus } from './types';
import { RoomAvailability } from './types';

function App() {
  const placeholder = 'Pick the room'
  const [rooms, setRooms] = useState<Room[]>([])
  const [roomStatus, setRoomStatus] = useState<RoomStatus[]>([])
  const [roomWithStatus, setRoomWithStatus] = useState<RoomWithStatus[]>([])
  const isButtonDisabled = useRef(false);
  
  const sortFunc = (a: Room, b: Room) => {
    return a.price.value - b.price.value
  }

  // fetching rooms list

  const fetchRooms: () => Promise<Room[] | void> = async () => {
    const res = await fetch('https://dcontent.inviacdn.net/shared/dev/test-api/rooms',
      {
        method: 'GET'
      },
    )
    if (!res.ok) {
      throw Error(res.statusText)
    }
    const data: Room[] = await res.json()
    data.sort(sortFunc)
    setRooms(data)
  }

  useEffect(() => {
    fetchRooms()
  },[])  

  // fetching rooms availability status

  const fetchAvailability: () => Promise<Room[] | void> = async () => {
    rooms.map(async(option, index) => {
      const res = await fetch(`https://dcontent.inviacdn.net/shared/dev/test-api/room/${index + 1}`,
        {
          method: 'GET'
        },
      )
      if (!res.ok) {
        throw Error(res.statusText)
      }
      const data: RoomStatus = await res.json()
      setRoomStatus(oldData => [...oldData, data])
    })
  }

  useEffect(() => {
    fetchAvailability()
  },[])

  const loadOptions = async () => {
    const mergeRoomsData = await rooms.map(
      room => (
        Object.defineProperties(room, {
          price: {
            value: roomStatus[parseInt(room.id) - 1].price.value
          },
          availabilityStatus: {
            value: roomStatus[parseInt(room.id) - 1].availabilityStatus
          },
          priceDifference: {
            value: room.price.value - roomStatus[parseInt(room.id) - 1].price.value ?? "unavailable"
          }
        })
      )        
    )
    mergeRoomsData.sort(sortFunc)
    setRoomWithStatus(mergeRoomsData as RoomWithStatus[]) 
  }

  // handling button disabling when unavailable room is selected

  const handleRoomChange = (value: RoomWithStatus) => {
    if (value.availabilityStatus === RoomAvailability.soldout || value.availabilityStatus === RoomAvailability.error) {
      isButtonDisabled.current = true
    }
  }

  // handling form submit

  const handleSubmit: (e: any) => void = e => {
    e.preventDefault(); 
    if (e.target.elements.selectRoom.value) console.log(e.target.elements.selectRoom.value)
  }

  return (
    <div className="main">
      <h1>Find the best room for you</h1>
      <form method="post" onSubmit={handleSubmit} className='form'>
        <label className="select__label">
          Choose the available room: 
          <Selectbox options={roomWithStatus || rooms} placeholder={placeholder} onSelectOpen={loadOptions} onChange={handleRoomChange} />
        </label>
        <Button text={'Book the room'} type={ButtonType.submit} disabled={isButtonDisabled.current} />
      </form>
    </div>
  )
}

export default App;
