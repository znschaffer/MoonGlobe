import { format, parse } from "date-fns"
export function scale(number: any, inMin: any, inMax: any, outMin: any, outMax: any) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

export function parseDate(date: string){
  if (date) {
    return format(parse(date, "yyMMddHHmm", new Date("1970-01-01")), 'MM/dd/yyyy hh:mm')

  } else return new Date("1970-01-01")
}