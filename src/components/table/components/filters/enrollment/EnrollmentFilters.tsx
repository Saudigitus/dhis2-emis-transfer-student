import React from 'react'
import ContentFilter from './ContentFilter';
import { useHeader } from '../../../../../hooks/tableHeader/useHeader';
import style from './enrollment.module.css'

function EnrollmentFilters(): React.ReactElement {
    const { columns } = useHeader()
    
    return (
        <div className={style.enrollmentFilterContainer}>
            <ContentFilter headers={columns} />
        </div>
    )
}

export default EnrollmentFilters
