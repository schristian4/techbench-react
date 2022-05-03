import * as React from 'react'

//Function and Data Imports
import { fetchCityData, cityDataType } from './cityDataTypes'
import { nestGroupsBy } from './groupFunctions'

//Component Imports
import { IncidentBanner } from './components/IncidentBannerComponent'
import { IconLegend } from './components/IconLegendComponent'
import { DataTable } from './components/DataTableComponent'
import { DropDownList } from './components/DropDownComponent'

//Style Imports
import './App.css'

function App() {
  const [data, setData] = React.useState<cityDataType[]>([])
  const [isBusy, setBusy] = React.useState(true)
  const [selectedOption, setSelectedOption] = React.useState('')

  const initializeData = () => {
    fetchCityData()
      .then((data) => setData(data))
      .then(() => {
        isLoading()
      })
  }
  function isLoading() {
    if (data.length === 0 || data === undefined || data === null) {
      setBusy(true)
    } else {
      setBusy(false);
      const defaultOption = nestGroupsBy(data, ['obj_location', 'device_descrip'])
      setSelectedOption(Object.keys(defaultOption)[0]);
    }
  }
  React.useEffect(() => {
    initializeData()
  }, [data])

  return (
    <div className='row'>
        {!isBusy ? 
        (<div className="col w-100 bg-dark bg-gradient">
          <nav className="navbar navbar-dark var-dark">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">AlertSite Technical Bench</a>
              <i className="check"></i>
            </div>
            <select
                title='City DropDown Menu'
                id='cityDropDown'
                className='form-select dropdown-toggle'
                defaultValue={selectedOption}
                onChange={(e) => {
                  let optionSelect = e.target.value
                  setSelectedOption(optionSelect)
                }}>
                <DropDownList dataObject={data} />
            </select>
          </nav>
          <IncidentBanner dataObject={data} />
          <DataTable dataObject={data} selectedOption={selectedOption}/>
        </div>) : (
          <div style={{ color: 'white' }}>Loading....</div>
        )}
        {/* <IconLegend /> */}
    </div>
  )
}
export default App;