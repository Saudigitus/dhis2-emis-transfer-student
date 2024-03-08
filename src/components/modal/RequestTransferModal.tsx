import React, { useState, useEffect } from "react";
import {
  ModalActions,
  Button,
  ButtonStrip,
  NoticeBox,
  Label,
  Divider,
} from "@dhis2/ui";
import { Form } from "react-final-form";
import { Col, Row } from "react-bootstrap";
import { Search } from "@material-ui/icons";
import { useDataEngine } from "@dhis2/app-runtime";
import { useRecoilState, useRecoilValue } from "recoil";
import { RequestTranferProps } from "../../types/modal/ModalTypes";
import GenericFields from "../genericFields/GenericFields";
import { useParams } from "../../hooks/commons/useQueryParams";
import { useHeader } from "../../hooks/tableHeader/useHeader";
import { useGetProgramsAttributes } from "../../hooks/tei/useGetProgramsAttributes";
import WithPadding from "../template/WithPadding";
import WithBorder from "../template/WithBorder";
import { Pagination, TableComponent } from "../table/components";
import RenderHeader from "../table/render/RenderHeader";
import RenderRows from "../table/render/RenderRows";
import { TabsState } from "../../schema/tabSchema";
import { DataStoreState } from "../../schema/dataStoreSchema";
import { SelectedTeiState } from "../../schema/selectedTeiSchema";
import { formatResponseData } from "../../utils/tei/formatResponseData";
import { getDataStoreKeys } from "../../utils/commons/dataStore/getDataStoreKeys";


