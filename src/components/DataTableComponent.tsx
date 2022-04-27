export const DataTable = () => {
    return (
      <div>
        <table
          id="techTable"
          className="table table-striped table-bordered table-dark"
        >
          <thead className="var-dark">
            <tr>
              <th>Status</th>
              <th>Major Site</th>
              <th>Availability</th>
              <th>Response Metrics</th>
            </tr>
          </thead>
        </table>
      </div>
    );
  };