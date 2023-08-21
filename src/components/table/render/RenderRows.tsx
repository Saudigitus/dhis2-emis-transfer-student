import React from 'react'
import i18n from '@dhis2/d2-i18n';
import classNames from 'classnames';
import { makeStyles, type Theme, createStyles } from '@material-ui/core/styles';
import { RowCell, RowTable } from '../components';
import { type CustomAttributeProps } from '../../../types/table/AttributeColumns';
import { showValueBasedOnColumn } from '../../../utils/commons/tableRowsColumns';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DataStoreState } from '../../../schema/dataStoreSchema';
import { RowSelectionState } from '../../../schema/tableSelectedRowsSchema';
import { checkIsRowSelected } from '../../../utils/commons/arrayUtils';
import { ApprovalButtonClicked } from '../../../schema/approvalButtonClicked';
import { OuState } from '../../../schema/orgUnitsSchema';
interface RenderHeaderProps {
    rowsData: any[]
    headerData: CustomAttributeProps[]
    loading: boolean
    selectedTab: string
    handleOpenApproval: () => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        row: { width: "100%" },
        dataRow: {
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: '#F1FBFF'
            }
        },
        cell: {
            padding: `${theme.spacing(1) / 2}px ${theme.spacing(1) * 7}px ${theme.spacing(1) /
                2}px ${theme.spacing(1) * 3}px`,
            '&:last-child': {
                paddingRight: theme.spacing(1) * 3
            },
            borderBottomColor: "rgba(224, 224, 224, 1)"
        },
        bodyCell: {
            fontSize: theme.typography.pxToRem(13),
            color: theme.palette.text.primary
        }
    })
);

function RenderRows({ headerData, rowsData, loading, selectedTab, handleOpenApproval }: RenderHeaderProps): React.ReactElement {
    const classes = useStyles()
    const getDataStore = useRecoilValue(DataStoreState)
    const [selected, setSelected] = useRecoilState(RowSelectionState);
    const [, setClickedButton] = useRecoilState(ApprovalButtonClicked)
    const ousData = useRecoilValue(OuState)

    const onToggle = (rawRowData: object) => {
        handleOpenApproval();
        setSelected({ ...selected, selectedRows: checkIsRowSelected(rawRowData, selected), isAllRowsSelected: selected.rows.length === checkIsRowSelected(rawRowData, selected).length })
    }

    const openTeiInCaptureApp = (event: object) => {
        const { trackedEntity, enrollment, orgUnit, program } = event;
        window.open(`https://emis.dhis2.org/dev/dhis-web-capture/index.html#/enrollment?enrollmentId=${enrollment}&orgUnitId=${orgUnit}&programId=${program}&teiId=${trackedEntity}`, '_blank')
    }

    if (rowsData.length === 0 && !loading) {
        return (
            <RowTable
                className={classes.row}
            >
                <RowCell
                    className={classNames(classes.cell, classes.bodyCell)}
                    colspan={headerData?.filter(x => x.visible)?.length}
                >
                    {i18n.t('No data to display')}
                </RowCell>
            </RowTable>
        );
    }

    return (
        <React.Fragment>
            {
                rowsData.map((row, index) => {
                    const cells = headerData?.filter(x => x.visible)?.map(column => (
                        <RowCell
                            key={column.id}
                            className={classNames(classes.cell, classes.bodyCell)}
                        >
                            <div>
                                {showValueBasedOnColumn(column, row[column.id], getDataStore, ousData, onToggle, setClickedButton, selected, index, selectedTab)}
                            </div>
                        </RowCell>
                    ));
                    return (
                        <RowTable
                            key={index}
                            onClick={() => { openTeiInCaptureApp(selected?.rows[index]?.transferInstance); }}
                            className={classNames(classes.row, classes.dataRow)}
                        >
                            {cells}
                        </RowTable>
                    );
                })
            }
        </React.Fragment>
    )
}

export default RenderRows
