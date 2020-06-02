import React, { useState } from 'react';
import { RANGE_SLIDER, TENURE_YEAR, TENURE_MONTH } from '../../../utils/helper';
import SliderWithScale from '../../common/SliderWithScale/SliderWithScale';

const SliderComponent = (props) => {

    const [rangeSlider, updateRangeSlider] = useState(RANGE_SLIDER);

    const changeUnit = (unit) => {
        if(rangeSlider[2].selectedUnit !== unit && (unit === 'Yr' || unit === 'Mon')) {
            let newRangeSlider = [...rangeSlider];
            let newLoanTenure;
            
            newLoanTenure = (unit === 'Yr') ? props.loanInfo.loanTenure / 12 : props.loanInfo.loanTenure * 12;
            newRangeSlider[2] = (unit === 'Yr') ? TENURE_YEAR : TENURE_MONTH;

            updateRangeSlider(newRangeSlider);
            props.setData('loanTenure', newLoanTenure);
            props.updateDuration(unit);
        };
    };

    const updateData = (id, value) => {
        props.setData(id, value);
    }

    return (
        <div className="slider-component">
            {rangeSlider.map(item => {
                return (
                    <div key={item.id} className="container">
                        <div className="display">
                            <label> {item.label} </label>
                            <input type="text" value={props.loanInfo[item.id]} id={item.id} onChange={(event) => updateData(item.id, event.target.value)} />
                            <div className="symbol">
                                {
                                    item.units.map(unit => {
                                        return(
                                            <button key={unit} id={unit} className={props.duration === unit ? 'selectedUnit': ''} onClick={() => changeUnit(unit)}>
                                                {unit}
                                            </button>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <SliderWithScale
                            item={item}
                            data={props.loanInfo}
                            setData={props.setData}
                        />
                    </div>
                );
            })}
        </div>
    )
}

export default SliderComponent;
