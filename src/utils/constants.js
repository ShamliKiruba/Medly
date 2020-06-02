export const LOAN_DETAILS = [
    {
        label: 'Loan EMI',
        key: 'emi',
    },
    {
        label: 'Total Interest Payable',
        key: 'totalInterest',
    },
    {
        label: 'Total Payment',
        key: 'totalPayment',
    }
];

export const MONTH_LIST = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const TABLE_TITLE = ['Year', 'Principal (A)', 'Interest (B)', 'Total Payment (A + B)', 'Balance', 'Loan Pain To Date'];

export const INIT_TABLEDATA = {
    thead: TABLE_TITLE,
    tbody: [{
        year: new Date().getFullYear(),
        month: '',
        principal: 1,
        interest: 1,
        total: 1,
        balance: 1,
        loanPaid: 1
    }],
};

export const INIT_DATE = {
    date: (new Date().getDate()) < 10 ? `0${(new Date().getDate())}`: `${new Date().getDate()}`,
    month: (new Date().getMonth() + 1) < 10 ? `0${(new Date().getMonth() + 1)}`: `${new Date().getMonth() + 1}`,
    year: `${new Date().getFullYear()}`,
};

export const INIT_LOAN_INFO = {
    loanAmount: 5000000,
    interestRate: 10.5,
    loanTenure: 20
};

export const INIT_ANNUAL_INFO = {
    emi: 0,
    totalPayment: 0,
    totalInterest: 0,
};