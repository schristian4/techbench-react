import { cityDataType } from '../cityDataTypes'
import { nestGroupsBy } from '../groupFunctions'
import { createParameterArray } from './moduleFunctions'

//Function to Count the number of errors at each Location
function counter(targetArray: string[]) {
  let counter = 0
  for (let i = 0; i < targetArray.length; i++) {
    if (targetArray[i] !== '0') {
      counter++
    }
  }
  return counter
}

//Create Incident Banner
export const IncidentBanner = ({ dataObject }: { dataObject: cityDataType[] }) => {
  //Formated Data Object
  const siteObject = nestGroupsBy(dataObject, ['obj_location', 'device_descrip'])
  let LocationKeyArray = Object.keys(siteObject)

  const createAlertItem = (locationName: string, count: number, index: number) => {
    return (
      <div key={index} className="alertItem">
        <h1 className="">{locationName}</h1>
        <div className="count-text">
          <p>Error Count:</p>
          <p>{count}</p>
        </div>
      </div>
    )
  }


  let firstSiteKeyPosition = Object.keys(siteObject[LocationKeyArray[0]])[0]
  const updateAlertBanner = () => {
    let incidentCityReturnObject: any[] = []
    for (let i = 0; i < LocationKeyArray.length; i++) {
      let locationName = siteObject[LocationKeyArray[i]][firstSiteKeyPosition][0].location_descrip
      let siteKeyArray = Object.keys(siteObject[LocationKeyArray[i]])
      let locationNumberID = LocationKeyArray[i]
      let locationErrorCount: number = 0

      siteKeyArray.map((targetMajorSite) => {
        return (locationErrorCount =
          locationErrorCount +
          counter(createParameterArray(locationNumberID, 'status', targetMajorSite, siteObject)))
      })
      // console.log(`Location #:${locationNumberID} Location Error Count:${locationErrorCount}`)
      if (locationErrorCount > 0) {
        let incidentBannerOBject = createAlertItem(locationName, locationErrorCount, i)
        incidentCityReturnObject.push(incidentBannerOBject)
      }
    }

    return incidentCityReturnObject
  }

  return (
    <div className="container bg-dark border-light">
      <p className="bg-gradient" style={{ color: 'white', fontWeight: 'bold' }}>
        Incident History Log
      </p>
      <div id="IncidentBanner" className='incidentLog-container'>
        {updateAlertBanner().map((x) => {
          return x
        })}
      </div>
    </div>
  )
}
