import * as React from 'react'

//Function and Data Imports
import { fetchData } from './api/Api'
import { cityDataType } from './components/cityDataTypes'
import { nestGroupsBy } from './utils/groupFunctions'

//Component Imports
import { IncidentBanner } from './components/IncidentBannerComponent'
import { IconLegend } from './components/IconLegendComponent'
import { DataTable } from './components/DataTableComponent'
import { NavBar } from './components/NavBarComponent'

function App() {
  const [data, setData] = React.useState<cityDataType[]>([])
  const [isBusy, setBusy] = React.useState(true)
  const [selectedOption, setSelectedOption] = React.useState('')

  const initializeData = () => {
    fetchData()
      .then((data) => setData(data))
      .then(() => {
        isLoading()
        setInitialOptionValue()
      })
  }
  function isLoading() {
    if (data.length === 0 || data === undefined) {
 
      setBusy(true)
    } else {

      setBusy(false)
    }
  }
  function setInitialOptionValue() {
    const defaultOption = nestGroupsBy(data, ['obj_location', 'device_descrip'])
    setSelectedOption(Object.keys(defaultOption)[0])
  }
  React.useEffect(() => {
    initializeData()
  }, [data])

  return (
    <div className="row">
      {!isBusy ? (
        <div className="col w-100 bg-dark bg-gradient">
          
          <NavBar
            dataObject={data}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
          <IncidentBanner dataObject={data} />
          <DataTable dataObject={data} selectedOption={selectedOption} />
        </div>
      ) : (
        <div style={{ color: 'white' }}>Loading....</div>
      )}
      {/* <IconLegend /> */}
    </div>
  )
}
export default App
