import { Dispatch, SetStateAction } from "react";
import { TbEdit, TbTrash } from "react-icons/tb";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { BASE_URL } from "../../../config";

type MenuType = {
  menuIsOpen: boolean;
  setMenuIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  setEditModalIsOpen: Dispatch<SetStateAction<boolean>>;
  id: number;
};

const Menu = ({
  menuIsOpen,
  setMenuIsOpen,
  id,
  setIsActive,
  setEditModalIsOpen,
}: MenuType) => {
  const token = useSelector((state: RootState) => {
    return state.user.token;
  });

  const deleteRecord = () => {
    fetch(`${BASE_URL}/vendor/manufacturers/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          window.location.reload();
          // console.log(data);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div
      className={`w-[140px] top-10 right-2 full-theme z-[999] shadow-lg rounded-lg ${
        menuIsOpen ? "absolute" : "hidden"
      } duration-300 `}
    >
      <div
        // onClick={() => setMenuIsOpen(false)}
        className="relative flex flex-col "
      >
        <div
          onClick={() => {
            setEditModalIsOpen(true);
            setMenuIsOpen(false);
          }}
          className="flex items-center gap-2 text-md justify-between hover:bg-slate-100 p-3 cursor-pointer border-b"
        >
          <span>Edit</span>
          <TbEdit size={22} />
        </div>

        <div
          onClick={() => {
            setMenuIsOpen(false);
            deleteRecord();
          }}
          className="flex items-center gap-2 text-md justify-between p-3 hover:bg-slate-100 cursor-pointer rounded-b-lg"
        >
          <span>Delete</span>
          <TbTrash size={22} className="text-[red]" />
        </div>
      </div>
    </div>
  );
};

export default Menu;
