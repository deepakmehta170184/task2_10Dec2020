import React from 'react';
import { Paginator } from 'lucid-ui';
import _ from 'lodash';

const Pagination = (props) => {
	console.log('totalCount----', props.totalCount);
	return (
		<div className='paginationMainDiv'>
			<Paginator
				totalCount={_.parseInt(props.totalCount)}
				onPageSelect={(number) => props.paginate(number)}
				totalPages={props.totalCount / props.usersPerPage}
			/>
		</div>
	);
};

export default Pagination;
