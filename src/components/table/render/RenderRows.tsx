import React from 'react'
import i18n from '@dhis2/d2-i18n';
import classNames from 'classnames';
import { ButtonStrip, IconThumbUp24, IconThumbDown24 } from "@dhis2/ui"
import { makeStyles, type Theme, createStyles } from '@material-ui/core/styles';
import { RowCell, RowTable } from '../components';
import { type CustomAttributeProps } from '../../../types/table/AttributeColumns';
import { removeColumById, showValueBasedOnColumn } from '../../../utils/commons/tableRowsColumns';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DataStoreState } from '../../../schema/dataStoreSchema';
import styles from "./table-render.module.css"
import { IconButton } from '@material-ui/core';
import { RowSelectionState } from '../../../schema/tableSelectedRowsSchema';
import { checkIsRowSelected } from '../../../utils/commons/arrayUtils';
import { ApprovalButtonClicked } from '../../../schema/approvalButtonClicked';
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
    const [clickedButton, setClickedButton] = useRecoilState(ApprovalButtonClicked)

    console.log("clickedButton: ", clickedButton)
    const onToggle = (rawRowData: object) => {
        handleOpenApproval();
        setSelected({ ...selected, selectedRows: checkIsRowSelected(rawRowData, selected), isAllRowsSelected: selected.rows.length === checkIsRowSelected(rawRowData, selected).length })
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
                    const cells = removeColumById(headerData, getDataStore, selectedTab)?.filter(x => x.visible)?.map(column => (
                        <RowCell
                            key={column.id}
                            className={classNames(classes.cell, classes.bodyCell)}
                        >
                            <div>
                                {showValueBasedOnColumn(column, row[column.id], getDataStore)}
                            </div>
                        </RowCell>
                    ));
                    return (
                        <RowTable
                            key={index}
                            className={classNames(classes.row, classes.dataRow)}
                        >
                            {cells}
                            {selectedTab === "incoming" &&
                                <RowCell className={classNames(classes.cell, classes.bodyCell)}>
                                    <ButtonStrip>
                                        <IconButton size="small" className={styles.approveIcon} onClick={() => { onToggle(selected.rows[index]); setClickedButton("approve") }}>
                                            <IconThumbUp24/>
                                        </IconButton>
                                        <IconButton size="small" className={styles.rejectIcon} onClick={() => { onToggle(selected.rows[index]); setClickedButton("reject") }}>
                                            <IconThumbDown24/>
                                        </IconButton>
                                    </ButtonStrip>
                                </RowCell>
                            }
                        </RowTable>
                    );
                })
            }
        </React.Fragment>
    )
}

export default RenderRows
