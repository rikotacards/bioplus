import { LinkDetails } from "../db/api";

export const getSortedFieldByClicks = (data: LinkDetails[], field: string) => {
  const result = {}
  const res = []
  data.forEach((link) => {
    const referrerObject = link[field]
    if(referrerObject){
      for(let refName in referrerObject){
        result[refName] = result[refName]||0 + referrerObject[refName] 
      }
    }
    
  })
  for(let key in result){
    res.push({referrer: key, clicks: result[key]})
  }
  return res.sort((a,b) => b.clicks-a.clicks)
}