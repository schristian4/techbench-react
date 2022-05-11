import * as React from 'react'

import { fetchData } from './api/Api'
import { cityDataType } from './data/cityDataTypes'
import { nestGroupsBy } from './utils/groupFunctions'
import { AlertBanner } from './components/AlertBanner/AlertBannerComponent'
// import { IconLegend } from './components/IconLegendComponent'
import { DataTable } from './components/DataTable/DataTableComponent'
import { NavBar } from './components/NavBar/NavBarComponent'
import { LoadSpinner } from './components/LoadSpinner/LoadSpinnerComponent'

function App() {
  const [data, setData] = React.useState<cityDataType[]>([])
  const [isBusy, setBusy] = React.useState(true)
  const [selectedOption, setSelectedOption] = React.useState('')

  const initializeData: Function = React.useCallback(() => {
    fetchData()
      .then((data) => setData(data))
  }, [])

  const isLoading: Function = React.useCallback(() =>{
    data.length === 0 || data === undefined ? setBusy(true) : setBusy(false)
  }, [data])

  const setInitialOptionValue: Function = React.useCallback(()=> {
    const defaultOption = nestGroupsBy(data, ['obj_location', 'device_descrip'])
    setSelectedOption(Object.keys(defaultOption)[0])
  },[data])

  React.useEffect(() => {
    initializeData()
    isLoading()
    setInitialOptionValue()
  }, [initializeData, isLoading, setInitialOptionValue])

  return (
     <>
      {!isBusy ? (
        <div className="row">
          <div className="col w-100 bg-dark bg-gradient">
            
            <NavBar
              dataObject={data}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
            <AlertBanner dataObject={data} />
            <DataTable dataObject={data} selectedOption={selectedOption} />
          </div>
        </div>
      ) : (
        <LoadSpinner/>   
      )}
      {/* <IconLegend /> */}
    </>
  )
}
export default App
