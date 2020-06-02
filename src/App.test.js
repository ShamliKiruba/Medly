import React from 'react';
import { fireEvent,render } from '@testing-library/react';
import App from './App';
import {calculateEMI } from '../src/utils/helper'

describe('App', () => {
	it('should render App', () => {
		const { getByText } = render(<App />);
		const header = getByText('EMI CALCULATOR');
		const sliderElement = getByText('Interest Rate');
		expect(header).toBeInTheDocument();
		expect(sliderElement).toMatchSnapshot();
	});
	
	it('should calculate emi based on loan details', () => {
		const loanInfo = {
			loanAmount: 5000000,
			interestRate: 10.5,
			loanTenure: 20
		};
		const duration = 'Yr';
		const result = calculateEMI(loanInfo, duration);
	
		expect(result).toBeInstanceOf(Object);
		expect(result).toEqual({
			"emi": 49919,
			"totalInterest": 6980559,
			"totalPayment": 11980559
		});
	});
	
	it('should calculate loan emi on loan amount change', () => {
		const { container } = render(<App />);
		fireEvent.change(container.querySelector('#loanAmount'), {
			target : { value : 100000 }
		});
		const elInput = container.querySelector('#label-0').innerHTML;
		expect(elInput).toContain('998');
	});
	
	it('should change duration scale on unit change', () => {
		const { container } = render(<App />);
		const month = container.querySelector('#Mon');
		fireEvent.click(month, {
			target : { value : 'Mon' }
		});
		const nodes = container.querySelectorAll('.marker');
		const last = nodes[nodes.length- 1];
		const className = month.classList[0];
		expect(last.innerHTML).toContain('360');
		expect(className).toEqual('selectedUnit');
	});
});
