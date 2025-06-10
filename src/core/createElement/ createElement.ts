export default function createElement(type, props, ...children) {
  const { ref, key, ...rest } = props || null; // 불변성 유지

  return {
    type,
    key: key ?? null,
    ref: ref ?? null,
    props: {
      ...rest,
      children: children ?? null,
    },
  };
}
