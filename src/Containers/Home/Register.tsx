import React, { useEffect, useState } from "react";
import { AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../../app/store";
import Button from "../../Components/UI/Inputs/Button";
import Input from "../../Components/UI/Inputs/Input";
import Heading from "../../Components/UI/Typography/Heading";
import { login } from "../../Features/authSlice";

const Register = () => {
  const { token, loading } = useSelector((state: RootState) => ({
    token: state.user.token,
    loading: state.user.loading,
  }));

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (token) {
      navigate("/panel");
    }
  });

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(login(formData));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="relative p-6 border rounded-lg shadow-sm w-11/12 md:w-7/12 lg:w-5/12"
    >
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
