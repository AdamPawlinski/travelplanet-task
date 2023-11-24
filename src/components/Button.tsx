import * as React from 'react';
import { ButtonProps } from '../types/buttonProps';

export default function Button(props: ButtonProps) {
const {text, type = 'button'} = props

  return (
    <button type={type}>
      {text}
    </button>
  )
}