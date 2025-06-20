import type { HTMLAttributes } from "./props";

export type Child = VNode | string | number | null;
export type Children = Child[] | null;
export type State = unknown;
export type SetState = (newValue: any) => void;
export type HookMetaData = [State, SetState];
export type HookMetaDataArr = Array<HookMetaData>;
export interface VNode {
  type: string | Function;
  key: string | number | null;
  ref: any;
  props: HTMLAttributes & { children: Children };
  hookMetaData?: {
    hooks: HookMetaDataArr;
    pointer: number;
  };
}
