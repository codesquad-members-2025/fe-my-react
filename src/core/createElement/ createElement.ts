import type { HTMLAttributes } from "@/shared/types/props";
import type { Child, Children, VNode } from "@/shared/types/vnode";

export default function createElement(
  type: string | Function,
  props: HTMLAttributes | null,
  ...children: any[] // (Child | Child[])[] 이거 왜 안되는데?
): Readonly<VNode> {
  const { ref, key, ...rest } = props ?? {};
  const normalizedChildren: Children = Array.isArray(children)
    ? (children.flat(Infinity) as Child[])
    : null;

  const normalizedKey =
    typeof key === "string" || typeof key === "number" ? key : null;

  const rawChildren: Children =
    normalizedChildren?.length === 0 ? null : normalizedChildren; // 굳이 이 로직이 필요할까?

  const vnode: VNode = {
    type,
    key: normalizedKey,
    ref: ref ?? null,
    props: {
      ...rest,
      children: rawChildren,
    },
  };

  if (typeof type === "function") {
    vnode.hookMetaData = {
      hooks: [],
      pointer: 0,
    };
  }

  const result: Readonly<VNode> = Object.freeze(vnode);

  return result;
}
