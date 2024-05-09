import React, { useState, useEffect } from "react";
import useAuthentication from "../../hooks/useAuthentication";
import axios from "axios";

function TotalOverview({monthly, yearly}) {
    const { token, url } = useAuthentication();

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

export default TotalOverview;
