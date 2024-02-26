import React from "react";
import { useHeader } from "../../../../hooks/tableHeader/useHeader";
import EnrollmentFilters from "../filters/enrollment/EnrollmentFilters";
import ConfigTableColumns from "../configTableColumns/ConfigTableColumns";

function HeaderFilters() {
  const { columns } = useHeader();
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <EnrollmentFilters />

      <ConfigTableColumns headers={columns} updateVariables={() => {}} />
    </div>
  );
}

export default HeaderFilters;
