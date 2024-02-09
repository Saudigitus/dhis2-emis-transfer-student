import React from 'react'
import i18n from '@dhis2/d2-i18n';
import classNames from 'classnames';
import { makeStyles, type Theme, createStyles } from '@material-ui/core/styles';
import { RowCell, RowTable } from '../components';
import { type CustomAttributeProps } from '../../../types/table/AttributeColumns';
import { showValueBasedOnColumn } from '../../../utils/commons/tableRowsColumns';
import { useRecoilState } from 'recoil';
import { RowSelectionState } from '../../../schema/tableSelectedRowsSchema';
import { replaceSelectedRow } from '../../../utils/commons/arrayUtils';
import { ApprovalButtonClicked } from '../../../schema/approvalButtonClicked';
import { getSelectedKey } from '../../../utils/commons/dataStore/getSelectedKey';
import usetGetOptionColorMapping from '../../../hooks/optionSets/usetGetOptionColorMapping';
import { useTransferConst } from '../../../utils/constants/transferOptions/statusOptions';
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
    const { getDataStoreData } = getSelectedKey();
    const [selected, setSelected] = useRecoilState(RowSelectionState);
    const [, setClickedButton] = useRecoilState(ApprovalButtonClicked)
    const valueColorMapping = usetGetOptionColorMapping()
    const { transferConst } = useTransferConst()

    const onToggle = (rawRowData: object) => {
        handleOpenApproval();
        setSelected({ ...selected, selectedRows: replaceSelectedRow(rawRowData), isAllRowsSelected: selected.rows.length === replaceSelectedRow(rawRowData).length })
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
                                {showValueBasedOnColumn(column, row[column.id], getDataStoreData, onToggle, setClickedButton, selected, index, selectedTab, valueColorMapping, transferConst("pending") as string)}
                            </div>
                        </RowCell>
                    ));
                    return (
                        <RowTable
                            key={index}
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
