import { ReactNode } from "react"
import { Room } from ".";

export type SelectboxProps = {
  placeholder?: string,
  options: Room[];
  children?: ReactNode
}