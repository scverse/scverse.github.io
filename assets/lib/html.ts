/** Is the pointer event’s position inside `element`’s box? */
export const isInside = (element: Element, { clientX, clientY }: MouseEvent): boolean => {
  const { top, bottom, left, right } = element.getBoundingClientRect()
  return clientY >= top && clientY <= bottom && clientX >= left && clientX <= right
}

/** Create an HTML element */
export const el = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: Partial<HTMLElementTagNameMap[K]>,
  ...children: (Node | string)[]
): HTMLElementTagNameMap[K] => {
  const element = Object.assign(document.createElement(tag), props)
  element.append(...children)
  return element
}
