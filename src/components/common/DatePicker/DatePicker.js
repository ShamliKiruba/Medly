import React from 'react';

const DatePicker = (props) => {

    const onChange = (value) => {
        props.onChange(value)
    };

    return (
        <div>
            <input 
                type="date" 
                value={props.value} 
                onChange = {(event) => {onChange(event.target.value)}} 
            />
        </div>
    )
}

export default DatePicker;
