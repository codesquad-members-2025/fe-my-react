import type { HTMLAttributes } from "./props";

export type Child = VNode | string | number | null;
export type Children = Child[] | null;
type State = unknown;
type SetState = (newValue: any) => void;
type Pointer = number;
export type HookMetaData = [State, SetState, Pointer];
export type HookMetaDataArr = Array<HookMetaData>;
export interface VNode {
  type: string | Function;
  key: string | number | null;
  ref: any;
  props: HTMLAttributes & { children: Children };
  hookMetaData?: {
    //TODO:포인터를 굳이 넣을 필요가 있을까...?
    hooks: HookMetaDataArr;
    pointer: number;
  };
}
