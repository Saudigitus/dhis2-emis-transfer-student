import React from 'react'
import Select from 'react-select';
import defaultClasses from '../table.module.css';
import { TextPagination } from './components/TextPagination';
import { IconButtonPagination } from './components/IconButtonPagination';
import { PaginationProps } from '../../../../types/table/PaginationProps';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { disableNextPage } from '../../../../utils/table/pagination/pagination';
import { rowsPerPages } from '../../../../utils/constants/pagination/pagination';


function Pagination(props: PaginationProps): React.ReactElement {
    const { page, rowsPerPage, onPageChange, onRowsPerPageChange, loading, totalPerPage } = props;
    
    return (
        <div
            className={defaultClasses.pagination}
            style={{ display: 'flex', justifyContent: 'space-between' }}
        >
            <div />

            <div className={defaultClasses.rootPagination}>
                {TextPagination("Rows per page")}

                <Select
                    className={defaultClasses.textPagination}
                    value={rowsPerPage}
                    clearValueText={false}
                    style={{ maxWidth: 50, marginTop: -10, height: 10, marginRight: 10 }}
                    options={rowsPerPages}
                    clearable={false}
                    searchable={false}
                    onChange={onRowsPerPageChange}
                    menuContainerStyle={{ top: 'auto', bottom: '100%' }}
                />
                {TextPagination(`Page ${page}`)}

                <div style={{ marginRight: 10 }} />

                <IconButtonPagination
                    Icon={<KeyboardArrowLeft />}
                    ariaLabel='Previous Page'
                    disabled={page <= 1 || loading}
                    onPageChange={() => { onPageChange(page - 1); }}
                />

                <IconButtonPagination
                    Icon={<KeyboardArrowRight />}
                    ariaLabel='Next Page'
                    disabled={disableNextPage({ rowsPerPage, totalPerPage }) || loading}
                    onPageChange={() => { onPageChange(page + 1); }}
                />

            </div>
        </div>
    )
}

export default Pagination
