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
        // console.log('Busy State: ' + isBusy)
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
// 
  // console.log('Selected Option:' + selectedOption)
  React.useEffect(() => {
    initializeData()
  }, [data])

  return (
    <div className="App">
      <div className="container bg-dark bg-gradient">
        <div>
          <nav className="navbar navbar-dark var-dark">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                AlertSite Technical Bench
              </a>
              <i className="check"></i>5
              {!isBusy ? (
                <select
                  defaultValue={selectedOption}
                  onChange={(e) => {
                    let optionSelect = e.target.value
                    setSelectedOption(optionSelect)
                  }}
                >
                  <DropDownList dataObject={data} />
                </select>
                
              ) : (
                <div style={{ color: 'white' }}>Loading....</div>
              )}
            </div>
          </nav>
          {!isBusy && <DataTable dataObject={data} selectedOption={selectedOption}/>}
          <div style={{ color: 'white' }}>{selectedOption}</div>
          
          {/* <button className="btn btn-primary">Click Me</button> */}
          {/* <IncidentBannerComponent />
             
            <IconLegend /> */}
        </div>
      </div>
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
