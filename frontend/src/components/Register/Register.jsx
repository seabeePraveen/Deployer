import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";


function Register(){
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage?.getItem("token")?.length) {
          navigate("/dashboard", { replace: true });
        }
      },[]);
    const [registerInfo, setRegisterInfo] = useState({
        username: "",
        password: "",
        rePassword: "",
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (registerInfo.password == registerInfo.rePassword){
            try {
            const response = await fetch('http://127.0.0.1:8002/auth/register/', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username":registerInfo.username,
                    "password":registerInfo.password
                })
            });
            if (response.status === 200) {
                const responseData = await response.json();
                console.log(responseData);
                localStorage.setItem("token", responseData.token);
                localStorage.setItem("username",responseData.username)
                navigate("/dashboard");
            } else {
                toast.error("Please provide correct credentials.");
            }
            } catch (error) {
            console.error('Error:', error);
            toast.error("An error occurred. Please try again later.");
            }
        }
        else {
            toast.error("Both Passwords are not matching");
        }
    };
    return (
        <div className="border-stroke shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border bg-white">
        <div className="border-stroke px-6.5 dark:border-strokedark border-b py-4">
          <h3 className="font-medium text-black dark:text-white">
            Sign Up Form
          </h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            {/* <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="border-stroke focus:border-primary active:border-primary disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary w-full rounded border-[1.5px] bg-transparent px-5 py-3 font-medium outline-none transition disabled:cursor-default"
              />
            </div> */}

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                username
              </label>
              <input
                type="username"
                placeholder="Enter your username address"
                className="border-stroke focus:border-primary active:border-primary disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary w-full rounded border-[1.5px] bg-transparent px-5 py-3 font-medium outline-none transition disabled:cursor-default"
                onChange={(e) => {
                    setRegisterInfo({ ...registerInfo, username: e.target.value });
                }}
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="border-stroke focus:border-primary active:border-primary disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary w-full rounded border-[1.5px] bg-transparent px-5 py-3 font-medium outline-none transition disabled:cursor-default"
                onChange={(e) => {
                    setRegisterInfo({ ...registerInfo, password: e.target.value });
                }}
              />
            </div>

            <div className="mb-5.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Re-type Password
              </label>
              <input
                type="password"
                placeholder="Re-enter password"
                className="border-stroke focus:border-primary active:border-primary disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary w-full rounded border-[1.5px] bg-transparent px-5 py-3 font-medium outline-none transition disabled:cursor-default"
                onChange={(e) => {
                    setRegisterInfo({ ...registerInfo, rePassword: e.target.value });
                }}
              />
            </div>

            <button className="bg-primary text-gray flex w-full justify-center rounded p-3 font-medium">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
}

export default Register;