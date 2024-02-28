import React from 'react'
import Select from 'react-select';
import defaultClasses from '../table.module.css';
import { TextPagination } from './components/TextPagination';
import { IconButtonPagination } from './components/IconButtonPagination';
import { PaginationProps } from '../../../../types/table/PaginationTypes';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { disableNextPage } from '../../../../utils/table/pagination/pagination';
import { rowsPerPages } from '../../../../utils/constants/pagination/pagination';


function Pagination(props: PaginationProps): React.ReactElement {
    const { page, rowsPerPage, onPageChange, onRowsPerPageChange, loading, totalPerPage } = props;
    
    return (
        <div
            className={defaultClasses.pagination}
        >
            <div />

            <div className={defaultClasses.rootPagination}>
                <TextPagination text="Rows per page"/>

                <Select
                    value={rowsPerPage}
                    clearValueText={false}
                    options={rowsPerPages}
                    clearable={false}
                    searchable={false}
                    onChange={onRowsPerPageChange}
                    className={defaultClasses.textPagination}
                    menuContainerStyle={{ top: 'auto', bottom: '100%' }}
                />
                <TextPagination text={`Page ${page}`}/>

                <IconButtonPagination
                    icon={<KeyboardArrowLeft />}
                    ariaLabel='Previous Page'
                    disabled={page <= 1 || loading}
                    onPageChange={() => { onPageChange(page - 1); }}
                />

                <IconButtonPagination
                    icon={<KeyboardArrowRight />}
                    ariaLabel='Next Page'
                    disabled={disableNextPage({ rowsPerPage, totalPerPage }) || loading}
                    onPageChange={() => { onPageChange(page + 1); }}
                />

            </div>
        </div>
    )
}

export default Pagination
