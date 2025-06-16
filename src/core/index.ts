// 1. 개별 함수들을 import
import createElement from "./createElement/ createElement";
import { render } from "./render/render";

// 2. 하나의 객체에 묶어서 export
const MyReact = {
  createElement,
  render,
};

export default MyReact;
