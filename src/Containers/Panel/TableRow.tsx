import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import Menu from "../../Components/UI/Modals/Menu";
import Modal from "../../Components/UI/Modals/Modal";
import Snackbar from "../../Components/UI/Modals/Snackbar";
import { RowType } from "./Table";

const TableRow = (rowData: RowType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [lang, setLang] = useState(navigator.language);

  return (
    <tbody>
      <tr className="bg-white border-b">
        <td className="w-32 p-4 text-center">
          <img
            src={rowData.image}
            alt="Apple Watch"
            className="w-20 h-20 rounded-lg aspect-square"
          />
        </td>

        <td className="px-6 py-4 font-semibold text-gray-900 text-center">
          {lang === "en" ? rowData.name.en : rowData.name.ar}
        </td>

        <td className="px-6 py-4 text-center">{rowData.sort_order}</td>

        <td className="px-6 py-4 font-semibold text-gray-900 text-center">
          {rowData.status}
        </td>

        <td className="relative px-6 py-4 w-fit">
          <FiSettings
            onClick={() => setIsOpen(!isOpen)}
            size={20}
            className="cursor-pointer abs-center"
          />
          <Menu
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            id={rowData.id}
            setIsActive={setIsActive}
          />
        </td>
      </tr>

      <Snackbar
        IsActive={isActive}
        message={"You have successfully deleted record"}
      />

      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        bg="bg-transparent"
        zIndex="z-[100]"
      />
    </tbody>
  );
};

export default TableRow;
