/**
 * Render element in different location. Used for rendering modals, lightboxes, drawers, etc.
 *
 * @param {string} selector - A valid CSS selector of the target element.
 *
 * @example ```svelte
 *   <div use:portal={"#portal"}>
 *     This will be rendered in #portal
 *   </div>
 * ```
 */
export function portal(node: HTMLElement, selector: string) {
  // find an element with this ID somewhere in the document
  let slot = document.querySelector(selector);
  // move this node to that element
  slot?.appendChild(node);

  return {
    destroy() {
      // remove the node when component is destroyed
      node.remove();
    },
  };
}

/**
 * Handle clicking outside an element.
 *
 * @param callback The callback to be called when the user clicks outside the element.
 *
 * @example ```svelte
 *  <div use:clickOutside={() => alert("Clicked outside")}>
 *     This will trigger an alert when the user
 *     clicks outside the element.
 *   </div>
 * ```
 */
export function clickOutside(node: HTMLElement, callback: () => void) {
  const handleClick = (event: any) => {
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      callback();
    }
  };

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    },
  };
}
