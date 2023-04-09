import React, { Dispatch, SetStateAction } from "react";
import ReactDOM from "react-dom";

type ModalType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  bg?: string;
  zIndex?: string;
  children?: React.ReactNode;
};

const Modal = ({
  setIsOpen,
  isOpen,
  bg = "bg-[#000000a0]",
  zIndex,
  children,
}: ModalType) =>
  isOpen
    ? ReactDOM.createPortal(
        <>
          <div
            className={`fixed w-full h-full left-0 top-0 z-20 ${bg} duration-700 transition-opacity`}
            onClick={() => setIsOpen(false)}
          ></div>
          {children}
        </>,
        document.body
      )
    : null;
export default Modal;
