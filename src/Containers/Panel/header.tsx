import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import Button from "../../Components/UI/Inputs/Button";
import Input from "../../Components/UI/Inputs/Input";
import Select from "../../Components/UI/Inputs/Select";
import { GrStatusPlaceholder } from "react-icons/gr";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import Modal from "../../Components/UI/Modals/Modal";
import AddForm from "./AddForm";

type HeaderType = {
  searchValue: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Header = ({ searchValue, onChange }: HeaderType) => {
  const [isOpen, setIsOpen] = useState(false);

  const data = [
    {
      title: "Active",
      id: 1,
    },
    {
      title: "Pending",
      id: 2,
    },
    {
      title: "Sold",
      id: 3,
    },
  ];

  return (
    <div className="flex justify-between w-full items-center gap-6 mt-24 mb-8 container">
      <Input
        placeholder="Search products"
        value={searchValue}
        onChange={onChange}
        icon={<BsSearch />}
        className="w-10/12"
      />

      <div className="flex w-[500px] items-center gap-4">
        <Select
          title="Status"
          options={data}
          placeholder="Status"
          className="w-full"
          icon={<GrStatusPlaceholder />}
        />

        <Button
          onClick={() => setIsOpen(true)}
          title="Add Product"
          className="whitespace-nowrap min-w-fit max-w-fit"
          icon={<AiOutlineAppstoreAdd className="text-white" size={20} />}
        />
      </div>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen} zIndex="z-[10000]">
        <AddForm setIsOpen={setIsOpen} />
      </Modal>
    </div>
  );
};

export default Header;
