
// route
export const ROUTE_CHANGED = 'ROUTE_CHANGED';

export function routeChanged(route) {
  console.log('!!! routeChanged', route);
  return { type: ROUTE_CHANGED, route: route };
}
