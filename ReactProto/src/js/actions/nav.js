
// nav
export const NAV_PEEK = 'NAV_PEEK';
export const NAV_ACTIVATE = 'NAV_ACTIVATE';
export const NAV_RESPONSIVE = 'NAV_RESPONSIVE';

export function navPeek(peek) {
  return { type: NAV_PEEK, peek: peek };
}

export function navActivate(active) {
  return { type: NAV_ACTIVATE, active: active };
}

export function navResponsive(responsive) {
  return { type: NAV_RESPONSIVE, responsive: responsive };
}
