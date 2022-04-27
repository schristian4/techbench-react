export const IconLegend = () => {
    return (
      <div className="icon-legend">
        <div className="iconContainer">
          <div className="iconWrapper">
            <i className="iconStatus icon-check"></i>
            <p>Good - Major Site Availablity is 100%</p>
          </div>
          <div className="iconWrapper">
            <i className="iconStatus icon-warning"></i>
            <p>${`Warning - Major Site Availablity below < 75%`}</p>
          </div>
          <div className="iconWrapper">
            <i className="iconStatus icon-danger"></i>
            <p>${`Error - Major Site Availablity below < 55%`}</p>
          </div>
        </div>
  
        <div>
          <p>If you wish to create a case with Customer Care, please visit</p>
          <a
            href={"https://support.smartbear.com/message/?prod=Alertsite"}
            target={"_blank"}
          ></a>
        </div>
      </div>
    );
  };
  