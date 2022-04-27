export const IncidentBanner = () => {
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