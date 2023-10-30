import React from "react";
import { Table } from "../../components";
import { useParams } from "../../hooks/commons/useQueryParams";
import InitialMessage from "../../components/initialInstructions/InitialMessage";

function TableComponent() {
  const { urlParamiters } = useParams()
  const school = urlParamiters().school as unknown as string

  return (
    <>
      {(school !== null)
        ? <Table />
        : <InitialMessage />
      }
    </>
  )
}

export default TableComponent;
