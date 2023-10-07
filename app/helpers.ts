export function scale(number: any, inMin: any, inMax: any, outMin: any, outMax: any) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}