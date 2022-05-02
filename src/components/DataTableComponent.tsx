import { useState, useEffect } from 'react'

import { cityDataType } from '../cityDataTypes'
import { nestGroupsBy } from '../groupFunction'
import { createParameterArray, availability } from './moduleFunctions'

export const DataTable = ({
  dataObject,
  selectedOption,
}: {
  dataObject: cityDataType[]
  selectedOption: any
}) => {
  const siteObject = nestGroupsBy(dataObject, ['obj_location', 'device_descrip'])

  const majorSiteObjectTarget = siteObject[selectedOption]

  const majorSiteNameArray = Object.keys(majorSiteObjectTarget)

  const gridEntry = (percentage: string | number, inputDate: any, inputTime: any) => {
    let minibar__bar = 'minibar__bar'
    let minibar__fill = 'minibar__fill'
    if (Number(inputTime) == 0) {
      minibar__bar = 'minibar__bar red'
      minibar__fill = 'minibar__fill red'
    }
    percentage = percentage + "%"
    return (
      <div className={minibar__bar}>
        <span className="minibar__tooltip">
          <div>Date: {inputDate}</div>
          <div>Response Time: {Number(inputTime).toFixed(3)}</div>
        </span>
        <div className={minibar__fill} style={{ height: percentage }}></div>
      </div>

      // <div class="minibar__bar">
      //     <span class="minibar__tooltip">
      //       <div>Date: 2021-04-04 08:15:16</div>
      //       <div>Response Time: 0.085s</div>
      //     </span>
      //     <div class="minibar__fill" style="height:100%"></div>
      //   </div>
    )
  }

  const createResponseTimeGrid = (timestampArray: any[], responseTimeArray: any[]) => {
    let tempArray = []
    tempArray.push(timestampArray, responseTimeArray)

    let inputSelection, heightPercentage
    for (let i = 0; i < tempArray[0].length; i++) {
      console.log(i)
      debugger
      if (tempArray[1].length > 1) {
        inputSelection = tempArray[1][i]
        let minValue = Math.min(...tempArray[1])
        let maxValue = Math.max(...tempArray[1])

        heightPercentage = ((inputSelection - minValue) * 100) / (maxValue - minValue)
        if (isNaN(heightPercentage)) {
          heightPercentage = 100
        }
      } else {
        inputSelection = tempArray[1][i]
        heightPercentage = 100
      }

      return (
        <>
          {gridEntry(heightPercentage, tempArray[0][i], tempArray[1][i])}
        </>
      )
    }
  }

  const IconStatus = (avail: any) => {
    if (avail >= 95) {
      return <i className="iconStatus icon-check"></i>
    } else if (avail >= 75 && avail <= 95) {
      return <i className="iconStatus icon-warning"></i>
    } else if (avail < 75 && avail >= 0) {
      return <i className="iconStatus icon-danger"></i>
    }
  }
  const TableContents = () => {
    let rowItem = majorSiteNameArray.map((majorSite, index) => {
      console.log(`Table row${index} Major Site::${majorSite}`)
      // let targetObject = majorSiteObjectTarget[majorSiteNameArray[index]]
      let avail = availability(
        createParameterArray(selectedOption, 'status', majorSiteNameArray[index], siteObject)
      )
      let dt_statusOutput = createParameterArray(
        selectedOption,
        'dt_status',
        majorSiteNameArray[index],
        siteObject
      )
      let resptimeOutput = createParameterArray(
        selectedOption,
        'resptime',
        majorSiteNameArray[index],
        siteObject
      )
      let tdResp = createResponseTimeGrid(dt_statusOutput, resptimeOutput)

      return (
        <tr key={index}>
          <td className="iconWrapper">{IconStatus(avail)}</td>
          <td>{majorSiteNameArray[index]}</td>
          <td className="availablityCharm">{avail}%</td>
          <td className="minibar minibar--mini">
           {tdResp}
          </td>
        </tr>
      )
    })
    return <>{rowItem}</>
  }
  return (
    <div>
      <table id="techTable" className="table table-striped table-bordered table-dark">
        <thead className="var-dark">
          <tr>
            <th>Status</th>
            <th>Major Site</th>
            <th>Availability</th>
            <th>Response Metrics</th>
          </tr>
        </thead>
        <tbody className="location_tbody">{TableContents()}</tbody>
      </table>
    </div>
  )
}
