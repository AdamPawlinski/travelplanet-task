import * as React from 'react';
import Select from 'react-select'
import { Room, RoomWithStatus, SelectboxProps } from '../types';


function OptionLabel(props: Room & RoomWithStatus) {
  const { id, name, price, availabilityStatus, priceDifference } = props

  return (
    <>
      <div>{id} </div>
      <div>{name} </div>
      <div>{price?.value} {price?.currencyCode}</div>
      <div>{availabilityStatus}</div>
      <div>{priceDifference}</div>
    </>
  )
}


export default function Selectbox({...props}: SelectboxProps) {
  const { options, onSelectOpen, placeholder, onChange } = props;   
  
  return (
    <Select 
      name={'selectRoom'}
      className='select__component'
      formatOptionLabel={OptionLabel}
      options={options}
      isLoading
      onMenuOpen={onSelectOpen}
      placeholder={placeholder}
      onChange={onChange}
      closeMenuOnSelect={false}
      controlShouldRenderValue={true}
      getOptionValue={option => {
        return `${option.name} price: ${option.price.value} ${option.price.currencyCode}`
      }}
    />
  )
}