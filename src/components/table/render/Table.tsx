import React, { useEffect, useState } from "react";
import { CenteredContent, CircularLoader } from "@dhis2/ui";
import { HeaderFilters, Pagination, TableComponent } from "../components";
import RenderHeader from "./RenderHeader";
import RenderRows from "./RenderRows";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import WithBorder from "../../template/WithBorder";
import WithPadding from "../../template/WithPadding";
import WorkingLits from "../components/filters/tableTopActions/TableTopActions";
import { useHeader } from "../../../hooks/tableHeader/useHeader";
import { useTableData } from "../../../hooks/tableData/useTableData";
import { useParams } from "../../../hooks/commons/useQueryParams";
import { useRecoilState, useRecoilValue } from "recoil";
import { HeaderFieldsState } from "../../../schema/headersSchema";
import { TabsState } from "../../../schema/tabSchema";
import ModalComponent from "../../modal/Modal";
import ApproveTranferContent from "../../modal/ApproveTransferModalContent";
import { ApprovalButtonClicked } from "../../../schema/approvalButtonClicked";
import { loadingOusState } from "../../../schema/loadingOusSchema";
import { TeiRefetch } from "../../../schema/refecthTeiSchema";
import useGetSectionTypeLabel from "../../../hooks/commons/useGetSectionTypeLabel";

const usetStyles = makeStyles({
  tableContainer: {
    overflowX: "auto"
  }
});

function Table() {
  const classes = usetStyles();
  const { sectionName } = useGetSectionTypeLabel();
  const { columns } = useHeader();
  const { getData, loading, tableData } = useTableData();
  const { useQuery } = useParams();
  const headerFieldsState = useRecoilValue(HeaderFieldsState);
  const selectedTabState = useRecoilValue(TabsState);
  const loadingOus = useRecoilValue(loadingOusState);
  const [page, setpage] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const [refetch] = useRecoilState(TeiRefetch);
  const [open, setOpen] = useState<boolean>(false);
  const clickedButton = useRecoilValue(ApprovalButtonClicked)

  useEffect(() => {
    void getData(page, pageSize, selectedTabState?.value);
  }, [headerFieldsState, page, pageSize, refetch, selectedTabState])

  const onPageChange = (newPage: number) => {
    setpage(newPage);
  };

  const onRowsPerPageChange = (event: any) => {
    setpageSize(parseInt(event.value, 10));
    setpage(1);
  };

  const handleOpenApproval = () => { setOpen(true); };
  const handleCloseApproval = () => { setOpen(false); };

  return (
    <Paper>
      <WorkingLits />
      <WithBorder type="bottom" />
      <WithPadding>
        <WithBorder type="all">
          <HeaderFilters />
          <div className={classes.tableContainer}>
            <TableComponent>
              <>
                <RenderHeader
                  createSortHandler={() => {}}
                  order="asc"
                  orderBy="desc"
                  rowsHeader={columns}
                  selectedTab={selectedTabState?.value}
                />
                {!loading && !loadingOus && (
                  <RenderRows
                    headerData={columns}
                    rowsData={tableData}
                    loading={loading || loadingOus}
                    selectedTab={selectedTabState?.value}
                    handleOpenApproval={handleOpenApproval}
                  />
                )}
              </>
            </TableComponent>
            {(loading || loadingOus) && (
              <CenteredContent className="p-4">
                <CircularLoader />
              </CenteredContent>
            )}
          </div>
          <Pagination
            loading={loading || loadingOus}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
            page={page}
            rowsPerPage={pageSize}
            totalPerPage={tableData?.length}
          />
        </WithBorder>
      </WithPadding>
      {open && (
        <ModalComponent
          title={`${clickedButton === "approve" ? "Approve" : "Reject"} Incomming ${sectionName} Transfer`}
          open={open}
          setOpen={setOpen}
        >
          <ApproveTranferContent setOpen={setOpen} handleCloseApproval={handleCloseApproval} />
        </ModalComponent>
      )}
    </Paper>
  );
}

export default Table;
