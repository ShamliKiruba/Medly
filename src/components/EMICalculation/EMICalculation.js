import React from 'react';
import { LOAN_DETAILS } from '../../utils/constants';
import SliderComponent from './SliderComponent/SliderComponent';
import { convertValue } from '../../utils/helper';

const EMICalculation = (props) => {
    const { loanInfo, duration, updateDuration, setData, annualInfo } = props;

    return (
        <div className="part-one">
            <SliderComponent 
                loanInfo={loanInfo}
                updateDuration={updateDuration}
                duration={duration}
                setData={setData}
            />
            <div className="summary">
                <div className="data">
                    { 
                        LOAN_DETAILS.map((element, index) => (
                            <div className="section" key={`label-${index}`}>
                                <p className="label">{element.label}</p>
                                <p className="value" id={`label-${index}`}>{`₹ ${convertValue(annualInfo[element.key])}`}</p>
                            </div>
                        ))
                    }
                </div>
                <div id="chart">

                </div>
            </div>
        </div>
    )
}

export default EMICalculation;
