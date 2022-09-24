import { useRouter } from "next/router";
import { employees_employees } from "../../gql/__generated__/employees";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { useMutation } from "@apollo/client";
import { DELETE_EMPLOYEE } from "../../gql";
import { deleteEmployee } from "../../gql/__generated__/deleteEmployee";
import { useMemo } from "react";
import { useTable, Column } from "react-table";
import { WithData } from "../../contexts/DataContext";

export const ProjectsTable = () => {
  const { employees, loading } = WithData();
  const [deleteEmployee] = useMutation<deleteEmployee>(DELETE_EMPLOYEE);
  //Delete Handler
  const deleteHandler = async (employeeId: String) => {
    if (window.confirm("Are you sure you want to delete user ?")) {
      await deleteEmployee({
        variables: {
          data: {
            id: employeeId,
          },
        },
      });
      alert("User Deleted");
    }
  };
  const router = useRouter();
  // Collums
  const columns = useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Action",
        accessor: "actions",
        Cell: ({ data }: { data: employees_employees }) => {
          return <CustomRow props={data} />;
        },
      },
    ],
    [employees]
  ) as Column<employees_employees>[] | any;
  // Data
  const data = useMemo(() => {
    if (loading) {
      return [];
    }
    return employees as employees_employees[];
  }, [employees, deleteHandler]);
  // Table Props
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  // Custom Actions Component
  const CustomRow = ({ props }: { props: employees_employees }) => {
    const { id } = props;
    return (
      <div className="flex items-center gap-5">
        <button onClick={() => {}}>
          <AiFillEdit size={15} />
        </button>{" "}
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteHandler(id);
          }}
        >
          <BsFillTrashFill size={15} />
        </button>
      </div>
    );
  };
  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <div className="bg-white shadow-md rounded my-6">
      {/* Table Starts */}
      <table
        className="min-w-max w-full table-auto"
        {...getTableProps()}
        border={1}
      >
        {/* Head */}
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th
                  className="py-3 px-6 text-left"
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* Body */}
        <tbody
          className="text-gray-600 text-sm font-light"
          {...getTableBodyProps()}
        >
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                onClick={() => {
                  router.push(`employee/${row.original.id}`);
                }}
                className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      className="py-3 px-6 text-left whitespace-nowrap"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell", {
                        data: row.original,
                      })}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
