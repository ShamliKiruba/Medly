import React, { useState, useEffect, useCallback } from 'react';
import { calculateEMI } from './utils/helper';
import { INIT_LOAN_INFO, INIT_ANNUAL_INFO } from './utils/constants';
import { updatePieChart } from './components/common/Chart';
import EMICalculation from './components/EMICalculation/EMICalculation';
import PaymentBreakdown from './components/PaymentBreakdown/PaymentBreakdown';

const App = () => {
    const [loanInfo, updateLoanInfo] = useState(INIT_LOAN_INFO);
    const [annualInfo, setAnnualInfo] = useState(INIT_ANNUAL_INFO);
    const [duration, updateDuration] = useState('Yr');

    const updateEMI = useCallback(() => {
        let updatedEMI = calculateEMI(loanInfo, duration);
        setAnnualInfo(updatedEMI);
		updatePieChart(updatedEMI.totalInterest, loanInfo.loanAmount);
	}, [duration, loanInfo]);

    useEffect(() => {
        updateEMI();
    }, [loanInfo, updateEMI]);

    const setData = (id, value) => {
        updateLoanInfo(prevState => ({
            ...prevState,
            [id]: value,
        }));
        updateEMI();
    };

    return (
        <div className="body">
            <h2>EMI CALCULATOR</h2>
            <EMICalculation
                duration={duration}
                loanInfo={loanInfo}
                annualInfo={annualInfo}
                setData={setData}
                updateDuration={updateDuration}
            />
            <PaymentBreakdown
                duration={duration}
                loanInfo={loanInfo}
                annualInfo={annualInfo}
            />
        </div>
    )
};

export default App;
