import React, { Dispatch, SetStateAction } from "react";

type ModalType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  bg?: string;
  zIndex: string;
  children?: React.ReactNode;
};

const Modal = ({
  setIsOpen,
  isOpen,
  bg = "bg-[#00000057]",
  zIndex,
  children,
}: ModalType) => {
  return isOpen ? (
    <>
      <div
        className={`fixed w-full h-full left-0 top-0 ${zIndex} ${bg} duration-300`}
        onClick={() => setIsOpen(false)}
      ></div>
      {children}
    </>
  ) : null;
};

export default Modal;
