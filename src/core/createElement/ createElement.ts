export default function createElement(type, props, ...children) {
  // key 와 ref 는 props에서 추출하여 상위 필드에 배치 해야합니다.
  const key = props && "key" in props ? props.key : null;
  const ref = props && "ref" in props ? props.ref : null;
  // key 와 ref 는 props에서 분리해야 합니다.
  if (props) {
    // 이때 원본 객체를 훼손 시켜도 될까? -> 불변성 지켜야 하지 않을까? (내 생각은 굳이..?)
    key && delete props.key;
    ref && delete props.ref;
  }

  return {
    type,
    key,
    ref,
    props: {
      ...props,
      children: children ?? null,
    },
  };
}
