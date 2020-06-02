import React from 'react';
import { fireEvent,render } from '@testing-library/react';
import EMICalculation from "./EMICalculation";

const setData = jest.fn();
const props = {
	annualInfo:{
		emi: 0,
		totalPayment: 0,
		totalInterest: 0,
	},
	duration:'Yr',
	loanInfo:{
		loanAmount: 5000000,
		interestRate: 10.5,
		loanTenure: 20
    },
    setData
};

describe('EMI Calculator', () => {
    it('should update total payment when changing interest rate', () => {
        const { container } = render(<EMICalculation {...props}/>);
        
        fireEvent.change(container.querySelector('#interestRate-slider'), {
            target : { value : 5 }
        });
        const totalPayment = container.querySelector('#label-2').innerHTML;
        expect(totalPayment).not.toEqual('₹ 1,19,80,559');
        expect(setData).toHaveBeenCalled();
    });
});