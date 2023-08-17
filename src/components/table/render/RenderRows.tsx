import React from 'react'
import i18n from '@dhis2/d2-i18n';
import classNames from 'classnames';
import { ButtonStrip, IconThumbUp24, IconThumbDown24 } from "@dhis2/ui"
import { makeStyles, type Theme, createStyles } from '@material-ui/core/styles';
import { RowCell, RowTable } from '../components';
import { type CustomAttributeProps } from '../../../types/table/AttributeColumns';
import { showValueBasedOnColumn } from '../../../utils/commons/getValueBasedOnColumn';
import { useRecoilValue } from 'recoil';
import { DataStoreState } from '../../../schema/dataStoreSchema';
import styles from "./table-render.module.css"
import { IconButton } from '@material-ui/core';
interface RenderHeaderProps {
    rowsData: any[]
    headerData: CustomAttributeProps[]
    loading: boolean
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

function RenderRows({ headerData, rowsData, loading }: RenderHeaderProps): React.ReactElement {
    const classes = useStyles()
    const getDataStore = useRecoilValue(DataStoreState)

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
                            <RowCell
                            className={classNames(classes.cell, classes.bodyCell)}
                        >
                            <ButtonStrip>
                                <IconButton size="small" className={styles.approveIcon}>
                                      <IconThumbUp24/>
                                </IconButton>
                                <IconButton size="small" className={styles.rejectIcon}>
                                    <IconThumbDown24/>
                                </IconButton>
                            </ButtonStrip>
                        </RowCell>
                        </RowTable>
                    );
                })
            }
        </React.Fragment>
    )
}

export default RenderRows
