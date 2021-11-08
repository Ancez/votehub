export type RoomState = { 'alive' : null } | { 'voted' : null } | { 'voting' : null };
export type RoomStyle = { 'abcd' : null } | { 'letscore' : null };

export interface Room {
    id: bigint;
    name: string;
    state: RoomState;
    style: RoomStyle;
}

export interface RoomParams {
  name: string;
}
