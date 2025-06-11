type Child = VNode | string | number | null;
type Children = Child[] | null;

interface HTMLAttributes {
  // HTML 기본 속성
  className?: string;
  id?: string;
  // 이벤트 핸들러
  onClick?: (event: MouseEvent) => void;
  onChange?: (event: Event) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  onKeyUp?: (event: KeyboardEvent) => void;
  onKeyPress?: (event: KeyboardEvent) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  onInput?: (event: Event) => void;
  onMouseEnter?: (event: MouseEvent) => void;
  onMouseLeave?: (event: MouseEvent) => void;
  // 중요한 props들 ...?
  ref?: any;
  key?: string | number;
}

type VNodeProps = HTMLAttributes & { children: Children };

interface VNode {
  type: string | Function;
  key: string | number | null;
  ref: any;
  props: VNodeProps;
}

export default function createElement(
  type: string | Function,
  props: HTMLAttributes | null,
  ...children: (Child | Child[])[]
): Readonly<VNode> {
  const { ref, key, ...rest } = props ?? {};
  const normalizedChildren: Children = Array.isArray(children)
    ? (children.flat(Infinity) as Child[])
    : null;

  const normalizedKey =
    typeof key === "string" || typeof key === "number" ? key : null;

  const rawChildren: Children =
    normalizedChildren?.length === 0 ? null : normalizedChildren;

  const rawResult: VNode = {
    type,
    key: normalizedKey,
    ref: ref ?? null,
    props: {
      ...rest,
      children: rawChildren,
    },
  };

  const result: Readonly<VNode> = Object.freeze(rawResult);

  return result;
}
