import React from 'react';

const SliderWithScale =  (props) => {
    const { item, data } = props;

    const updateData = (id, value) => {
        props.setData(id, value );
    }

    return (
        <div className="slider">
            <input
                type="range"
                min={item.min}
                max={item.max}
                step={item.step}
                value={data[item.id]}
                id={`${item.id}-slider`}
                onChange={(event) => updateData(item.id, event.target.value )} 
            />
            <div className="marker">
                {item.marks.map((marker, index) => {
                    return (
                        <div key={index-marker.value} style={{ left: `${(index * marker.spacing)}px` }}>
                            <span>
                                {marker.value}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SliderWithScale;
