import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { DataTable, LoadingIndicator } from 'lucid-ui';
import Pagination from './Pagination';
import fetchHomeData from './util/FetchHomeData';

const HomeData = (props) => {
	const [gridData, setGridData] = useState([]);
	const [hasError, setHasError] = useState(false);
	const [isLoading, setLoading] = useState(true);
	const [overlayKind, setOverlayKind] = useState('dark');
	const [activeIndex, setActiveIndex] = useState(1);
	const [currentlySortedField, setCurrentlySortedField] = useState('id');
	const [
		currentlySortedFieldDirection,
		setCurrentlySortedFieldDirection,
	] = useState('down');

	const [currentPage, setCurrentPage] = useState(1);
	const [usersPerPage, setUsersPerPage] = useState(5);

	const [jsonColumn, setJsonColumn] = useState([
		{ col: 'id', width: '70' },
		{ col: 'name', width: '120' },
		{ col: 'username', width: '120' },
		{ col: 'email', width: '120' },
		{ col: 'phone', width: '140' },
		{ col: 'website', width: '120' },
	]);

	useEffect(async () => {
		const fetchData = await fetchHomeData();
		console.log('fetchData--', fetchData);
		if (fetchData) {
			setLoading(false);
			setGridData(fetchData);
		} else {
			setHasError('Error while getting response from the api');
		}
	}, [setGridData]);

	const handleRowClick = (rowIndex) => {
		setActiveIndex(rowIndex);
	};

	const handleSort = (field) => {
		const nextCurrentlySortedFieldDirection =
			currentlySortedField === field && currentlySortedFieldDirection === 'up'
				? 'down'
				: 'up';
		const nextData = _.sortBy(gridData, field);

		setCurrentlySortedField(field);
		setCurrentlySortedFieldDirection(nextCurrentlySortedFieldDirection);
		setGridData(
			nextCurrentlySortedFieldDirection === 'down'
				? nextData
				: _.reverse(nextData)
		);
		setActiveIndex(null);
	};

	const indexOfLastUser = currentPage * usersPerPage; //5
	const indexOfFirstUser = indexOfLastUser - usersPerPage; //0
	const currentGridData = gridData.slice(indexOfFirstUser, indexOfLastUser);

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber + 1);
	};

	return (
		<>
			{hasError ? (
				<div>Error occured.</div>
			) : (
				<>
					<div>
						<h2>Sample Data Grid</h2>
					</div>
					<div className='mainDiv'>
						<LoadingIndicator
							isLoading={isLoading}
							overlayKind={overlayKind}
						></LoadingIndicator>
						<DataTable
							data={_.map(currentGridData, (row, index) =>
								index === activeIndex
									? { ...row, isActive: true, key: index }
									: row
							)}
							isActionable
							density='extended'
							onRowClick={handleRowClick}
							onSort={handleSort}
						>
							{_.map(jsonColumn, (row, pos) => {
								return (
									<DataTable.Column
										field={`${row.col}`}
										align='left'
										width={`${row.width}`}
										align='left'
										hasBorderLeft
										isSortable
									>
										{_.upperCase(row.col)}
									</DataTable.Column>
								);
							})}
						</DataTable>
						<Pagination
							totalCount={gridData.length}
							usersPerPage={usersPerPage}
							paginate={paginate}
						/>
					</div>
				</>
			)}
		</>
	);
};

export default HomeData;
