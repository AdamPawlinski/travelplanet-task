import { Dispatch, SetStateAction } from "react";
import { Room } from ".";

export type SelectboxProps = {
  placeholder?: string,
  options: Room[],
  onSelectOpen: Dispatch<SetStateAction<boolean>>,
  onChange: (value: Room) => void,
}