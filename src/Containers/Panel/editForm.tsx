import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Button from "../../Components/UI/Inputs/Button";
import Input from "../../Components/UI/Inputs/Input";
import Heading from "../../Components/UI/Typography/Heading";
import Spinner from "../../Components/UI/Utils/Spinner";
import {
  EditManufacturer,
  resetEditManufacturerState,
} from "../../Features/editManufacturerSlice";
import ImageUploader from "./ImageUploader";
import { getManufacturerDetails } from "../../Features/getManufacturerDataSlice";

type addFormType = { setIsOpen: Dispatch<SetStateAction<boolean>>; id: number };
interface EditFormType {
  name: {
    ar: string;
    en: string;
  };
  image: string;
  sort: string;
}

const EditForm = ({ setIsOpen, id }: addFormType) => {
  const token = useSelector((state: RootState) => {
    return state.user.token;
  });

  const { editLoading } = useSelector((state: RootState) => ({
    editLoading: state.edit.editLoading,
  }));

  const { loading } = useSelector((state: RootState) => ({
    loading: state.getManufacturerDetails.loading,
  }));

  const dispatch = useDispatch<any>();

  const [editForm, setEditForm] = useState<EditFormType>({
    name: {
      ar: "",
      en: "",
    },
    image: "",
    sort: "",
  });

  const handleUpload = (file: File) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result?.toString();
      if (base64String)
        setEditForm({
          ...editForm,
          image: base64String,
        });
      //   console.log("Base64 string:", base64String);
    };

    reader.readAsDataURL(file);
  };

  const editHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(EditManufacturer({ editForm, id, token }))
      .then(() => {
        console.log("Editing success!");
        setIsOpen(false);
        resetEditManufacturerState();
      })
      .catch(() => {
        console.log("Error Ocurred");
      });
  };

  const fetchData = async () => {
    dispatch(getManufacturerDetails({ id, token, setEditForm }))
      .then(() => {
        console.log("Fetching data is done");
      })
      .catch(() => {
        console.log("Error Ocurred");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <form
          onSubmit={editHandler}
          className="abs-center fixed flex flex-col gap-2 bg-background_light p-6 rounded-lg w-11/12 md:w-9/12 lg:w-6/12 z-[100001]"
        >
          <Heading title="Add manufacturer" className="text-xl" />
          <ImageUploader onUpload={handleUpload} initialURL={editForm.image} />

          <div className="relative flex flex-col gap-3 mt-4">
            <Input
              placeholder="Enter manufacturer name [EN] "
              value={editForm.name.en}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  name: {
                    ...editForm.name,
                    en: e.target.value,
                  },
                })
              }
              className="pl-4"
            />

            <Input
              placeholder="Enter manufacturer name [AR] "
              value={editForm.name.ar}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  name: {
                    ...editForm.name,
                    ar: e.target.value,
                  },
                })
              }
              className="pl-4"
            />

            <Input
              placeholder="Enter manufacturer sort "
              value={editForm.sort}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  sort: e.target.value,
                })
              }
              className="pl-4"
              type={"number"}
            />
          </div>

          <div className="mt-4 flex items-center gap-4">
            <Button
              title="Save changes"
              className="w-4/12"
              loading={editLoading}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditForm;
