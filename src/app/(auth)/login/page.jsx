"use client"
/* eslint-disable @next/next/no-img-element */
import Spinner from "@/components/spinner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { useLoginMutation } from "./api/loginSlice";
import { useSelector } from "react-redux";

const Login = () => {
    const reduxTheme = useSelector((state) => state.theme.theme);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loginAuth, { isError, error, isLoading: userLoading, data, isSuccess }] = useLoginMutation()
    const router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault();
        loginAuth({ "username": userName, password })
    };

    useEffect(() => {
        if (isSuccess) {
            const token = data.data;
            Cookies.set("token", token, { expires: 7 });
            window.location = "/"
        }
    }, [isSuccess, data, router]);


    useEffect(() => {
        if (isError) {
            if (error?.data?.message) {
                toast.error(error.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                toast.error("something went wrong please try again later", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }

        }
    }, [isError, error]);

    return (
        <>
            <div className="grid grid-cols-2 justify-center items-center ease-in duration-300 max-[1040px]:grid-cols-1 h-screen">
                <div className="max-[1040px]:hidden">
                {reduxTheme  ? (
                    <img className="w-[800px] h-[920px]" src="images/loginDark.png" alt="#" />
                ) : (
                    <img className="w-[800px] h-[920px]" src="images/Login.png" alt="#" />
                )}

                </div>
                <div className="gird justify-center items-center text-center">
                    <div className="grid mb-10">
                        <h1 className="font-bold text-[28px] font-sans text-[#041631] dark:text-white">Log in</h1>
                        <p className="text-[#526484] font-sans text-[20px] font-semibold">To access your account</p>
                    </div>
                    <div className="grid justify-center items-center">
                        <form onSubmit={handleSubmit} className="grid gap-10">
                            <label htmlFor="user" className="grid text-[#041631] dark:text-white text-start text-[18px] font-sans font-semibold">
                                Your username
                                <input id="user" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Enter Your User Name" className="w-[450px] py-3 px-4 rounded-xl border dark:bg-[#0D0D0D] dark:border-gray-800 border-zinc-300 outline-none max-[471px]:w-[350px]" type="text" required />
                            </label>
                            <label htmlFor="password" className="grid text-[#041631] dark:text-white text-start text-[18px] font-sans font-semibold">
                                Your Password
                                <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your Password" className="w-[450px] py-3 px-4 rounded-xl border dark:bg-[#0D0D0D] dark:border-gray-800 border-zinc-300 outline-none max-[471px]:w-[350px]" type="password" required />
                            </label>
                            <div className="flex text-end justify-end">
                                <a href="/forget-password" className="flex text-[12px] text-[#526484] font-medium font-sans hover:underline ">Forgot password ?</a>
                            </div>
                            {
                                userLoading ? <Spinner /> :
                                    <div className="flex justify-center text-center">
                                        <button type="submit" className="px-4 py-2 rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl text-white font-bold text-[18px] w-[140px] ease-in duration-300">Login</button>
                                    </div>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;