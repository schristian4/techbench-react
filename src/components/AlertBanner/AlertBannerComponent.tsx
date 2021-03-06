import { cityDataType } from '../../data/cityDataTypes'
import { nestGroupsBy } from '../../utils/groupFunctions'
import { createParameterArray } from '../../utils/createParameterArray'

//Function to Count the number of errors at each Location
function counter(targetArray: any[]): number{
  let counter = 0
  for (let i = 0; i < targetArray.length; i++) {
    if (targetArray[i] !== '0') {
      counter++
    }
  }
  return counter
}

//Create Incident Banner
export const AlertBanner = ({ dataObject }: { dataObject: cityDataType[] }) => {
  //Formated Data Object
  const siteObject = nestGroupsBy(dataObject, ['obj_location', 'device_descrip'])
  let LocationKeyArray = Object.keys(siteObject)
  let firstSiteKeyPosition = Object.keys(siteObject[LocationKeyArray[0]])[0]

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

  const updateAlertBanner = () => {
    let incidentCityReturnObject: JSX.Element[] = []
    for (let i = 0; i < LocationKeyArray.length; i++) {
      let locationName = siteObject[LocationKeyArray[i]][firstSiteKeyPosition][0].location_descrip
      let siteKeyArray = Object.keys(siteObject[LocationKeyArray[i]])
      let locationNumberID: number = Number(LocationKeyArray[i])
      let locationErrorCount: number = 0

      siteKeyArray.map((targetMajorSite: string) => {
        return (locationErrorCount =
          locationErrorCount +
          counter(createParameterArray(locationNumberID, 'status', targetMajorSite, siteObject)))
      })
      if (locationErrorCount > 0) {
        let AlertBannerOBject = createAlertItem(locationName, locationErrorCount, i)
        incidentCityReturnObject.push(AlertBannerOBject)
      }
    }
    return incidentCityReturnObject
  }

  return (
    <div className="container bg-dark border-light">
      <p className="bg-gradient" style={{ color: 'white', fontWeight: 'bold' }}>
        Incident History Log
      </p>
      <div id="AlertBanner" className='incidentLog-container'>
        {updateAlertBanner().map((x) => {
          return x
        })}
      </div>
    </div>
  )
}
