/*  2024-08-04 01:47:28
Function for Event Delegation :
This function allows you to add event listeners to elements that are not yet created or added to the DOM.

Usage:
const container = document.querySelector(".container");
if (container) { // container가 null이 아닌지 확인
  addGlobalEventListener("click", ".divBox", (e) => {
    const target = e.target as Element; // 타입 단언을 사용하여 target이 Element임을 명시
    target.classList.toggle("round");
  }, container);
}
*/
export function addGlobalEventListener(
  type: keyof DocumentEventMap,
  selector: string,
  callback: (e: Event) => void,
  parent: Document | Element = document
) {
  parent.addEventListener(type, (e) => {
    if (e.target instanceof Element && e.target.matches(selector)) {
      callback(e);
    }
  });
}
