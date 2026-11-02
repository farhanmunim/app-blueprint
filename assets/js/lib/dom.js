/* Tiny DOM helpers shared by every module. */

/** Viewport width (px) at or below which the mobile shell applies. Mirrors the 640px CSS breakpoint. */
export const MOBILE_MAX_WIDTH = 640;

export const $  = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
export const on = (el, event, handler) => el && el.addEventListener(event, handler);
export const isMobile = () => window.innerWidth <= MOBILE_MAX_WIDTH;
