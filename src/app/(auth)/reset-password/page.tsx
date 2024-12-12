"use client"
/* eslint-disable @next/next/no-img-element */
import Spinner from "@/components/spinner";
import Cookies from 'js-cookie';
import { useResetPasswordMutation } from "./api/resetPassword";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const ResetPassword = () => {
    const reduxTheme = useSelector((state : any) => state.theme.theme);

    const router = useRouter()
    const emailCookies = Cookies.get("emailOpt")
    const codeCookies = Cookies.get("code")
    const [firstPassword, setFirstPassword] = useState("")
    const [secoundPassword, setSecoundPassword] = useState("")
    const [resetPassword, { data, isSuccess, isLoading }] = useResetPasswordMutation()

    const handleSend = async () => {
        let password = ''
        if (firstPassword === secoundPassword) {
            password = firstPassword
            resetPassword({ email: emailCookies, code: codeCookies, password }).unwrap()

        }
    }

    useEffect(() => {
        if (isSuccess) {
            Cookies.remove("emailOpt")
            Cookies.remove("userOpt")
            Cookies.remove("code")
            router.push("/")
        }

    }, [isSuccess, router])

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
                        <h1 className="font-bold text-[28px] font-sans text-[#041631] dark:text-white">Reset your password</h1>
                        <p className="text-[#526484] font-sans text-[20px] font-semibold">Enter new password</p>
                    </div>
                    <div className="grid justify-center items-center">
                        <div className="grid gap-10">
                            <label htmlFor="password" className="grid text-[#041631] dark:text-white text-start text-[18px] font-sans font-semibold">

                                New password
                                <input value={firstPassword} onChange={(e) => setFirstPassword(e.target.value)} id="password" placeholder="Enter you new password" className="w-[450px] py-3 px-4 rounded-xl border dark:bg-[#0D0D0D] dark:border-gray-800  border-zinc-300 outline-none max-[471px]:w-[350px]" type="password" required />
                            </label>
                            <label htmlFor="password1" className="grid text-[#041631] dark:text-white text-start text-[18px] font-sans font-semibold">
                                Confirm new password
                                <input value={secoundPassword} onChange={(e) => setSecoundPassword(e.target.value)} id="password1" placeholder="Confirm you new password" className="w-[450px] py-3 px-4 rounded-xl border dark:bg-[#0D0D0D] dark:border-gray-800  border-zinc-300 outline-none max-[471px]:w-[350px]" type="password" required />
                            </label>

                            {
                                isLoading ? <Spinner /> :
                                    <div className="flex justify-center text-center">
                                        <button onClick={handleSend} type="submit" className="px-4 py-2 rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl text-white font-bold text-[18px] w-[170px] ease-in duration-300">Reset password</button>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResetPassword;