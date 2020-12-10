import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { DataTable, LoadingIndicator } from 'lucid-ui';
import Pagination from './Pagination';

const HomeData = (props) => {
	const [gridData, setGridData] = useState([]);
	const [hasError, setHasError] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [overlayKind, setOverlayKind] = useState('dark');
	const [activeIndex, setActiveIndex] = useState(1);
	const [currentlySortedField, setCurrentlySortedField] = useState('id');
	const [
		currentlySortedFieldDirection,
		setCurrentlySortedFieldDirection,
	] = useState('down');

	const [currentPage, setCurrentPage] = useState(1);
	const [usersPerPage, setUsersPerPage] = useState(5);

	useEffect(async () => {
		const fetchData = await fetchHomeData();
		setGridData(fetchData);
	}, []);

	const fetchHomeData = async () => {
		try {
			setLoading(true);
			const response = await fetch(
				'https://jsonplaceholder.typicode.com/users'
			);
			const data = await response.json();
			setLoading(false);
			return data;
		} catch (err) {
			setHasError(true);
		}
	};

	const handleRowClick = (item, rowIndex) => {
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
								index === activeIndex ? { ...row, isActive: true } : row
							)}
							isActionable
							density='extended'
							onRowClick={handleRowClick}
							onSort={handleSort}
						>
							<DataTable.Column
								field='id'
								align='left'
								width={41}
								align='left'
								hasBorderLeft
								isSortable
							>
								ID
							</DataTable.Column>

							<DataTable.Column
								field='name'
								align='left'
								width={150}
								hasBorderLeft
								hasBorderRight
								isResizable
								isSortable
							>
								NAME
							</DataTable.Column>

							<DataTable.Column
								field='username'
								align='left'
								width={150}
								hasBorderLeft
								hasBorderRight
								isResizable
								isSortable
							>
								USERNAME
							</DataTable.Column>

							<DataTable.Column
								field='email'
								align='left'
								width={150}
								hasBorderLeft
								hasBorderRight
								isResizable
								isSortable
							>
								E-MAIL
							</DataTable.Column>

							<DataTable.Column
								field='phone'
								align='left'
								width={250}
								hasBorderLeft
								hasBorderRight
								isResizable
								isSortable
							>
								PHONE
							</DataTable.Column>

							<DataTable.Column
								field='website'
								align='right'
								width={100}
								hasBorderLeft
								hasBorderRight
								isResizable
								isSortable
							>
								WEBSITE
							</DataTable.Column>
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
