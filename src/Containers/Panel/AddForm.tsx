import React, { Dispatch, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Button from "../../Components/UI/Inputs/Button";
import Input from "../../Components/UI/Inputs/Input";
import Heading from "../../Components/UI/Typography/Heading";
import { addManufacturer } from "../../Features/addManufacturerSlice";
import ImageUploader from "./ImageUploader";

type addFormType = { setIsOpen: Dispatch<SetStateAction<boolean>> };

const AddForm = ({ setIsOpen }: addFormType) => {
  const token = useSelector((state: RootState) => {
    return state.user.token;
  });

  const { loading } = useSelector((state: RootState) => ({
    loading: state.add.loading,
  }));

  const dispatch = useDispatch<any>();

  const [addForm, setAddForm] = useState({
    "name[en]": "",
    "name[ar]": "",
    sort: "",
    image: "",
  });

  // console.log(token);

  const handleUpload = (file: File) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result?.toString();
      if (base64String)
        setAddForm({
          ...addForm,
          image: base64String,
        });
      // console.log("Base64 string:", base64String);
    };

    reader.readAsDataURL(file);
  };

  const emptyForm = () => {
    setAddForm({
      "name[en]": "",
      "name[ar]": "",
      sort: "",
      image: "",
    });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(addForm).forEach(([key, value]) => {
      formData.append(key, value);
    });

    dispatch(addManufacturer({ formData, token }))
      .then(() => {
        emptyForm();
        setIsOpen(false);
        window.location.reload();
      })
      .catch(() => {
        console.log("Error Ocurred");
      });
  };

  return (
    <form
      onSubmit={submitHandler}
      className="abs-center fixed flex flex-col gap-2 bg-background_light p-6 rounded-lg w-11/12 md:w-9/12 lg:w-6/12 z-[1000001]"
    >
      <Heading title="Add manufacturer" className="text-xl" />
      <ImageUploader onUpload={handleUpload} />

      <div className="relative flex flex-col gap-3 mt-4">
        <Input
          placeholder="Enter manufacturer name [EN] "
          value={addForm["name[en]"]}
          onChange={(e) =>
            setAddForm({
              ...addForm,
              "name[en]": e.target.value,
            })
          }
          className="pl-4"
        />

        <Input
          placeholder="Enter manufacturer name [AR] "
          value={addForm["name[ar]"]}
          onChange={(e) =>
            setAddForm({
              ...addForm,
              "name[ar]": e.target.value,
            })
          }
          className="pl-4"
        />

        <Input
          placeholder="Enter manufacturer sort "
          value={addForm.sort}
          onChange={(e) =>
            setAddForm({
              ...addForm,
              sort: e.target.value,
            })
          }
          className="pl-4"
          type={"number"}
        />
      </div>

      <div className="mt-4 flex items-center gap-4">
        <Button title="Save changes" className="w-4/12" loading={loading} />
      </div>
    </form>
  );
};

export default AddForm;
