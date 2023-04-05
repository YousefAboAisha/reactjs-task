import { Dispatch, SetStateAction } from "react";
import { TbEdit, TbTrash } from "react-icons/tb";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { BASE_URL } from "../../../config";

type MenuType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  id: number;
};

const Menu = ({ isOpen, setIsOpen, id, setIsActive }: MenuType) => {
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
          console.log(data);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div
        className={`w-[140px] top-10 right-2 full-theme z-[999] shadow-2xl rounded-lg ${
          isOpen ? "absolute" : "hidden"
        } duration-300 `}
      >
        <div
          onClick={() => setIsOpen(false)}
          className="relative flex flex-col"
        >
          <div className="flex items-center gap-2 text-md justify-between hover:bg-slate-100 p-3 cursor-pointer">
            <span>Edit</span>
            <TbEdit size={22} />
          </div>

          <div
            onClick={() => {
              setIsOpen(false);
              deleteRecord();
            }}
            className="flex items-center gap-2 text-md justify-between p-3 hover:bg-slate-100 cursor-pointer rounded-b-lg"
          >
            <span>Delete</span>
            <TbTrash size={22} className="text-[red]" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
