import React from "react";
import { useTable } from "react-table";


function Table({data}) 
{
  const columns = React.useMemo(
    () => [
      {
        Header: "Athlete",
        accessor: "name",
      },
      {
        Header: "Meet 1",
        accessor: "meet1",
      },
      {
        Header: "Meet 2",
        accessor: "meet2",
      },
      {
        Header: "Meet 3",
        accessor: "meet3",
      },
    ],
    []
  );

  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  // Render the UI for your table
  return (
    <table {...getTableProps()} border="5" width="600" style={{marginLeft:"auto",marginRight:"auto"}} >
      <thead className="bg-gray-50">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}
                className="px-6 py-4 whitespace-nowrap"
                >{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;