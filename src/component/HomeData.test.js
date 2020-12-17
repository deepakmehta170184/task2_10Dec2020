import { render, screen, act } from '@testing-library/react';
import HomeData from './HomeData';
import { shallow } from 'enzyme';
import FetchHomeData from './util/FetchHomeData';
import _ from 'lodash';

describe('test cases for HomeData', () => {
	beforeEach(() => {
		fetch.resetMocks();
	});

	it('should render the HomeData component correctly', () => {
		shallow(<HomeData />);
	});

	it('must render a loading span before api call success', () => {
		let wrapper = shallow(<HomeData />);
		expect(wrapper.find('LoadingIndicator').exists()).toBeTruthy();
	});

	it('should fetches data from server and check if it have our expected result', async () => {
		fetch.mockResponseOnce(
			JSON.stringify({
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
			})
		);

		const homeDataRes = await FetchHomeData();

		expect(homeDataRes).toEqual({
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
		expect(fetch).toHaveBeenCalledTimes(1);
	});

	it('returns null when exception', async () => {
		fetch.mockReject(() => Promise.reject('API is down'));

		const homeDataResposne = await FetchHomeData();

		expect(homeDataResposne).toEqual(null);
		expect(fetch).toHaveBeenCalledWith(
			'https://jsonplaceholder.typicode.com/users'
		);
	});

	it('should check if sorting works properly', () => {
		const expectedArray = [{
			"id": 1,
			"name": "Leanne Graham",
			"username": "Bret",
			"email": "Sincere@april.biz",
			"address": {
			  "street": "Kulas Light",
			  "suite": "Apt. 556",
			  "city": "Gwenborough",
			  "zipcode": "92998-3874",
			  "geo": {
				"lat": "-37.3159",
				"lng": "81.1496"
			  }
			},
			"phone": "1-770-736-8031 x56442",
			"website": "hildegard.org",
			"company": {
			  "name": "Romaguera-Crona",
			  "catchPhrase": "Multi-layered client-server neural-net",
			  "bs": "harness real-time e-markets"
			}
		  },
		  {
			"id": 2,
			"name": "Ervin Howell",
			"username": "Antonette",
			"email": "Shanna@melissa.tv",
			"address": {
			  "street": "Victor Plains",
			  "suite": "Suite 879",
			  "city": "Wisokyburgh",
			  "zipcode": "90566-7771",
			  "geo": {
				"lat": "-43.9509",
				"lng": "-34.4618"
			  }
			},
			"phone": "010-692-6593 x09125",
			"website": "anastasia.net",
			"company": {
			  "name": "Deckow-Crist",
			  "catchPhrase": "Proactive didactic contingency",
			  "bs": "synergize scalable supply-chains"
			}
		  },
		  {
			"id": 3,
			"name": "Clementine Bauch",
			"username": "Samantha",
			"email": "Nathan@yesenia.net",
			"address": {
			  "street": "Douglas Extension",
			  "suite": "Suite 847",
			  "city": "McKenziehaven",
			  "zipcode": "59590-4157",
			  "geo": {
				"lat": "-68.6102",
				"lng": "-47.0653"
			  }
			},
			"phone": "1-463-123-4447",
			"website": "ramiro.info",
			"company": {
			  "name": "Romaguera-Jacobson",
			  "catchPhrase": "Face to face bifurcated interface",
			  "bs": "e-enable strategic applications"
			}
		  }];
		const originalArray = [
		  {
			"id": 3,
			"name": "Clementine Bauch",
			"username": "Samantha",
			"email": "Nathan@yesenia.net",
			"address": {
			  "street": "Douglas Extension",
			  "suite": "Suite 847",
			  "city": "McKenziehaven",
			  "zipcode": "59590-4157",
			  "geo": {
				"lat": "-68.6102",
				"lng": "-47.0653"
			  }
			},
			"phone": "1-463-123-4447",
			"website": "ramiro.info",
			"company": {
			  "name": "Romaguera-Jacobson",
			  "catchPhrase": "Face to face bifurcated interface",
			  "bs": "e-enable strategic applications"
			}
		  },
		  {
			"id": 2,
			"name": "Ervin Howell",
			"username": "Antonette",
			"email": "Shanna@melissa.tv",
			"address": {
			  "street": "Victor Plains",
			  "suite": "Suite 879",
			  "city": "Wisokyburgh",
			  "zipcode": "90566-7771",
			  "geo": {
				"lat": "-43.9509",
				"lng": "-34.4618"
			  }
			},
			"phone": "010-692-6593 x09125",
			"website": "anastasia.net",
			"company": {
			  "name": "Deckow-Crist",
			  "catchPhrase": "Proactive didactic contingency",
			  "bs": "synergize scalable supply-chains"
			}
		  },{
			"id": 1,
			"name": "Leanne Graham",
			"username": "Bret",
			"email": "Sincere@april.biz",
			"address": {
			  "street": "Kulas Light",
			  "suite": "Apt. 556",
			  "city": "Gwenborough",
			  "zipcode": "92998-3874",
			  "geo": {
				"lat": "-37.3159",
				"lng": "81.1496"
			  }
			},
			"phone": "1-770-736-8031 x56442",
			"website": "hildegard.org",
			"company": {
			  "name": "Romaguera-Crona",
			  "catchPhrase": "Multi-layered client-server neural-net",
			  "bs": "harness real-time e-markets"
			}
		  }];
		
		
		   const sortResult =  _.sortBy(originalArray,'id');
		   expect(sortResult).toEqual(expectedArray);
		
		});
});


