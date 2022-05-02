export function createParameterArray(
  location: string,
  param: string,
  majoreSiteName: any,
  siteObject: any
) {
  let filters = siteObject[location]

  let tempArray = []
  if (majoreSiteName === undefined || majoreSiteName === null) {
    for (let i in filters) {
      for (let key in filters[i]) {
        tempArray.push(filters[i][key][param])
      }
    }
  } else {
    for (let i in filters) {
      if (i === majoreSiteName) {
        for (let key in filters[i]) {
          tempArray.push(filters[majoreSiteName][key][param])
        }
      }
    }
  }
  return tempArray
}

export function availability(paramArray: string[]) {
  let errorCounter = 0
  for (let i = 0; i < paramArray.length; i++) {
    if (parseInt(paramArray[i]) !== 0) {
      errorCounter++
    }
  }
  return 100 - Math.round((errorCounter / paramArray.length) * 100)
}
