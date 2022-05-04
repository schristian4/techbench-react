export function createParameterArray(
  location: any,
  param: string,
  majoreSiteName:string[],
  siteObject: number[]
) {
  let filters: any = siteObject[location]
  console.log(filters)
  let tempArray: object[] = []
  filterMajorSite(tempArray, filters, majoreSiteName, param)
  return tempArray
}

export function getPercentage(paramArray: string[]) {
  let errorCounter = 0
  for (let i = 0; i < paramArray.length; i++) {
    if (parseInt(paramArray[i]) !== 0) {
      errorCounter++
    }
  }
  return 100 - Math.round((errorCounter / paramArray.length) * 100)
}

function filterMajorSite(tempArray: object[], filters: object[], majoreSiteName: string | number,param: string ){
  for (let i in filters) {
    if (i === majoreSiteName) {
      for (let key in filters[i]) {
        return tempArray.push(filters[majoreSiteName][key][param])
        console.log(test)
      }
    }
  }
}