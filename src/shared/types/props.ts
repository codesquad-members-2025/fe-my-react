export interface HTMLAttributes {
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
