/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import usaLogo from "../../public/images/usa.png"
import arabicFlag from "../../public/images/arabicFlag.png"
import frenchLogo from "../../public/images/Flag-France.webp"
import { Dropdown, ToggleSwitch } from "flowbite-react";
import Cookies from "js-cookie"
import { StaticImageData } from 'next/image';
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setThemeRedux } from "@/app/GlobalRedux/ThemeSlice";
import { useGetProfileQuery } from "./api/profileApi";
import { RootState } from "@/app/GlobalRedux/store";
import { login, logout } from "@/app/GlobalRedux/AuthSlice";
import { closeSideBar, openSideBar } from "@/app/GlobalRedux/SidebarSlice";

const NavBar = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const isSideBarOpen = useSelector((state: RootState) => state.sidebar.isSideBarOpen);
  console.log('isSideBarOpen: ', isSideBarOpen);

  const token = Cookies.get('token') || ""
  const [pathname, setPathname] = useState('');
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [small, setSmall] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState(false);
  const languageFromCookies = Cookies.get('lang') || "";
  const [lang, setLang] = useState(languageFromCookies && languageFromCookies !== "" ? languageFromCookies : "english")
  const [langFlag, setLangFlag] = useState<StaticImageData | undefined>(undefined);

  const router = useRouter()

  const { data: profileData } = useGetProfileQuery(token)

  useEffect(() => {
    if (!languageFromCookies || languageFromCookies === "") {
      Cookies.set("lang", "english");
      setLang("english");
    } else {
      setLang(languageFromCookies);
    }
  }, []);

  useEffect(() => {
    if (lang === "english") {
      setLangFlag(usaLogo)
    } else if (lang === "arabic") {
      setLangFlag(arabicFlag)
    } else {
      setLangFlag(frenchLogo)
    }
    if (lang) {
      Cookies.set("lang", lang);
    }
    router.refresh()
  }, [lang, router])


  const toggleProfile = () => {
    setProfile(!profile)
  }

  const toggleNavbarSmall = () => {
    setSmall(!small)
    if (isSideBarOpen) {
      dispatch(closeSideBar()) 
    } else {
      dispatch(openSideBar());
    }
  }

  useEffect(() => {
    setPathname(window.location.pathname);

  }, [pathname]);

  useEffect(() => {
    if (pathname === '/login' || pathname === '/forget-password' || pathname === '/reset-password' || pathname === '/otp') {
      dispatch(logout());  
    } else {
      dispatch(login());     
    }
  }, [pathname]);


  const OpenSideBar = () => {
    setIsOpen(!isOpen)
    dispatch(openSideBar());  
  }

  const useWindowDimensions = () => {
    const isClient = typeof window === 'object'; // Ensure code runs only in the client-side environment
    const [windowSize, setWindowSize] = useState(isClient ? { width: window.innerWidth, height: window.innerHeight } : { width: undefined, height: undefined });

    useEffect(() => {
      if (!isClient) {
        return;
      }

      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };

      window.addEventListener('resize', handleResize);
      handleResize(); // Set initial dimensions

      return () => window.removeEventListener('resize', handleResize);
    }, [isClient]);

    return windowSize;
  };

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width !== undefined && width >= 1023) {
      setIsOpen(true);
    }
  }, [width]);

  const [dark, setDark] = useState(false);

  const handleDark = () => {
    if (dark) {
      setDark(false)
      Cookies.set("mode", "light")
      dispatch(setThemeRedux(false))
    } else {
      setDark(true)
      Cookies.set("mode", "dark")
      dispatch(setThemeRedux(true))
    }
    router.refresh()
  }

  const handleLogout = () => {
    Cookies.remove("token")
    toggleProfile()
    router.push("/login")
    dispatch(logout());
  }

  const mode = Cookies.get("mode")

  useEffect(() => {
    if (mode === "light") {
      setDark(false)
      dispatch(setThemeRedux(false))
    } else {
      setDark(true)
      dispatch(setThemeRedux(true))
    }
  }, [])


  const links = [
    {
      id: 1,
      name: 'Dashboard',
      icon: (
        <svg
          className="h-6 w-6 font-bold font-sans text-[#526484] group-hover:text-[#3e5af0]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
          />
        </svg>
      ),
      href: '/',
    },
    {
      id: 2,
      name: 'Manage School',
      icon: (
        <svg
          className="h-6 w-6 font-bold font-sans text-[#526484] group-hover:text-[#3e5af0]"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <line x1="3" y1="21" x2="21" y2="21" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <polyline points="5 6 12 3 19 6" />
          <line x1="4" y1="10" x2="4" y2="21" />
          <line x1="20" y1="10" x2="20" y2="21" />
          <line x1="8" y1="14" x2="8" y2="17" />
          <line x1="12" y1="14" x2="12" y2="17" />
          <line x1="16" y1="14" x2="16" y2="17" />
        </svg>
      ),
      href: '/manage-school',
    },
    {
      id: 3,
      name: 'School Plans',
      icon: (
        <svg
          className="h-6 w-6 font-bold font-sans text-[#526484] group-hover:text-[#3e5af0]"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <line x1="3" y1="21" x2="21" y2="21" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <polyline points="5 6 12 3 19 6" />
          <line x1="4" y1="10" x2="4" y2="21" />
          <line x1="20" y1="10" x2="20" y2="21" />
          <line x1="8" y1="14" x2="8" y2="17" />
          <line x1="12" y1="14" x2="12" y2="17" />
          <line x1="16" y1="14" x2="16" y2="17" />
        </svg>
      ),
      href: '/school-plans',
    },
    {
      id: 4,
      name: 'Education System',
      icon: (
        <svg stroke="currentColor" className="h-6 w-6  font-bold font-sans text-[#526484] group-hover:text-[#3e5af0]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <g clipPath="url(#clip0_8345_44606)">
            <path fillRule="evenodd" clipRule="evenodd" d="M11.063 2.46913C11.309 2.27238 11.6108 2.15809 11.9254 2.14247C12.2401 2.12685 12.5517 2.2107 12.816 2.38213L12.937 2.46913L17.249 5.91913C17.4594 6.08728 17.6336 6.29618 17.7613 6.53332C17.889 6.77045 17.9675 7.03093 17.992 7.29913L18 7.48013V10.0001H20C20.5046 9.99997 20.9906 10.1905 21.3605 10.5336C21.7305 10.8767 21.9572 11.347 21.995 11.8501L22 12.0001V19.9001C22.0001 20.1712 21.9002 20.4328 21.7193 20.6346C21.5385 20.8365 21.2894 20.9646 21.02 20.9941L20.9 21.0001H3.1C2.82894 21.0003 2.56738 20.9003 2.36548 20.7195C2.16358 20.5386 2.03557 20.2896 2.006 20.0201L2 19.9001V12.0001C1.99984 11.4956 2.19041 11.0096 2.5335 10.6396C2.87659 10.2696 3.34684 10.043 3.85 10.0051L4 10.0001H6V7.48013C5.99998 7.21081 6.05436 6.94427 6.15987 6.69648C6.26537 6.44869 6.41984 6.22476 6.614 6.03813L6.751 5.91813L11.063 2.46913ZM12 4.28013L8 7.48013V19.0001H16V7.48013L12 4.28013ZM20 12.0001H18V19.0001H20V12.0001ZM6 12.0001H4V19.0001H6V12.0001ZM12 8.00013C12.394 8.00013 12.7841 8.07772 13.1481 8.22849C13.512 8.37925 13.8427 8.60023 14.1213 8.87881C14.3999 9.15738 14.6209 9.4881 14.7716 9.85208C14.9224 10.2161 15 10.6062 15 11.0001C15 11.3941 14.9224 11.7842 14.7716 12.1482C14.6209 12.5122 14.3999 12.8429 14.1213 13.1214C13.8427 13.4 13.512 13.621 13.1481 13.7718C12.7841 13.9225 12.394 14.0001 12 14.0001C11.2044 14.0001 10.4413 13.6841 9.87868 13.1214C9.31607 12.5588 9 11.7958 9 11.0001C9 10.2045 9.31607 9.44142 9.87868 8.87881C10.4413 8.3162 11.2044 8.00013 12 8.00013ZM12 10.0001C11.7348 10.0001 11.4804 10.1055 11.2929 10.293C11.1054 10.4806 11 10.7349 11 11.0001C11 11.2653 11.1054 11.5197 11.2929 11.7072C11.4804 11.8948 11.7348 12.0001 12 12.0001C12.2652 12.0001 12.5196 11.8948 12.7071 11.7072C12.8946 11.5197 13 11.2653 13 11.0001C13 10.7349 12.8946 10.4806 12.7071 10.293C12.5196 10.1055 12.2652 10.0001 12 10.0001Z" fill="#09244B" />
          </g>
        </svg>
      ),
      href: '/education-system',
    },
    {
      id: 5,
      name: 'Backups',
      icon: (
        <svg className="h-6 w-6  font-bold font-sans text-[#526484] group-hover:text-[#3e5af0]" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />  <polyline points="9 15 12 12 15 15" />  <line x1="12" y1="12" x2="12" y2="21" /></svg>

      ),
      href: '/backups',
    },
    {
      id: 6,
      name: 'Updates',
      icon: (
        <svg className="h-6 w-6  font-bold font-sans text-[#526484] group-hover:text-[#3e5af0]" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <polyline points="12 4 4 8 12 12 20 8 12 4" />  <polyline points="4 12 12 16 20 12" />  <polyline points="4 16 12 20 20 16" /></svg>

      ),
      href: '/updates',
    },
    {
      id: 7,
      name: 'Feedback',
      icon: (
        <svg className="h-6 w-6  font-bold font-sans text-[#526484] group-hover:text-[#3e5af0]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
      ),
      href: '/feedback',
    },
    {
      id: 8,
      name: 'Resource Management',
      icon: (
        <svg
          className="h-6 w-6  text-[#526484] group-hover:text-[#3e5af0] transition-colors duration-300"
          viewBox="0 0 16 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.528 0.118046C8.68767 0.0326087 8.86754 -0.00786694 9.04842 0.000939111C9.22929 0.00974516 9.40439 0.0675023 9.555 0.168046L15.109 3.87105C15.383 4.05363 15.6077 4.30104 15.7631 4.59132C15.9186 4.8816 15.9999 5.20577 16 5.53505V16C16 16.1811 15.9509 16.3587 15.8579 16.5141C15.7648 16.6694 15.6314 16.7965 15.4718 16.8819C15.3121 16.9673 15.1323 17.0078 14.9515 16.999C14.7707 16.9902 14.5956 16.9325 14.445 16.832L12 15.202V18C12 18.1811 11.9509 18.3587 11.8579 18.5141C11.7648 18.6694 11.6314 18.7965 11.4718 18.8819C11.3121 18.9673 11.1323 19.0078 10.9515 18.999C10.7707 18.9902 10.5956 18.9325 10.445 18.832L8 17.202V20C8.00003 20.1811 7.95091 20.3587 7.85787 20.5141C7.76484 20.6694 7.6314 20.7965 7.47177 20.8819C7.31214 20.9673 7.13231 21.0078 6.95148 20.999C6.77065 20.9902 6.5956 20.9325 6.445 20.832L0.891 17.13C0.616842 16.9474 0.392055 16.6998 0.236615 16.4093C0.0811753 16.1189 -0.000104084 15.7945 1.00032e-07 15.465V5.00005C-2.69949e-05 4.819 0.0490951 4.64135 0.142126 4.48604C0.235156 4.33072 0.368605 4.20358 0.528235 4.11817C0.687865 4.03276 0.867687 3.99229 1.04852 4.00107C1.22935 4.00986 1.4044 4.06757 1.555 4.16805L4 5.79805V3.00005C3.99997 2.819 4.04909 2.64135 4.14213 2.48604C4.23516 2.33072 4.3686 2.20358 4.52823 2.11817C4.68786 2.03276 4.86769 1.99229 5.04852 2.00107C5.22935 2.00986 5.4044 2.06757 5.555 2.16805L8 3.79805V1.00005C7.99993 0.819005 8.049 0.641341 8.14199 0.486007C8.23498 0.330673 8.36839 0.203497 8.528 0.118046ZM10 5.13105L11.11 5.87105C11.3838 6.05374 11.6083 6.30121 11.7636 6.59148C11.9188 6.88175 12 7.20586 12 7.53505V12.798L14 14.132V5.53505L10 2.87005V5.13105ZM6 7.13104L7.11 7.87105C7.38383 8.05374 7.60834 8.30121 7.76359 8.59148C7.91884 8.88175 8.00005 9.20586 8 9.53505V14.798L10 16.131V7.53505L6 4.87005V7.13104ZM2 6.87005V15.466L6 18.132V9.53605L2 6.87005Z"
            fill="currentColor"
          />
        </svg>
      ),
      href: '/resource-management',
    },
    {
      id: 9,
      name: 'Curriculum Management',
      icon: (
        <svg className="text-[#526484] group-hover:text-[#3e5af0] h-6 w-6 " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_2819_1715)">
            <path d="M19 2C19.5304 2 20.0391 2.21071 20.4142 2.58579C20.7893 2.96086 21 3.46957 21 4V16C21 16.5304 20.7893 17.0391 20.4142 17.4142C20.0391 17.7893 19.5304 18 19 18H17V20C17 20.5304 16.7893 21.0391 16.4142 21.4142C16.0391 21.7893 15.5304 22 15 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H7V4C7 3.46957 7.21071 2.96086 7.58579 2.58579C7.96086 2.21071 8.46957 2 9 2H19ZM10 15H8C7.74512 15.0003 7.49997 15.0979 7.31463 15.2728C7.1293 15.4478 7.01777 15.687 7.00283 15.9414C6.98789 16.1958 7.07067 16.4464 7.23426 16.6418C7.39786 16.8373 7.6299 16.9629 7.883 16.993L8 17H10C10.2549 16.9997 10.5 16.9021 10.6854 16.7272C10.8707 16.5522 10.9822 16.313 10.9972 16.0586C11.0121 15.8042 10.9293 15.5536 10.7657 15.3582C10.6021 15.1627 10.3701 15.0371 10.117 15.007L10 15ZM19 4H9V6H15C15.5304 6 16.0391 6.21071 16.4142 6.58579C16.7893 6.96086 17 7.46957 17 8V16H19V4ZM12 11H8C7.73478 11 7.48043 11.1054 7.29289 11.2929C7.10536 11.4804 7 11.7348 7 12C7 12.2652 7.10536 12.5196 7.29289 12.7071C7.48043 12.8946 7.73478 13 8 13H12C12.2652 13 12.5196 12.8946 12.7071 12.7071C12.8946 12.5196 13 12.2652 13 12C13 11.7348 12.8946 11.4804 12.7071 11.2929C12.5196 11.1054 12.2652 11 12 11Z" fill="currentColor" />
          </g>
          <defs>
            <clipPath id="clip0_2819_1715">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
      href: '/curriculum-management',
    },
  ];


  return (
    <>

      <header>
        {isLoggedIn ? (

          <div>
            <header className="sticky card top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-[48] w-full bg-white border-b dark:border-b-[#171C23] text-sm py-2.5 sm:py-4 lg:ps-64">
              <nav className="flex basis-full items-center w-full mx-auto px-4 sm:px-6" aria-label="Global">
                <div className="me-5 lg:me-0 lg:hidden">
                  <a className="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80" href="../templates/admin/index.html" aria-label="Preline">
                    <img src="/images/logo.png" alt="#" />
                  </a>
                </div>

                <div className="w-full flex items-center justify-end ms-auto sm:justify-between sm:gap-x-3 sm:order-3">
                  <div className="sm:hidden">
                    <button type="button" className="w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-500 disabled:opacity-50 disabled:pointer-events-none">
                      <svg className="flex-shrink-0 size-4 dark:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                    </button>
                  </div>

                  <div className="hidden sm:block">
                    <label htmlFor="icon" className="sr-only">Search</label>
                    <div className="relative min-w-72 md:min-w-80">
                      <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                        <svg className="flex-shrink-0 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                      </div>
                      <input type="text" id="icon" name="icon" className="py-2 dark:bg-[#0D0D0D] dark:border-gray-800  outline-none border-2 px-4 ps-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Search" />
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-end gap-2 ">

                    <ToggleSwitch className="me-2" checked={dark} onChange={handleDark} />
                    <Dropdown
                      label={
                        langFlag && (
                          <Image src={langFlag} width={24} height={24} alt="langIcon" />
                        )
                      }
                      size="sm"
                      className="p-1 langDropDown shadow-none flex items-center"
                      inline={true}
                      arrowIcon={false}
                    >
                      <Dropdown.Item onClick={() => setLang("english")}><Image src={usaLogo} width={20} height={20} alt="langIcon" /><span className="ms-2 font-semibold">English</span></Dropdown.Item>
                      <Dropdown.Item onClick={() => setLang("arabic")}><Image src={arabicFlag} width={20} height={20} alt="langIcon" /><span className="ms-2 font-semibold">Arabic</span></Dropdown.Item>
                      <Dropdown.Item onClick={() => setLang("french")}><Image src={frenchLogo} width={20} height={20} alt="langIcon" /><span className="ms-2 font-semibold">French</span></Dropdown.Item>
                    </Dropdown>
                    <button onClick={() => {
                      router.push('/notifies')
                    }} type="button" className="w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 dark:hover:bg-gray-500 disabled:opacity-50 disabled:pointer-events-none">
                      <svg className="flex-shrink-0 size-4 dark:text-white " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
                    </button>
                    <div className="hs-dropdown [--placement:bottom-right] relative inline-flex ">
                      <button onClick={toggleProfile} id="hs-dropdown-with-header" type="button" className="w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
                        <img className="inline-block size-[38px] rounded-full" src="/images/me.png" alt="Image Description" />
                      </button>
                      {
                        profile && (
                          <div className="hs-dropdown-menu bg-white card transition-[opacity,margin] hs-dropdown-open:opacity-100 fixed  right-[40px] top-[80px] min-w-60  shadow-md rounded-lg p-2" aria-labelledby="hs-dropdown-with-header">
                            <div className="py-3 px-5 -m-2  rounded-t-lg">
                              <p className="text-sm text-gray-500 dark:text-gray-400">Signed in as</p>
                              <p className="text-sm font-medium text-gray-800 dark:text-white">{profileData.data.email}</p>
                            </div>
                            <div className="mt-2 py-2 first:pt-0 last:pb-0">
                              <button onClick={handleLogout} className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-500 focus:ring-2 focus:ring-blue-500" >
                                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                Sign out
                              </button>
                            </div>
                          </div>
                        )
                      }
                    </div>
                  </div>
                </div>
              </nav>
            </header>
            <div className="sticky top-0 inset-x-0 z-20 bg-white card  border-y px-4 sm:px-6 md:px-8 lg:hidden dark:border-gray-900 ">
              <div className="flex justify-between items-center py-2">
                <ol className="ms-3 flex items-center whitespace-nowrap">
                  <li className="flex items-center text-sm text-gray-800 dark:text-white">
                    Application Layout
                    <svg className="flex-shrink-0 mx-3 overflow-visible size-2.5 text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </li>
                  <li className="text-sm font-semibold text-gray-800 dark:text-white truncate" aria-current="page">
                    {pathname.slice(1).toUpperCase()}
                  </li>
                </ol>
                <button onClick={OpenSideBar} type="button" className="py-2 px-3 flex justify-center items-center gap-x-1.5 text-xs rounded-lg   text-gray-500 hover:text-gray-600" data-hs-overlay="#application-sidebar" aria-controls="application-sidebar" aria-label="Sidebar">
                  <svg className="flex-shrink-0 size-4 dark:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8L21 12L17 16M3 12H13M3 6H13M3 18H13" /></svg>
                  <span className="sr-only">Sidebar</span>
                </button>
              </div>
            </div>
            {
              (
                isOpen &&
                <div id="application-sidebar" className={`hs-overlay [--auto-close:lg]  hs-overlay-open:translate-x-0 transition-all duration-300 transform ${small ? 'w-[90px]' : 'w-[260px]'} lg:drop-shadow-none drop-shadow-2xl ${!isOpen ? 'w-0 ' : ''} fixed ease-in duration-300 inset-y-0 start-0 z-[60] bg-white border-e dark:border-[#171C23] lg:block card  lg:translate-x-0 lg:end-auto lg:bottom-0 `}>
                  <div className="px-8 pt-4 ">
                    {
                      small ? (
                        <img className="scale-[2] mt-5" src="/images/small logo.png" alt="Logo" />
                      ) : (
                        <img className="w-[150px] -translate-x-7" src="/images/logo.png" alt="Logo" />
                      )
                    }
                  </div>
                  <div className="flex justify-end mr-5 -translate-y-6">
                    {
                      !small && (
                        <button onClick={toggleNavbarSmall}>
                          <img className="scale-[1.4] " src="/images/nav.png" alt="Logo" />
                        </button>
                      )
                    }
                  </div>
                  <nav className={`hs-accordion-group  py-6 px-2 w-full flex flex-col flex-wrap ${!isOpen ? 'hidden ' : ''} `} data-hs-accordion-always-open>
                    <ul className={`space-y-1.5 flex flex-col ${small && "items-center mt-5"} `}>
                      <div className={`flex justify-center`}>
                        {
                          small && (
                            <button onClick={toggleNavbarSmall}>
                              <img src="/images/arrow.png" alt="Logo" />
                            </button>
                          )
                        }
                      </div>

                      {links.map((link) => (
                        <li key={link.id}>
                          <Link
                            href={link.href}
                            className={`flex items-center gap-x-3.5 py-2 mt-4 px-2.5  font-bold text-md font-sans text-[#526484] group rounded-lg hover:bg-gray-100 hover:text-[#3e5af0]`}
                          >
                            {link.icon}
                            {!small && <span className="text-nowrap">{link.name}</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>)
            }
          </div>
        ) : (
          <div></div>
        )}
      </header>
    </>
  );
};

export default NavBar;
