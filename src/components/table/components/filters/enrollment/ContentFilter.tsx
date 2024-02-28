import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import MenuFilters from './MenuFilters';
import { useRecoilState } from 'recoil';
import { Button } from '@material-ui/core';
import style from './enrollment.module.css'
import SelectButton from "../selectButton/SelectButton";
import { HeaderFieldsState } from '../../../../../schema/headersSchema';
import { ContentFilterProps, FiltersValuesProps } from '../../../../../types/table/ContentFiltersTypes';
import { type CustomAttributeProps } from '../../../../../types/variables/AttributeColumns';
import { convertArrayToObject } from '../../../../../utils/table/filter/formatArrayToObject';

function ContentFilter(props: ContentFilterProps) {
    const { headers = [] } = props;
    const [filtersValues, setfiltersValues] = useState<FiltersValuesProps>({})
    const [localFilters, setlocalFilters] = useState<CustomAttributeProps[]>([])
    const [fieldsFilled, setfieldsFilled] = useState<FiltersValuesProps>({})
    const [anchorEl, setAnchorEl] = useState<EventTarget | null>(null);
    const [resetValues, setresetValues] = useState("")
    const [headerFieldsStateValues, setHeaderFieldsState] = useRecoilState(HeaderFieldsState)
    const attributesQuerybuilder: string[][] = [];
    const dataElementsQuerybuilder: string[][] = [];

    useEffect(() => {
        const copyHeader = [...headers]
        setlocalFilters(copyHeader.slice(0, 4))
    }, [headers])

    const handleClick = (event: MouseEvent) => {
        setAnchorEl(event.currentTarget);
    };

    const addSearchableHeaders = (e: CustomAttributeProps) => {
        const copyHeader = [...headers]
        const copyHeaderLocal = [...localFilters]

        const pos = copyHeader.findIndex(x => x.id === e.id)
        copyHeaderLocal.push(copyHeader[pos])
        setlocalFilters(copyHeaderLocal)
    }

    const onChangeFilters = (value: any, key: string, type: string, pos: string) => {
        let cloneHeader = { ...filtersValues, ...convertArrayToObject({array:headerFieldsStateValues.dataElements}) }

        if (type === 'DATE') {
            let date = cloneHeader[key] ?? {}
            if (pos === 'start') {
                verifyIsFilled(value)
                    ? date = { ...date, startDate: format(value, "yyyy-MM-dd") }
                    : delete date.startDate
            } else {
                verifyIsFilled(value)
                    ? date = { ...date, endDate: format(value, "yyyy-MM-dd") }
                    : delete date.endDate
            }
            cloneHeader[key] = date
        } else {
            if (verifyIsFilled(value)) {
                cloneHeader[key] = value
            } else {
                const { [key]: _, ...withoutKey } = cloneHeader
                cloneHeader = withoutKey
            }
        }
        setfiltersValues(cloneHeader);
    }

    function verifyIsFilled(value: any) {
        if (value != null) {
            return true
        }
        if (value === "") {
            return false
        }
        return false
    }

    const onQuerySubmit = () => {
        const copyHeader = { ...filtersValues }
        for (const [key, value] of Object.entries(copyHeader)) {
            const variableType = headers.find(x => x.id === key)?.type
            if (typeof value === 'object') {
                if (variableType === "dataElement") {
                    dataElementsQuerybuilder.push([`${key}:ge:${value?.startDate}:le:${value?.endDate}`])
                } else attributesQuerybuilder.push([`${key}:ge:${value?.startDate}:le:${value?.endDate}`])
            } else {
                if (typeof value === 'boolean') {
                    if (variableType === "dataElement") {
                        dataElementsQuerybuilder.push([`${key}:eq:${value}`])
                    } else attributesQuerybuilder.push([`${key}:eq:${value}`])
                } else
                    if (value?.includes(',')) {
                        const newValue = value.replaceAll(",", "") as string
                        if (variableType === "dataElement") {
                            dataElementsQuerybuilder.push([`${key}:in:${newValue}`])
                        } else attributesQuerybuilder.push([`${key}:in:${newValue}`])
                    } else {
                        if (variableType === "dataElement") {
                            dataElementsQuerybuilder.push([`${key}:like:${value}`])
                        } else attributesQuerybuilder.push([`${key}:like:${value}`])
                    }
            }
        }
        setfieldsFilled(copyHeader)
        setHeaderFieldsState({
            attributes: attributesQuerybuilder,
            dataElements: dataElementsQuerybuilder
        })
    }

    const onResetFilters = (id: string) => {
        const copyHeader = { ...filtersValues }

        const { [id]: _, ...withoutID } = copyHeader;
        setfiltersValues(withoutID)
        setresetValues(id)
    }

    useEffect(() => {
        if (resetValues.length > 0) {
            onQuerySubmit()
            setresetValues("")
        }
    }, [resetValues])

    return (
        <div className={style.contentFilterContainer}>
            {
                localFilters.map((colums, index) => (
                    <SelectButton key={index}
                        tooltipContent=''
                        title={colums.displayName}
                        value={filtersValues[colums.id]}
                        colum={colums}
                        onQuerySubmit={onQuerySubmit}
                        onChange={onChangeFilters}
                        disabledReset={
                            typeof filtersValues[colums.id] === "object"
                                ? filtersValues[colums.id]?.startDate !== undefined && filtersValues[colums.id]?.endDate === undefined
                                : filtersValues[colums.id] === undefined
                        }
                        disabled={
                            typeof filtersValues[colums.id] === "object"
                                ? fieldsFilled[colums.id]?.startDate === filtersValues[colums.id]?.startDate &&
                                fieldsFilled[colums.id]?.endDate === filtersValues[colums.id]?.endDate

                                : fieldsFilled[colums.id] === filtersValues[colums.id]
                        }
                        filled={(Boolean(fieldsFilled[colums.id])) && fieldsFilled[colums.id]}
                        onResetFilters={onResetFilters}
                    />
                ))
            } 
            <div className={style.contentFilterButtonsConatiner}>
                {headers?.filter(x => !localFilters.includes(x)).length > 0 &&
                    <Button 
                        variant='outlined'
                        onClick={handleClick}
                        className={style.contentFilterButton}
                    >
                        More filters
                    </Button>
                }
                <MenuFilters
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
                    options={headers?.filter(x => !localFilters.includes(x))}
                    addSearchableHeaders={addSearchableHeaders}
                />
            </div>

        </div>
    )
}

export default ContentFilter
