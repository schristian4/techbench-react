import { useState, useEffect } from 'react'

import { cityDataType } from '../cityDataTypes'
import { nestGroupsBy } from '../groupFunction'

export const DropDownList = ({ dataObject }: { dataObject: cityDataType[] }) => {
  
  let siteObject = nestGroupsBy(dataObject, ['obj_location', 'device_descrip'])
  let [locationList, setLocationList] = useState(siteObject)
  
  let locationKeyList = Object.keys(locationList)
  let siteKeyList = Object.keys(locationList[locationKeyList[0]])
  
  const CreatDropDownMenu = ()=>{
    // debugger
    for (let i = 0; i < siteKeyList.length; i++) {
      const optionObject = locationKeyList.map((locationID) => {
        let locationName = siteObject[locationID][siteKeyList[0]][0].location_descrip
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

