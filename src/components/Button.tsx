import * as React from 'react';
import { ButtonProps } from '../types';

export default function Button(props: ButtonProps) {
const {text, type = 'button', disabled} = props
  return (
    <button type={type} className="form__button" disabled={disabled}>
      {text}
    </button>
  )
}