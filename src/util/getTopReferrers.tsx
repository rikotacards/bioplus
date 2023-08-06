import { LinkDetails } from "../db/api";

export const getTopReferrers = (data: LinkDetails[]) => {
  const allReferrers = {}
  const res = []
  data.forEach((link) => {
    const ref = link.referrer
    for(let refName in ref){
      allReferrers[refName] = ref[refName] + allReferrers[refName] || 0
    }
  })
  for(let key in allReferrers){
    res.push({referrer: key, clicks: allReferrers[key]})
  }
  return res.sort((a,b) => b.clicks-a.clicks)
}