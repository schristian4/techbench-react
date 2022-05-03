import { cityDataType } from '../cityDataTypes'
import { nestGroupsBy } from '../groupFunction'


export const IncidentBanner = ({ dataObject }: { dataObject: cityDataType[] }) => {
  const siteObject = nestGroupsBy(dataObject, ['obj_location', 'device_descrip'])

  const createAlertItem = (locationName: string, count: number) => {
    return (
      <div className='alertItem'>
        <h1 className=''>{locationName}</h1>
        <div className='count-text'>
          <p>{count}</p>
          <p>Error Count:</p>
        </div>
      </div>
    )
    // module.appendAllElements([pHeading, pCount], counterDiv);
    // module.appendAllElements([heading, counterDiv], parentDiv);
    // return parentDiv;

  }
  // function removeAllChildNodes(parent) {
  //   while (parent.firstChild) {
  //     parent.removeChild(parent.firstChild);
  //   }
  // }
  let LocationKeyArray = Object.keys(siteObject);

  let siteKeyList = Object.keys(siteObject[LocationKeyArray[0]]);
  // let incidentBannerContainer = document.getElementById("IncidentBanner");
  debugger
  // removeAllChildNodes(incidentBannerContainer);

  for (let i = 0; i < LocationKeyArray.length; i++) {
   let locationName = siteObject[LocationKeyArray[i]][siteKeyList[0]][0].location_descrip;
    let siteKeyArray = Object.keys(siteObject[LocationKeyArray[i]]);
    let location = LocationKeyArray[i];
    let locationErrorCount = 0;
    for (let i = 0; i < siteKeyArray.length; i++) {
  //     let targetMajorSite = siteKeyArray[i];
  //     locationErrorCount =
  //       locationErrorCount +
  //       this.counter(
  //         table.createParameterArray(location, "status", targetMajorSite)
  //       );
    }
  //   //console.log(`${location} Error Count: ` + locationErrorCount);
  //   if (locationErrorCount > 0) {
  //     console.log("Begin appendContent");
  //     incidentBannerContainer.appendChild(
  //       this.createAlertItem(locationName, locationErrorCount)
  //     );
  //   }
  }

  return (
      <div className="container bg-dark border-light">
        <p className="bg-gradient" style={{ color: "white", fontWeight: "bold" }}>
          Incident History Log
        </p>
        <div id="IncidentBanner" className="incidentLog-container">
          <div className="alertItem" style={{ background: "#42b983" }}>
            No Past Incidents
          </div>
        </div>
      </div>
    );
  };