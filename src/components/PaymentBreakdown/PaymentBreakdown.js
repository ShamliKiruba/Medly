import React, { useState, useEffect, useCallback } from 'react';
import { createTable } from '../../utils/helper';
import { updateBarChart } from '../common/Chart';
import { INIT_TABLEDATA, INIT_DATE } from '../../utils/constants';
import DatePicker from '../common/DatePicker/DatePicker';
import Accordion from '../common/Accordion/Accordion';

const PaymentBreakdown = (props) => {
    const [tableData, setTableData] = useState(INIT_TABLEDATA);
    const [selectedYear, updateSelectedYear] = useState([]);
    const [dateObj, setPeriod] = useState(INIT_DATE);
    
    const createTableData = useCallback(() => {
        const { tableData, parentArr } = createTable(props, dateObj);
        setTableData(tableData);
        updateBarChart(parentArr);
    },[props, dateObj]);


    useEffect(() => {
        createTableData();
    }, [createTableData, props.annualInfo.emi]);


    const showSubTable = (obj) => {
        let year = obj.year;
        let yearList = [...selectedYear];
        if (!yearList.includes(year)) {
            //expand
            yearList.push(year);
        } else {
            //collapse
            yearList.splice(yearList.indexOf(year), 1);
        }
            
        updateSelectedYear(yearList);
    };

    
    const updatePeriod = (value) => {
        let obj = value.split('-');
        let temp = dateObj;
        temp.year = obj[0];
        temp.month = obj[1];
        temp.date = obj[2];
        setPeriod(prevState => ({
            ...prevState,
            temp,
        }));
        createTableData();
    };

    return (
        <div className="part-two">
            <div className="date" id="date">
                <p>Schedule showing EMI payments starting from</p>
                <DatePicker 
                    value={`${dateObj.year}-${dateObj.month}-${dateObj.date}`}
                    onChange = {(value) => {updatePeriod(value)}}
                />
            </div>
            <div id="container">

            </div>
            <div className="table-data">
                <Accordion 
                    tableData={tableData}
                    parentKey='sumA'
                    commonKey='year'
                    selectedRow={selectedYear}
                    showSubTable={showSubTable}
                />
            </div>
        </div>
    )
}

export default PaymentBreakdown;
