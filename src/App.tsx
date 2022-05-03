import * as React from 'react'

//Function and Data Imports
import { fetchCityData, cityDataType } from './cityDataTypes'
import { groupBy, nestGroupsBy } from './groupFunction'

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
    <div className="App">
        {!isBusy ? 
        (<div className="container bg-dark bg-gradient">
          <nav className="navbar navbar-dark var-dark">
            <a className="navbar-brand" href="#">AlertSite Technical Bench</a>
            <i className="check"></i>
            <select
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
    </div>
  )
}
export default App
/*
---

    let siteObject = nestGroupsBy(cityObject, [
      "obj_location",
      "device_descrip"
    ]);

    module.siteObject = siteObject;

    table.initialize();
    table.outputTest();
    incidentbanner.initialize();
    const select = document.querySelector("#cityDropDown");
 
    select.addEventListener("input", (event) => {
      table.dropDownSelection = event.target.selectedIndex;
      incidentbanner.dropDownSelection = event.target.selectedIndex;
      //console.log("🚀 ~ Select index Value: " + event.target.selectedIndex);

      table.initialize(event.target.selectedIndex);
      table.createGridHoverElements();
      incidentbanner.initialize(event.target.selectedIndex);
    });
    table.createGridHoverElements();
  };
  printItems(); */
