import { Room, RoomWithStatus } from ".";

export type SelectboxProps = {
  placeholder?: string,
  options: Room[],
  onSelectOpen: () => void,
  onChange: (value: RoomWithStatus) => void,
}