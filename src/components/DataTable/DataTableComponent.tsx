import { cityDataType } from '../../data/cityDataTypes'
import { nestGroupsBy } from '../../utils/groupFunctions'
import { getPercentage } from '../../utils/getPercentage'
import { createParameterArray } from '../../utils/createParameterArray'

interface siteObjectProp {
  [key: string | number]: siteObjectProp
}

export const DataTable = ({
  dataObject,
  selectedOption,
}: {
  dataObject: cityDataType[]
  selectedOption: string
}) => {
  const siteObject: siteObjectProp = nestGroupsBy(dataObject, ['obj_location', 'device_descrip'])
  const majorSiteObjectTarget: siteObjectProp = siteObject[Number(selectedOption)]
  const majorSiteNameArray: string[] = Object.keys(majorSiteObjectTarget)

  const gridEntry = (
    percentage: string | number,
    inputDate: string,
    inputTime: string,
    index: number
  ) => {
    let minibar__bar = 'minibar__bar'
    let minibar__fill = 'minibar__fill'
    if (Number(inputTime) === 0) {
      minibar__bar = 'minibar__bar red'
      minibar__fill = 'minibar__fill red'
    }
    percentage = percentage + '%'
    return (
      <div key={index} className={minibar__bar}>
        <span className="minibar__tooltip">
          <div>Date: {inputDate}</div>
          <div>Response Time: {Number(inputTime).toFixed(3)}</div>
        </span>
        <div className={minibar__fill} style={{ height: percentage }}></div>
      </div>
    )
  }

  const createResponseTimeGrid = (
    timestampArray: object[],
    responseTimeArray: string | string[]
  ): {} => {
    let tempArray: any[] = []
    tempArray.push(timestampArray, responseTimeArray)
    let inputSelection, heightPercentage
    return tempArray[0].map((item: any, index: number) => {
      if (tempArray[1].length > 1) {
        inputSelection = tempArray[1][index]
        let minValue = Math.min(...tempArray[1])
        let maxValue = Math.max(...tempArray[1])

        heightPercentage = ((inputSelection - minValue) * 100) / (maxValue - minValue)
        if (isNaN(heightPercentage)) {
          heightPercentage = 100
        }
      } else {
        inputSelection = tempArray[1][index]
        heightPercentage = 100
      }

      return gridEntry(heightPercentage, tempArray[0][index], tempArray[1][index], index)
    })
  }

  const IconStatus = (avail: number) => {
    if (avail >= 95) {
      return <i className="iconStatus icon-check"></i>
    } else if (avail >= 75 && avail <= 95) {
      return <i className="iconStatus icon-warning"></i>
    } else if (avail < 75 && avail >= 0) {
      return <i className="iconStatus icon-danger"></i>
    }
  }

  const TableContents = () => {
    let rowItem = majorSiteNameArray.map((_, index) => {
      // console.log(`Table row${index} Major Site::${majorSite}`)
      let avail = getPercentage(
        createParameterArray(
          Number(selectedOption),
          'status',
          majorSiteNameArray[index],
          siteObject
        )
      )
      let dt_statusOutput = createParameterArray(
        Number(selectedOption),
        'dt_status',
        majorSiteNameArray[index],
        siteObject
      )
      let resptimeOutput: any = createParameterArray(
        Number(selectedOption),
        'resptime',
        majorSiteNameArray[index],
        siteObject
      )

      let tdResp: any = createResponseTimeGrid(dt_statusOutput, resptimeOutput)
      return (
        <tr key={index}>
          <td className="iconWrapper">{IconStatus(avail)}</td>
          <td>{majorSiteNameArray[index]}</td>
          <td className="availablityCharm">{avail}%</td>
          <td className="minibar minibar--mini">{tdResp}</td>
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
