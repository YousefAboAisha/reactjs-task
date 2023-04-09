import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import Menu from "../../Components/UI/Modals/Menu";
import Modal from "../../Components/UI/Modals/Modal";
import Snackbar from "../../Components/UI/Modals/Snackbar";
import EditForm from "./editForm";
import { RowType } from "./Table";

const TableRow = (rowData: RowType) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [lang, setLang] = useState(navigator.language);

  return (
    <>
      <tr className="bg-white border-b last:border-b-0">
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
            onClick={() => setMenuIsOpen(!menuIsOpen)}
            size={20}
            className="cursor-pointer abs-center"
          />
          <Menu
            menuIsOpen={menuIsOpen}
            setMenuIsOpen={setMenuIsOpen}
            setEditModalIsOpen={setEditModalIsOpen}
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
        isOpen={menuIsOpen}
        setIsOpen={setMenuIsOpen}
        bg="bg-transparent"
      />

      <Modal isOpen={editModalIsOpen} setIsOpen={setEditModalIsOpen}>
        <EditForm setIsOpen={setEditModalIsOpen} id={rowData.id} />
      </Modal>
    </>
  );
};

export default TableRow;
