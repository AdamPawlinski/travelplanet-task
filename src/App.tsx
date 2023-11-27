import * as React from 'react';
import Selectbox from './components/Selectbox';
import Button from './components/Button';
import { ButtonType } from './types/buttonProps';
import { useEffect, useState } from 'react';
import type { RoomStatus, Room } from './types';
import { RoomAvailability } from './types';

export default function App() {
  const placeholder = 'Pick the room'
  const [rooms, setRooms] = useState<Room[]>([])
  const [loadData, setLoadData] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  

  // sorting utility function

  const sortFunc = (a: Room, b: Room) => {
    return a?.price.value - b?.price.value
  }

  // fetching rooms list

  const fetchRooms = async () => {
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

  useEffect(() => {
    let active = true;
    const fetchAvailability = async(id: string) => {     
      const res = await fetch(`https://dcontent.inviacdn.net/shared/dev/test-api/room/${id}`,
        {
          method: 'GET'
        },
      )
      if (!res.ok) {
        throw Error(res.statusText)
      }
      const data: RoomStatus = await res.json() 

      if(active) {
        mergeRoomsData(id, data)
      }      
    }
    const roomsCopy = [...rooms];
    setRooms([]);
    roomsCopy.forEach((room) => fetchAvailability(room.id))
    return () => {
      active = false;
    }
  },[loadData])  

  const mergeRoomsData = (id: string, data: RoomStatus) => {
    const roomWithId = rooms.find((room) => room.id === id);

    if (roomWithId) {
      const mergedData = Object.defineProperties(roomWithId, {
        price: {          
          value: {
              value: data.price?.value ? data.price.value : 0,
              currencyCode: data.price?.currencyCode ? data.price.currencyCode : '',
            }          
        },
        availabilityStatus: {
          value: data?.availabilityStatus
        },
        priceDifference: {
          value: data?.price?.value ? roomWithId.price.value - data?.price?.value : "unavailable"
        }
      })
      setRooms(prevState => ([...prevState, mergedData].sort(sortFunc)));
    }
  }
  
  // handling button disabling when unavailable room is selected

  const handleRoomChange = (value: Room) => {
    if (value.availabilityStatus === RoomAvailability.soldout || value.availabilityStatus === RoomAvailability.error) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }

  // handling form submit

  const handleSubmit: (e: any) => void = e => {
    e.preventDefault(); 
    if (e.target.elements.selectRoom.value) 
    console.log(e.target.elements.selectRoom.value);
    alert(e.target.elements.selectRoom.value);
  }

  return (
    <div className="main">
      <h1>Travelplanet finds the best room for you</h1>
      <form method="post" onSubmit={handleSubmit} className='form'>
        <label className="select__label">
          Choose the available room: 
          <Selectbox options={rooms} placeholder={placeholder} onSelectOpen={setLoadData} onChange={handleRoomChange} />
        </label>
        <Button text={'Book the room'} type={ButtonType.submit} disabled={isButtonDisabled} />
      </form>
    </div>
  )
}

