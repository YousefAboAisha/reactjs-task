import { useDeferredValue, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import Navbar from "../Components/Navbar";
import Select from "../Components/UI/Inputs/Select";
import Spinner from "../Components/UI/Utils/Spinner";
import Header from "../Containers/Panel/header";
import Pagination from "../Containers/Panel/Pagination";
import Table from "../Containers/Panel/Table";
import { PerPageData } from "../Data/perPageData";
import {
  getManufacturers,
  resetgetfacturersState,
} from "../Features/getManufacturerSlice";

const Panel = () => {
  const dispatch = useDispatch<any>();
  const [searchValue, setSearchValue] = useState("");
  const deferredInputValue = useDeferredValue(searchValue);
  const [perPage, setperPage] = useState(10);
  const [currentPage, setcurrentPage] = useState(1);
  const { loading, tableData, fetchedPageData } = useSelector(
    (state: RootState) => ({
      loading: state.get.loading,
      tableData: state.get.tableData,
      fetchedPageData: state.get.pageData,
    })
  );
  const token = useSelector((state: RootState) => {
    return state.user.token;
  });
  const editSuccess = useSelector((state: RootState) => {
    return state.edit.success;
  });
  const addSuccess = useSelector((state: RootState) => {
    return state.add.success;
  });
  const deleteSuccess = useSelector((state: RootState) => {
    return state.delete.success;
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handlePageChange = (page: number) => {
    setcurrentPage(page);
  };

  const fetchData = async () => {
    dispatch(
      getManufacturers({
        perPage,
        searchValue,
        token,
      })
    )
      .then(() => {
        console.log("Fetch success!");
        resetgetfacturersState();
      })
      .catch(() => {
        console.log("Error Ocurred");
      });
  };

  useEffect(() => {
    fetchData();
  }, [perPage, deferredInputValue, editSuccess, addSuccess, deleteSuccess]);

  return (
    <>
      <Navbar />

      <Header searchValue={searchValue} onChange={handleInputChange} />

      <div className="relative container bg-white w-full rounded-md border min-h-[400px]">
        {loading ? (
          <Spinner additionalStyles="!absolute" />
        ) : (
          <Table tableData={tableData} />
        )}
      </div>

      <div className="flex w-full items-center justify-between container mb-16 mt-6">
        <div className="w-3/12">
          <Select
            title="10"
            options={PerPageData}
            onChange={(e) => setperPage(parseInt(e.target.value))}
            className="pl-4"
          />
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={fetchedPageData.total}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default Panel;
