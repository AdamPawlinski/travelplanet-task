import * as React from 'react';
import Selectbox from './components/Selectbox';
import Button from './components/Button';
import { ButtonType } from './types/buttonProps';
import { useEffect, useState } from 'react';
import { type Room } from './types'

function App() {
  const placeholder = 'Hotel rooms'
  const [rooms, setRooms] = useState<Room[]>([])
  
  const fetchRooms: () => Promise<Room[] | void> = async () => {
    const res = await fetch('https://dcontent.inviacdn.net/shared/dev/test-api/rooms',
      {
        method: 'GET'
      },
    )
    if (!res.ok) {
      throw Error(res.statusText)
    }
    const data = await res.json()
    setRooms(data)
  }

  useEffect(() => {
    fetchRooms()
  },[])

  const handleSubmit: (e: any) => void = e => {
    e.preventDefault(); 
    // const form = e.target;
    console.log(e.target.elements.hotelRooms.value)
    // const formData = new FormData(form);
    // console.log(formData)
  }

  return (
    <div>
      <h1>Hotel rooms</h1>
      <form method="post" onSubmit={handleSubmit}>
        <label htmlFor='hotelRooms'>
          <Selectbox options={rooms} placeholder={placeholder}/>
        </label>
        <Button text={'Book the room'} type={ButtonType.submit} />
      </form>
    </div>
  )
}

export default App;
