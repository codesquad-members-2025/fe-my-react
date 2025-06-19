import type { HTMLAttributes } from "./props";
export type Child = VNode | string | number | null;
export type Children = Child[] | null;
export interface VNode {
  type: string | Function;
  key: string | number | null;
  ref: any;
  props: HTMLAttributes & { children: Children };
  hookMetaData?: {
    hooks: (string | number | boolean)[];
    pointer: number;
  };
}
