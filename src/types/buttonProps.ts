export enum ButtonType {
  submit = 'submit',
  reset = 'reset',
  button = 'button'
}

export type ButtonProps = {
  text: string,
  type: ButtonType
}