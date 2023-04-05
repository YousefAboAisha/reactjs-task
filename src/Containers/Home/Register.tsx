import React, { useState } from "react";
import { AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Button from "../../Components/UI/Inputs/Button";
import Input from "../../Components/UI/Inputs/Input";
import Snackbar from "../../Components/UI/Modals/Snackbar";
import Heading from "../../Components/UI/Typography/Heading";
import { BASE_URL } from "../../config";
import { login } from "../../Features/authSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emptyForm = () => {
    setFormData({
      email: "",
      password: "",
    });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);

    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/vendor/login`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        setLoading(false);
        throw new Error("Network response was not ok");
      }

      setLoading(false);
      const data = await response.json();
      console.log(data);
      dispatch(login(data.data.token));
      // console.log(data.data.token);

      setIsActive(true);
      setTimeout(() => {
        setIsActive(false);
      }, 4000);
      setTimeout(() => {
        setIsActive(false);
      }, 4000);

      emptyForm();

      setTimeout(() => {
        navigate("/panel");
      }, 2000);
    } catch (err) {
      console.log("Error", err);
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => submitHandler(e)}
      className="relative p-6 border rounded-lg shadow-sm w-11/12 md:w-7/12 lg:w-5/12"
    >
      <Snackbar
        IsActive={isActive}
        message={"You have successfully signed in!"}
      />
      <Heading title={"Sign in"} className="mb-6 text-center" />
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-1">
          <Input
            placeholder={"Enter Your Email"}
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            icon={<AiOutlineUser size={22} />}
            type={"email"}
          />
          {}
          {/* <span className="text-[red] text-[11px] font-semibold">Error</span> */}
        </div>

        <div className="flex flex-col gap-1">
          <Input
            placeholder={"Enter Your Password"}
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
            icon={<AiOutlineLock size={22} />}
            type={"password"}
          />
          {/* <span className="text-[red] text-[11px] font-semibold">Error</span> */}
        </div>
      </div>
      <Button title={"Sign in"} className="mt-6" loading={loading} />
    </form>
  );
};

export default Register;