const SEARCH_TEI_QUERY = {
  results: {
    resource: "tracker/trackedEntities",
    params: ({ program, orgUnit, filter, page, pageSize }: any) => ({
      ouMode: "ACCESSIBLE",
      fields: "*",
      totalPages: true,
      program,
      orgUnit,
      filter,
      page,
      pageSize
    }),
  },
};
const type = "WITH_REGISTRATION";
function RequestTransfer(props: RequestTranferProps): React.ReactElement {
  const { setOpen } = props;
  const { urlParamiters, remove } = useParams();
  const getDataStoreData = useRecoilValue(DataStoreState);
  const { program } = getDataStoreKeys();
  const orgUnit = urlParamiters().school;
  const engine = useDataEngine();
  const [queryForm, setQueryForm] = useState<any>({});
  const [values, setValues] = useState<object>({});
  const { teiAttributes } = useGetProgramsAttributes();
  const closeModal = () => {setOpen(false); remove("modalType")};
  const [loadingTeis, setLoadingTeis] = useState<boolean>(false);
  const [teiResults, setTeiResults] = useState<any[]>([]);
  const [totalResults, setTotalResults] = useState<any>(null);
  const [selectedTei, setSelectedTei] = useRecoilState(SelectedTeiState);
  const [page, setpage] = useState(1)
  const [pageSize, setpageSize] = useState(10)
  const selectedTabState = useRecoilValue(TabsState);

  const handleCloseRequest = () => {
    setOpen(false)
  }
  const onPageChange = (newPage: number) => {
    setpage(newPage)
}

const onRowsPerPageChange = (event: any) => {
    setpageSize(parseInt(event.value, 10))
    setpage(1)
}


  const onHandleChange = ({ target: { value, name }, }: { target: { value: any; name: any }; }) => {
    if (value.length === 0 || value === null || value === undefined) {
      delete queryForm[name];
      setQueryForm(queryForm);
    } else {
      setQueryForm({
        ...queryForm,
        [name]: value,
      });
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      onHandleSubmit();
    }
  };

  const formattedQuery = ()=> {
    var query = "";

    for (const [key, value] of Object.entries(queryForm)) {
      console.log("key: ", key)
      if (key && value) {
        const id = teiAttributes?.filter((element) => {
          return element.name == key;
        })[0].name;

        if (id) {
          query += `${id}:LIKE:${value},`;
        }
      }
    }
    return query;
  }

  const onHandleSubmit = async () => {
    setSelectedTei({});
    if (formattedQuery().length > 0) {
      setLoadingTeis(true);
      await engine.query(SEARCH_TEI_QUERY, {
        variables: {
          program,
          filter: formattedQuery().slice(0, -1),
          ou: orgUnit,
          page,
          pageSize
        },
        onComplete: async (response) => {
          const colums = formatResponseData(type, response.results.instances || []);
          setTeiResults(colums);
          setTotalResults(response.results.total || 0);
        },
      });
      setLoadingTeis(false);
    }
  };


  const onReset = () => {
    setSelectedTei({});
    setQueryForm({});
    setTeiResults([]);
    setTotalResults(null);
  };

  useEffect(() => {
    void onHandleSubmit()
  }, [page, pageSize])

  const modalActions = [
    { id: "cancel", type: "button", label: "Cancel", disabled: loadingTeis, onClick: () => handleCloseRequest() },
    { id: "confirm", type: "button", label: "Contitue", primary: true, disabled: loadingTeis || !Object.keys(selectedTei).length, onClick: () => handleCloseRequest() }
  ];

  return (
    <div>
      <Label>Fill in the fields below to <strong>search for a student</strong> you want to request a transfer:</Label>
      <Divider />
      <Form onSubmit={onHandleSubmit} initialValues={queryForm}>
        {({ handleSubmit }) => (
          <form
            onSubmit={(event) => handleSubmit(event)}
            onKeyDown={handleKeyDown}
            onChange={(event: any) => onHandleChange(event)}
          >
            <Row className="w-100">
              {teiAttributes
                ?.filter((x: any) => x.visible === true).slice(0, 3)
                ?.map((attribute: any, index: number) => {
                  // Alterando o valor da propriedade 'required' no próprio objeto 'attribute'
                  attribute.required = false;

                  return (
                    <Col key={index} sm={4} className="mb-2">
                      <Label> {attribute.labelName}:</Label>
                      <GenericFields
                        attribute={attribute}
                        disabled={attribute.disabled}
                        valueType={attribute.valueType}
                      />
                    </Col>
                  );
                })}
            </Row>

            <ButtonStrip className="mt-3">
              <Button
                disabled={totalResults === null}
                onClick={onReset}
                name="Basic button"
                value="default"
              >
                Reset
              </Button>
              <Button
                disabled={!Object.keys(queryForm).length}
                type="submit"
                primary
                onClick={onHandleSubmit}
                name="Basic button"
                value="default"
                loading={loadingTeis}
              >
                {loadingTeis ? <> Searching for results... </> : <><Search fontSize="small" /> Search</>}
              </Button>
                
            </ButtonStrip>
            <WithPadding />
            <WithPadding />

            
          </form>
        )}
      </Form>
      {totalResults === null ?
          <NoticeBox className="p-2"> The expected results will be shown below. </NoticeBox>
          : totalResults > 0 ?
            <NoticeBox title="Instructions:" className="p-2" warning> Click on the desired student to proceed. </NoticeBox>:
            <NoticeBox className="p-2"> No results found. </NoticeBox>
      }
      
      <WithPadding />

      {teiResults.length ?
        <WithBorder type="all">
          <TableComponent>
            <RenderHeader
              createSortHandler={() => {}}
              order="asc"
              orderBy="desc"
              rowsHeader={teiAttributes}
              selectedTab={selectedTabState?.value}
            />
            <RenderRows
              headerData={teiAttributes}
              rowsData={teiResults}
              loading={loadingTeis}
              selectedTab={selectedTabState?.value}
              handleOpenApproval={() => {}}
            />
          </TableComponent>
          <div className="d-flex align-items-end justify-content-between pl-4">
            <Label className="text-secondary">Total results:{" "}<strong>{totalResults}</strong></Label>
            <Pagination
              loading={loadingTeis}
              onPageChange={onPageChange}
              onRowsPerPageChange={onRowsPerPageChange}
              page={page}
              rowsPerPage={pageSize}
              totalPerPage={teiResults?.length}
            />
          </div>
          
        </WithBorder>
        : null
      }
      {teiResults.length ?
          <ModalActions className="d-flex justify-content-between mt-2"> <div></div>
            <ButtonStrip end>
              {modalActions.map((action, i) => (
                <Button key={i} {...action}>
                  {action.label}
                </Button>
              ))}
            </ButtonStrip>
          </ModalActions>
        : null
      }
      
    </div>
  );
}

export default RequestTransfer;
