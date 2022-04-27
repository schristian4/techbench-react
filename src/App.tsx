import * as React from 'react';
//Function and Data Imports
import { fetchCityData, cityDataType } from "./cityDataTypes";
import { groupBy, nestGroupsBy } from './groupFunction';

//Component Imports
import { IncidentBanner } from './components/IncidentBannerComponent';
import { IconLegend } from './components/IconLegendComponent';
import { DataTable } from './components/DataTableComponent';
import { DropDownList } from './components/DropDownComponent';

//Style Imports
import './App.css';

function App() {
  const [data, setData] = React.useState<cityDataType[]>([]);

  const handleSubmit = async () => {
    fetchCityData().then((data) => setData(data));
  };
  
  handleSubmit();
  return (
    <div className="App">
      <div className="container bg-dark bg-gradient">
        <nav className="navbar navbar-dark var-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              AlertSite Technical Bench
            </a>
            <i className="check"> </i>
          </div>
          <DropDownList {...data} />
        </nav>
        {/* <IncidentBannerComponent />
        <DataTableComponent />
        <IconLegend /> */}
      </div>
    </div>
  );
}

export default App;
