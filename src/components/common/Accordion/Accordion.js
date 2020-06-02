import React from 'react';

const Accordion = (props) => {
    const { tableData, parentKey } = props;

    const showSubTable = (obj) => {
        props.showSubTable(obj)
    }

    return (
        <div>
            <table border="1">
                <thead>
                    <tr>
                        {tableData.thead.map((th, index) => {
                            return (
                                <th key={`th-${index}`}>{th}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {tableData.tbody.map((item, index) => (
                        <>
                            {item[parentKey] ? (
                                <tr 
                                    key={`tr-${index}-parent`}
                                    className={`expand-collapse ${(props.selectedRow.includes(item[props.commonKey])) ? 'selectedRow' : ''}`}
                                    onClick = {() => {showSubTable(item)}}
                                >
                                    {Object.keys(item).map((key, i) => {
                                        return (
                                            <td key={`td-${index}${i}-parent`}>{item[key]}</td>
                                        )
                                    })}
                                </tr>
                            ) : (
                                <tr 
                                    key={`tr-${index}-child`} 
                                    className={(props.selectedRow.includes(item[props.commonKey])) ? 'show': 'hide'}
                                >
                                    {Object.keys(item).map((key, i) => {
                                        return (
                                            (key !== props.commonKey) ? (
                                                <td key={`td-${index}${i}-child`}>{item[key]}</td>
                                            )  : <></>
                                        )
                                    })}
                                </tr>
                            )}
                        </>
                        )
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Accordion;
