import { MONTH_LIST, TABLE_TITLE } from './constants';

export const range = (limit, step, spacing, unit) => {
    let marks = [];
    for(let i = 0; i <= limit; i = i+step) {
        let obj = {
            value: i,
            label: unit ? (i+unit) : i,
            spacing
        }
        marks.push(obj);
    }
    return marks;
};

export const LOAN_AMOUNT_MARKER = range(200, 25, 60, 'L');
export const INTEREST_RATE_MARKER = range(20, 2.5, 60);
export const TENURE_YEAR_MARKER = range(30, 5, 80);
export const TENURE_MONTH_MARKER = range(360, 60, 80);

export const TENURE_MONTH = {
    label: 'Loan Tenure',
    id:'loanTenure',
    defaultValue: 20,
    step: 6,
    min: 0,
    max: 360,
    marks: TENURE_MONTH_MARKER,
    selectedUnit: 'Mon',
    units: ['Yr', 'Mon']
};

export const TENURE_YEAR = {
    label: 'Loan Tenure',
    id:'loanTenure',
    defaultValue: 20,
    step: 0.5,
    min: 0,
    max: 30,
    selectedUnit: 'Yr',
    marks: TENURE_YEAR_MARKER,
    units: ['Yr', 'Mon']
};

export const RANGE_SLIDER = [
    {
        label: 'Home Loan Amount',
        id: 'loanAmount',
        defaultValue: 25,
        step: 50000,
        min: 0,
        max: 20000000,
        marks: LOAN_AMOUNT_MARKER,
        units: ['₹']
    },
    {
        label: 'Interest Rate',
        id:'interestRate',
        defaultValue: 10.5,
        step: 0.5,
        min: 0,
        max: 20,
        marks: INTEREST_RATE_MARKER,
        units: ['%']
    },
    TENURE_YEAR,
];

export const calculateEMI = (loanInfo, duration) => {
    let interest = ((loanInfo.interestRate /12) * 0.01);
    let timeDuration = duration === 'Yr' ? (loanInfo.loanTenure * 12) : (loanInfo.loanTenure)
    let a = Math.pow((1 + interest), timeDuration)
    let b = a - 1;
    let emi = loanInfo.loanAmount * (interest) * (a/b);
    let totalPayment =  emi * timeDuration;
    let totalInterest = (totalPayment - loanInfo.loanAmount);
    return {
        emi: Math.round(emi),
        totalPayment: Math.round(totalPayment),
        totalInterest: Math.round(totalInterest),
    }
};

export const createTable = (props, dateObj) => {
    let durationInMonths = props.duration === 'Yr' ? props.loanInfo.loanTenure * 12 : props.loanInfo.loanTenure;
    let sumA = 0, sumB = 0, sumC = 0, sumD = 0, sumE = 0, parent = {}, arr = [], parentArr = [], year = Number(dateObj.year);
    let emi = Number(props.annualInfo.emi);
    let month = Number(dateObj.month);
    let balanceAmount = props.loanInfo.loanAmount, sumOfPrincipal = 0;
    let initialAmount = props.loanInfo.loanAmount;
    let childAccumulator = [];
    for(let i=0; i<durationInMonths;i++) {
        let temp = {
            year: year,
            month: MONTH_LIST[month-1],
            total: emi,
            loanPaid:  0
        };
        let interestComponent = (props.loanInfo.interestRate * balanceAmount)/1200;
        let principalComponent = emi - interestComponent;
        temp.balance = balanceAmount - principalComponent; // final
        temp.interest = interestComponent;
        temp.principal = principalComponent;

        balanceAmount = temp.balance;
        sumOfPrincipal+= temp.principal;
        temp.loanPaid = ((sumOfPrincipal / initialAmount) * 100).toFixed(2);

        sumA+=temp.principal;
        sumB+=temp.interest;
        sumC+=temp.total;
        
        childAccumulator.push({
            month: temp.month,
            principal: `₹ ${convertValue(Math.round(temp.principal))}`,
            interest: `₹ ${convertValue(Math.round(temp.interest))}`,
            total: `₹ ${convertValue(emi)}`,
            balance: `₹ ${convertValue(Math.round(temp.balance))}`,
            loanPaid: `${temp.loanPaid} %`,
            year: temp.year,
        });
        if(MONTH_LIST[month-1] === 'Dec'  || (i === durationInMonths - 1)) {
            sumD=balanceAmount;
            sumE+=Number(temp.loanPaid);
            parent = {
                year, 
                sumA: `₹ ${convertValue(Math.round(sumA))}`, 
                sumB: `₹ ${convertValue(Math.round(sumB))}`, 
                sumD: (i === durationInMonths - 1) ? 0 : `₹ ${convertValue(Math.round(sumD))}`, 
                sumC: `₹ ${convertValue(sumC)}`,
                sumE: `${sumE} %`
            };
            arr.push(parent, ...childAccumulator);
            parentArr.push({
                year, 
                sumA: Math.round(sumA), 
                sumB: Math.round(sumB), 
                sumD: (i === durationInMonths - 1) ? 0 : Math.round(sumD), 
                sumC, 
                sumE
            });
            year++;
            sumA = 0; sumB = 0; sumC = 0; sumE = 0;
            month = 1;
            childAccumulator = [];
        } else {
            month++;
        }
    }
    return { tableData: {
        thead: TABLE_TITLE,
        tbody: arr
    }, parentArr };
};

export const convertValue = (value = 0) => {
    return value.toLocaleString('en-IN');
}