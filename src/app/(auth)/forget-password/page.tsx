"use client"
/* eslint-disable @next/next/no-img-element */
import Spinner from "@/components/spinner";
import { useFindAccountMutation, useSelectEmailMutation } from "./api/findAccountSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { useSelector } from "react-redux";

const ForgetPassword = () => {
    const reduxTheme = useSelector((state: any) => state.theme.theme);

    const router = useRouter()

    const otpCookiesEmail = Cookies.get("emailOpt")
    const otpCookiesUser = Cookies.get("userOpt")
    const [value, setValue] = useState("")
    const [findAccount, { data, isSuccess, isLoading }] = useFindAccountMutation()
    const [selectEmail, { isSuccess: selectEmailSuccess }] = useSelectEmailMutation()

    const handleSend = async (e: any) => {
        e.preventDefault()
        findAccount(value)
        selectEmail({ userid: otpCookiesUser, email: otpCookiesEmail }).unwrap();
    };

    useEffect(() => {
        if (isSuccess && selectEmailSuccess) {
            if (data.success) {
                router.push("otp")
                Cookies.set("emailOpt", data.data.emails[0])
                Cookies.set("userOpt", data.data.userId)
            }
        }
    }, [isSuccess, selectEmailSuccess])


    return (
        <>
            <div className="grid grid-cols-2 justify-center items-center ease-in duration-300 max-[1040px]:grid-cols-1 h-screen">
                <div className="max-[1040px]:hidden">
                    {reduxTheme ? (
                        <img className="w-[800px] h-[920px]" src="images/forgotPasswordDark.png" alt="#" />
                    ) : (
                        <img className="w-[800px] h-[920px]" src="images/Forgot password.png" alt="#" />
                    )}
                </div>
                <div className="gird justify-center items-center text-center">
                    <div className="grid mb-10">
                        <h1 className="font-bold text-[28px] font-sans text-[#041631] dark:text-white">Forgot Password</h1>
                        <p className="text-[#526484] font-sans text-[20px] font-semibold">Enter your username or email to get OTP.</p>
                    </div>
                    <div className="grid justify-center items-center">
                        <form className="grid gap-10">
                            <label htmlFor="text" className="grid text-[#041631] dark:text-white text-start text-[18px] font-sans font-semibold">
                                username or email
                                <input onChange={(e) => setValue(e.target.value)} id="text" placeholder="Enter your username or email" className="w-[450px] py-3 px-4 rounded-xl border dark:bg-[#0D0D0D] dark:border-gray-800 border-zinc-300 outline-none max-[471px]:w-[350px]" type="text" required />
                            </label>

                            {
                                isLoading ? <Spinner /> :
                                    <div className="flex justify-center text-center">
                                        <button onClick={handleSend} type="submit" className="px-4 py-2 rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl text-white font-bold text-[18px] w-[170px] ease-in duration-300">Recovery code</button>
                                    </div>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForgetPassword;