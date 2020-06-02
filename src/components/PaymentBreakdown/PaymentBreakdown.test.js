import React from 'react';
import { fireEvent,render } from '@testing-library/react';
import PaymentBreakdown from './PaymentBreakdown';
import { createTable } from '../../utils/helper'

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
	}
}
const dateObj = {
	date: '20',
	month: '06',
	year: '2022'
};
describe('Payment breakdown', () => {
	it('renders date picker', () => {
		const { getByText } = render(<PaymentBreakdown 
		{...props}
		/>);
		const header = getByText('Schedule showing EMI payments starting from');
		expect(header).toBeInTheDocument();
		expect(header).toMatchSnapshot();
	});
	
	it('should create table on date change', () => {
		const { container } = render(<PaymentBreakdown 
			{...props}
		/>);
		fireEvent.change(container.querySelector('input[type=date]'), {
			target : { value : dateObj}
		});
		const mock = createTable(props, dateObj);
		expect(mock).toHaveProperty('parentArr');
	});
	
	it('should show sub table', () => {
		const { container } = render(<PaymentBreakdown 
			{...props}
		/>);
		fireEvent.click(container.querySelector('.expand-collapse'));
		const childClass = container.querySelector('tr:nth-child(2)').classList;
		expect(childClass).toContain('show');
	});
});
