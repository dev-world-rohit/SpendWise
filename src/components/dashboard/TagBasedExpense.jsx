import React, { useState, useEffect } from "react";
import axios from "axios";
import TagCard from "./TagCard";
import { IoHomeSharp } from "react-icons/io5";
import { MdOutlineEmojiTransportation } from "react-icons/md";
import { MdFoodBank } from "react-icons/md";
import { MdHealthAndSafety } from "react-icons/md";
import { MdPersonalInjury } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { PiTelevisionFill } from "react-icons/pi";
import { GiPayMoney } from "react-icons/gi";
import { MdMiscellaneousServices } from "react-icons/md";
import useAuthentication from "../../hooks/useAuthentication";

function setStatus(status) {
    if (status === "increase" || status === "no change") {
        return "GrDescend";
    }
    else {
        return "GrAscend";
    }
}

function TagBasedExpense() {
    const { token, url } = useAuthentication();
    const [housing, setHousing] = useState(0);
    const [housingComparison, setHousingComparison] = useState(null);

    const [transportation, setTransportation] = useState(0);
    const [transportationComparison, setTransportationComparison] =
        useState(null);

    const [food, setFood] = useState(0);
    const [foodComparison, setFoodComparison] = useState(null);

    const [healthCare, setHealthCare] = useState(0);
    const [healthCareComparison, setHealthCareComparison] = useState(null);

    const [personalCare, setPersonalCare] = useState(0);
    const [personalCareComparison, setPersonalCareComparison] = useState(null);

    const [debt, setDebt] = useState(0);
    const [debtComparison, setDebtComparison] = useState(null);

    const [entertainment, setEntertainment] = useState(0);
    const [entertainmentComparison, setEntertainmentComparison] =
        useState(null);

    const [lend, setLend] = useState(0);
    const [lendComparison, setLendComparison] = useState(null);

    const [miscellaneous, setMiscellaneous] = useState(0);
    const [miscellaneousComparison, setMiscellaneousComparison] =
        useState(null);

    useEffect(() => {
        async function handleName() {
            try {
                const response = await axios({
                    url: url + "/tag_based_expenses",
                    method: "GET",
                    headers: {
                        authorization: "Bearer " + token,
                    },
                });
                const monthly_expenses = response.data.current_month_expenses;
                const comparison = response.data.comparison;
                setHousing(monthly_expenses.Housing);
                setTransportation(monthly_expenses.Transportation);
                setFood(monthly_expenses.Food);
                setHealthCare(monthly_expenses["Health Care"]);
                setPersonalCare(monthly_expenses["Personal Care"]);
                setDebt(monthly_expenses.Debt);
                setLend(monthly_expenses.Lend);
                setEntertainment(monthly_expenses.Entertainment);
                setMiscellaneous(monthly_expenses.Miscellaneous);
                
                setHousingComparison(setStatus(comparison.Housing));
                setTransportationComparison(
                    setStatus(comparison.Transportation)
                );
                setFoodComparison(setStatus(comparison.Food));
                setHealthCareComparison(setStatus(comparison["Health Care"]));
                setPersonalCareComparison(setStatus(comparison["Personal Care"]));
                setDebtComparison(setStatus(comparison.Debt));
                setLendComparison(setStatus(comparison.Lend));
                setEntertainmentComparison(setStatus(comparison.Entertainment));
                setMiscellaneousComparison(setStatus(comparison.Miscellaneous));
            } catch (err) {
                console.error("Error fetching name:", err);
            }
        }

        handleName();
    }, [token]);

    return (
        <div className="tag-based-expensne dashboard-second-container dashboard-border-radius">
            <TagCard
                tag={"Housing"}
                tagAmount={housing}
                tagStatus={housingComparison}
                icon={IoHomeSharp}
                className="tag-based-expense-sub-div"
            />
            <TagCard
                tag={"Transportation"}
                tagAmount={transportation}
                tagStatus={transportationComparison}
                icon={MdOutlineEmojiTransportation}
                className="tag-based-expense-sub-div"
            />
            <TagCard
                tag={"Food"}
                tagAmount={food}
                tagStatus={foodComparison}
                icon={MdFoodBank}
                className="tag-based-expense-sub-div"
            />
            <TagCard
                tag={"Health Care"}
                tagAmount={healthCare}
                tagStatus={healthCareComparison}
                icon={MdHealthAndSafety}
                className="tag-based-expense-sub-div"
            />
            <TagCard
                tag={"Personal Care"}
                tagAmount={personalCare}
                tagStatus={personalCareComparison}
                icon={MdPersonalInjury}
                className="tag-based-expense-sub-div"
            />
            <TagCard
                tag={"Debt"}
                tagAmount={debt}
                tagStatus={debtComparison}
                icon={GiReceiveMoney}
                className="tag-based-expense-sub-div"
            />
            <TagCard
                tag={"Entertainment"}
                tagAmount={entertainment}
                tagStatus={entertainmentComparison}
                icon={PiTelevisionFill}
                className="tag-based-expense-sub-div"
            />
            <TagCard
                tag={"Lend"}
                tagAmount={lend}
                tagStatus={lendComparison}
                icon={GiPayMoney}
                className="tag-based-expense-sub-div"
            />
            <TagCard
                tag={"Miscellaneous"}
                tagAmount={miscellaneous}
                tagStatus={miscellaneousComparison}
                icon={MdMiscellaneousServices}
                className="tag-based-expense-sub-div"
            />
        </div>
    );
}

export default TagBasedExpense;
