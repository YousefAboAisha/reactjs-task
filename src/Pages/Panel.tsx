import { useDeferredValue, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import Navbar from "../Components/Navbar";
import Select from "../Components/UI/Inputs/Select";
import Spinner from "../Components/UI/Utils/Spinner";
import { BASE_URL } from "../config";
import Header from "../Containers/Panel/header";
import Pagination from "../Containers/Panel/Pagination";
import Table from "../Containers/Panel/Table";
import { PerPageData } from "../Data/perPageData";

const Panel = () => {
  const token = useSelector((state: RootState) => {
    return state.user.token;
  });

  const [searchValue, setSearchValue] = useState("");
  const deferredInputValue = useDeferredValue(searchValue);

  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [pageData, setPageData] = useState({
    currentPage: 1,
    from: 1,
    to: 20,
    per_page: 10,
    total: 10,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handlePageChange = (page: number) => {
    setPageData({
      ...pageData,
      currentPage: page,
    });
  };

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${BASE_URL}/vendor/manufacturers?per_page=${pageData.per_page}&search=${searchValue}`,
        {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          headers: {
            Authorization: `Bearer ${token}`,
            "Accept-Language": "en",
          },
        }
      );
      if (!response.ok) {
        setLoading(false);
        throw new Error("Network response was not ok");
      }
      setLoading(false);
      const data = await response.json();
      console.log(data.data);
      if (data) {
        setTableData(data.data);
        setPageData({
          ...pageData,
          currentPage: data.pages.current_page,
          from: data.pages.from,
          per_page: data.pages.per_page,
          total: data.pages.total,
        });
      }
    } catch (err) {
      console.log("Error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageData.per_page, deferredInputValue]);

  console.log(pageData.per_page);

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
            onChange={(e) =>
              setPageData({
                ...pageData,
                per_page: parseFloat(e.target.value),
              })
            }
            className="pl-4"
          />
        </div>

        <Pagination
          currentPage={pageData.currentPage}
          totalPages={pageData.total}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default Panel;
