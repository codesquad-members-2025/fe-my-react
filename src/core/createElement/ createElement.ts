export default function createElement(type, props, ...children) {
  const { ref, key, ...rest } = props || null; // 불변성 유지
  const normalizedChildren = Array.isArray(children)
    ? children.flat(Infinity)
    : null;
  return Object.freeze({
    type,
    key: key ?? null,
    ref: ref ?? null,
    props: {
      ...rest,
      children: normalizedChildren.length === 0 ? null : normalizedChildren,
    },
  });
}
