
import { cityDataType } from './cityDataTypes'
import { nestGroupsBy } from '../utils/groupFunctions'


export const DropDownList = ({ dataObject }: { dataObject: cityDataType[] }) => {
  
  let siteObject = nestGroupsBy(dataObject, ['obj_location', 'device_descrip'])
  let locationKeyArray = Object.keys(siteObject)
  let siteKeyArray = Object.keys(siteObject[locationKeyArray[0]])
  
  const CreatDropDownMenu = ()=>{
    // debugger
    for (let i = 0; i < siteKeyArray.length; i++) {
      const optionObject = locationKeyArray.map((locationID) => {
        let locationName = siteObject[locationID][siteKeyArray[0]][0].location_descrip
        return (
          <option key={locationID} value={locationID}>
            {locationName}
          </option>
        )
      })
      return optionObject
    }
  }
  return (
    <>
      {CreatDropDownMenu()}
    </>
  )
}

