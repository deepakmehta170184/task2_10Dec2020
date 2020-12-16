import { render, screen, act } from '@testing-library/react';
import HomeData from './HomeData';
import { shallow } from 'enzyme';
import FetchHomeData from './util/FetchHomeData';


describe('test cases for HomeData', () => {
	it('should render the HomeData component correctly', () => {
		shallow(<HomeData />);
	});

	it('must render a loading span before api call success', () => {
		let wrapper = shallow(<HomeData />);
		expect(wrapper.find('LoadingIndicator').exists()).toBeTruthy();
	});

	it('should fetches data from server and check if it have our expected result', () => {
		const onResponse = jest.fn();
		const onError = jest.fn();

		return FetchHomeData()
			.then(onResponse)
			.catch(onError)
			.finally(() => {
				expect(onResponse).toHaveBeenCalled();
				expect(onError).not.toHaveBeenCalled();

				expect(onResponse.mock.calls[0][0][0]).toEqual({
					address: {
						city: 'Gwenborough',
						geo: { lat: '-37.3159', lng: '81.1496' },
						street: 'Kulas Light',
						suite: 'Apt. 556',
						zipcode: '92998-3874',
					},
					company: {
						bs: 'harness real-time e-markets',
						catchPhrase: 'Multi-layered client-server neural-net',
						name: 'Romaguera-Crona',
					},
					email: 'Sincere@april.biz',
					id: 1,
					name: 'Leanne Graham',
					phone: '1-770-736-8031 x56442',
					username: 'Bret',
					website: 'hildegard.org',
				});
			});
	});
});
