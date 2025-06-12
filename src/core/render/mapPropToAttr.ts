interface ReturnObj {
  type: string;
  value: string;
}

// 1. JSX → HTML 특수 매핑 목록
const jsxToHtmlAttr: Record<string, string> = {
  className: "class",
  htmlFor: "for",
  acceptCharset: "accept-charset",
  httpEquiv: "http-equiv",
  contentEditable: "contenteditable",
  spellCheck: "spellcheck",
  tabIndex: "tabindex",
  readOnly: "readonly",
  maxLength: "maxlength",
  cellPadding: "cellpadding",
  cellSpacing: "cellspacing",
  frameBorder: "frameborder",
  marginHeight: "marginheight",
  marginWidth: "marginwidth",
  allowFullScreen: "allowfullscreen",
  autoComplete: "autocomplete",
  encType: "enctype",
  formAction: "formaction",
  formEncType: "formenctype",
  formMethod: "formmethod",
  formNoValidate: "formnovalidate",
  formTarget: "formtarget",
  crossOrigin: "crossorigin",
  srcSet: "srcset",
  useMap: "usemap",
};

// 2. 매핑 함수
/** 입력: VNode의 prop
 *반환: {type: 속성 타입, value: 매핑된 속성}
 *
 */
export function mapPropToAttr(propName: string): ReturnObj {
  // 2.1. 특수 케이스가 있으면 우선 사용
  if (propName in jsxToHtmlAttr) {
    return { type: "attribute", value: jsxToHtmlAttr[propName] };
  }

  // 2.2. 이벤트 핸들러(onClick → click)
  if (/^on[A-Z]/.test(propName)) {
    return { type: "event", value: propName.slice(2).toLowerCase() };
  }

  // 2.3. 기본: camelCase → kebab-case
  return {
    type: "default",
    value: propName
      .replace(/([A-Z])/g, "-$1") // 앞에 하이픈 붙이고
      .toLowerCase(), // 모두 소문자로
  };
}
