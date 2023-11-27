import * as React from 'react';
import Select from 'react-select'
import { type Room, RoomAvailability, type SelectboxProps } from '../types';
import * as classNames from "classnames";


function OptionLabel(props: Room) {
  const { name, price, availabilityStatus, priceDifference } = props

  return (
    <>
      <div className={classNames('option', {
          'option--unavailable': availabilityStatus === RoomAvailability.error || availabilityStatus === RoomAvailability.soldout
        })}>
        <div className='option__name'>{name} </div>
        <div className='option__price'>price: {price.value} {price.currencyCode}</div>
        <div className='option__status'>status: {availabilityStatus}</div>
        <div className='option__price-difference'>{priceDifference !== null ? `discount: ${priceDifference} ${price.currencyCode}` : ''}</div>
      </div>
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
      onMenuOpen={() => onSelectOpen(true)}
      placeholder={placeholder}
      onChange={onChange}
      closeMenuOnSelect={false}
      controlShouldRenderValue={true}
      getOptionValue={option => {
        return `${option.name} price: ${option.price?.value} ${option.price?.currencyCode}`
      }}
    />
  )
}