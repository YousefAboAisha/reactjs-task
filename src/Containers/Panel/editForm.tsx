import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Button from "../../Components/UI/Inputs/Button";
import Input from "../../Components/UI/Inputs/Input";
import Heading from "../../Components/UI/Typography/Heading";
import Spinner from "../../Components/UI/Utils/Spinner";
import { BASE_URL } from "../../config";
import ImageUploader from "./ImageUploader";

type addFormType = { setIsOpen: Dispatch<SetStateAction<boolean>>; id: number };

const EditForm = ({ setIsOpen, id }: addFormType) => {
  const token = useSelector((state: RootState) => {
    return state.user.token;
  });

  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const [editForm, setEditForm] = useState({
    name: {
      ar: "",
      en: "",
    },
    image: "",
    sort: "",
  });

  //   const formData = new FormData();

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

  //   const emptyForm = () => {
  //     setEditForm({
  //       "name[en]": "",
  //       "name[ar]": "",
  //       image: "",
  //       sort: "",
  //     });
  //   };

  const editHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    setEditLoading(true);

    // console.log("Edit Form", editForm);

    e.preventDefault();
    try {
      //   if (!editForm.sort) {
      //     throw new Error("Sort field is required");
      //   }

      const response = await fetch(`${BASE_URL}/vendor/manufacturers/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) {
        setEditLoading(false);
        throw new Error("Network response was not ok");
      }
      setEditLoading(false);
      const data = await response.json();
      console.log(data);
      setIsOpen(false);
      window.location.reload();
    } catch (err) {
      console.log("Error", err);
      setEditLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/vendor/manufacturers/${id}`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept-Language": "en",
        },
      });
      if (!response.ok) {
        setLoading(false);
        throw new Error("Network response was not ok");
      }
      setLoading(false);
      const data = await response.json();
      if (data)
        setEditForm({
          name: {
            ar: data.data.name.ar,
            en: data.data.name.en,
          },
          image: data.data.image,
          sort: data.data.sort_order,
        });
      console.log("Fetched Data", data.data);
    } catch (err) {
      console.log("Error", err);
    } finally {
      setLoading(false);
    }
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
          onSubmit={(e) => editHandler(e)}
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
