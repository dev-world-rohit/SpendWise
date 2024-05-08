import React, {useState, useEffect} from 'react';
import useAuthentication from '../../hooks/useAuthentication';
import axios from 'axios';

function TotalOverview() {
  const { token } = useAuthentication();
  const [monthly, setMonthly] = useState(0);
  const [yearly, setYearly] = useState(0);

  useEffect(() => {
      async function handleName() {
          try {
              const response = await axios({
                  url: "http://127.0.0.1:5000/total_expense",
                  method: "GET",
                  headers: {
                      authorization: "Bearer " + token,
                  },
              });
              setMonthly(response.data.monthly);
              setYearly(response.data.yearly);
          } catch (err) {
              console.error("Error fetching name:", err);
          }
      }

      handleName();
  }, [token]);

  return (
      <div className="dashboard-overview dashboard-first-container dashboard-border-radius">
          <div className="dashboard-spend">
              <h1>{monthly}</h1>
              <p>Monthly Spend</p>
          </div>
          <div className="dashboard-spend">
              <h1>{yearly}</h1>
              <p>Yearly Spend</p>
          </div>
      </div>
  );
}

export default TotalOverview