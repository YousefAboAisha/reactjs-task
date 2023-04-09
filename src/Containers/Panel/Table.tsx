import TableRow from "./TableRow";

type NameType = {
  en: string;
  ar: string;
};

export type RowType = {
  id: number;
  name: NameType;
  image: string;
  status: number;
  sort_order: number;
};

type TableProps = {
  tableData: RowType[];
};

const Table = ({ tableData }: TableProps) => {
  return (
    <>
      <table className="w-full text-sm text-left text-gray-500 rounded-lg ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
          <tr className="h-14">
            <th scope="col" className="px-6 py-3 text-center">
              Manufacturer
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Order
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Actions
            </th>
          </tr>
        </thead>

        {tableData.length > 0 ? (
          tableData.map((elem) => {
            return (
              <TableRow
                key={elem.id}
                id={elem.id}
                image={elem.image}
                name={elem.name}
                sort_order={elem.sort_order}
                status={elem.status}
              />
            );
          })
        ) : (
          <caption className="abs-center ">Not Records Found</caption>
        )}
      </table>
    </>
  );
};

export default Table;
