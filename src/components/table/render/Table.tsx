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
import { teiRefetch } from "../../../hooks/tei/usePostTei";
import { TabsState } from "../../../schema/tabSchema";
import ModalComponent from "../../modal/Modal";
import ApproveTranferContent from "../../modal/ApproveTransferModalContent";
import { RowSelectionState } from "../../../schema/tableSelectedRowsSchema";

const usetStyles = makeStyles({
  tableContainer: {
    overflowX: "auto"
  }
});

function Table() {
  const classes = usetStyles();
  const { columns } = useHeader();
  const { getData, loading, tableData } = useTableData();
  const { useQuery } = useParams();
  const headerFieldsState = useRecoilValue(HeaderFieldsState);
  const selectedTabState = useRecoilValue(TabsState);
  const selectedRowState = useRecoilValue(RowSelectionState);
  const [page, setpage] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const [refetch] = useRecoilState(teiRefetch);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedTei, setSelectedTei] = useState({});

  useEffect(() => {
    void getData(page, pageSize, selectedTabState?.value);
  }, [
    columns,
    useQuery(),
    headerFieldsState,
    page,
    pageSize,
    refetch,
    selectedTabState
  ]);

  const onPageChange = (newPage: number) => {
    setpage(newPage);
  };

  const onRowsPerPageChange = (event: any) => {
    setpageSize(parseInt(event.value, 10));
    setpage(1);
  };

  const handleOpenApproval = () => { setOpen(true); };
  const handleCloseApproval = () => { setOpen(false); };

  console.log("selectedRow", selectedRowState)
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
                {!loading && (
                  <RenderRows
                    headerData={columns}
                    rowsData={tableData}
                    loading={loading}
                    selectedTab={selectedTabState?.value}
                    handleOpenApproval={handleOpenApproval}
                    setSelectedTeid={setSelectedTei}
                  />
                )}
              </>
            </TableComponent>
            {loading && (
              <CenteredContent className="p-4">
                <CircularLoader />
              </CenteredContent>
            )}
          </div>
          <Pagination
            loading={loading}
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
          title="Approve Incomming Student Transfer"
          open={open}
          setOpen={setOpen}
        >
          <ApproveTranferContent setOpen={setOpen} selectedTei={selectedTei} />
        </ModalComponent>
      )}
    </Paper>
  );
}

export default Table;
