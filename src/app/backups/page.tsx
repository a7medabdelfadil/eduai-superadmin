/* eslint-disable @next/next/no-img-element */
"use client"
import Cookies from "js-cookie"
import { useDeleteBackupMutation, useGetAllBackupsQuery, useGetBackupQuery, useRestoreBackupMutation } from "./api/backupsApis";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { Button, Modal } from "flowbite-react";
import Container from "@/components/Container";

const BackUp = () => {

    const token = Cookies.get('token') || "";
    const [currentPage, setCurrentPage] = useState(0)
    const [search, setSearch] = useState("")
    const [openModal, setOpenModal] = useState(false);
    const [openModalRestore, setOpenModalRestore] = useState(false);
    const [openModalDetails, setOpenModalDetails] = useState(false);
    const [selectedbackupId, setSelectedbackupId] = useState<number | null>(null);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [selectedIdRestore, setSelectedIdRestore] = useState<number | null>(null);

    const { data: backups, isSuccess } = useGetAllBackupsQuery({ token, page: currentPage, search })
    console.log(backups)
    const [deleteBackup] = useDeleteBackupMutation()
    const [restoreBackup] = useRestoreBackupMutation()
    const { data: backup, isSuccess: successBackup } = useGetBackupQuery({ token, id: selectedId }, { skip: selectedId === null })
    
    const handlePageClick = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
    };

    const HandleView = (id: number) => {
        setOpenModalDetails(true)
        setSelectedId(id)
    }
    const handleDeleteClick = (id: number) => {
        setSelectedbackupId(id);
        setOpenModal(true);
    };
    const handleRestoreClick = (id: number) => {
        setSelectedIdRestore(id);
        setOpenModalRestore(true);
    };

    const handleDelete = async () => {
        if (selectedbackupId !== null) {
            try {
                const result = await deleteBackup({ token, id: selectedbackupId }).unwrap();

                toast.success(result.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } catch (error) {
                toast.error("Something went wrong please try again later", {
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

            setOpenModal(false);
        }
    };

    const handleRestore = async () => {
        if (selectedIdRestore !== null) {
            try {
                const result = await restoreBackup({ token, id: selectedIdRestore }).unwrap();
                toast.success(result.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } catch (error) {
                toast.error("Something went wrong please try again later", {
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

            setOpenModalRestore(false);
        }
    };

    const downloadFile = async (filename: string) => {
        try {
          const response = await fetch(backup.data.downloadUrl, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          if (!response.ok) {
            throw new Error("Failed to download file. Authentication is required.");
          }
      
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
      
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${filename}.ext`);
          document.body.appendChild(link);
          link.click();
        //   link.parentNode.removeChild(link);
        } catch (error) {
          toast.error("Failed to download file.");
        }
      };
      

    return (

        isSuccess && backups.data?.content.length > 0 ? (
            <>
                <Container className="md:px-2 relative mt-10 overflow-x-auto bg-transparent sm:rounded-lg max-[1200px]:w-screen h-screen">
                    <h1 className="font-bold text-[28px] mb-3 font-sans text-[#041631] dark:text-white">Backups</h1>

                    <div className="flex justify-between max-[502px]:grid max-[502px]:justify-center text-center">
                        <div className="my-3">
                            <label htmlFor="icon" className="sr-only">Search</label>
                            <div className="relative min-w-72 md:min-w-80">
                                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                                    <svg className="flex-shrink-0 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                                </div>
                                <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" id="icon" name="icon" className="py-2  outline-none border-2 px-4 ps-11 block w-full border-gray-200 dark:bg-[#0D0D0D] dark:text-white dark:border-gray-800 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Search" />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Link href="backups/add-new-backup" className="px-4 py-2 whitespace-nowrap rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl mb-5 mr-3 text-white text-[18px] ease-in font-semibold duration-300">+ Add new backup</Link>
                        </div>
                    </div>
                    <div className="overflow-auto relative shadow-md sm:rounded-lg">
                        <table className="w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-500 ">
                            <thead className="text-xs text-gray-700 uppercase bg-[#daeafb] dark:bg-[#06203C] dark:text-white">
                                <tr>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                        Mode
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                        Size
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                        Extension
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                        Created date
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {backups?.data?.content?.map((item: any) => (
                                    <tr key={item.id} className="bg-white border-b card hover:bg-gray-50">

                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  dark:text-white">
                                            {item.name}
                                        </th>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {item.mode}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {item.size}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {item.extension}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {new Date(item?.createdDate).toISOString().split('T')[0]}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap flex">
                                            <button onClick={() => HandleView(item.id)} className="font-medium me-2 text-blue-600 hover:underline " >
                                                <svg
                                                    width="30"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="fill-current text-black dark:text-white"
                                                >
                                                    <g clipPath="url(#clip0_2844_3402)">
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M4 12.001V12C4.003 11.984 4.017 11.896 4.095 11.723C4.181 11.532 4.32 11.292 4.519 11.015C4.917 10.462 5.512 9.823 6.264 9.217C7.777 7.996 9.812 7 12 7C14.188 7 16.223 7.996 17.736 9.216C18.488 9.822 19.083 10.461 19.481 11.014C19.681 11.291 19.819 11.531 19.905 11.722C19.983 11.895 19.997 11.983 20 11.999V12C19.997 12.016 19.983 12.104 19.905 12.277C19.819 12.468 19.68 12.708 19.481 12.985C19.083 13.538 18.488 14.177 17.736 14.783C16.224 16.004 14.189 17 12 17C9.812 17 7.777 16.004 6.264 14.784C5.512 14.178 4.917 13.539 4.519 12.986C4.35491 12.7644 4.2129 12.5273 4.095 12.278C4.05129 12.1902 4.01935 12.0971 4 12.001ZM12 5C9.217 5 6.752 6.254 5.009 7.659C4.132 8.365 3.409 9.133 2.896 9.846C2.639 10.202 2.425 10.559 2.271 10.901C2.123 11.23 2 11.611 2 12C2 12.388 2.123 12.771 2.27 13.099C2.425 13.441 2.64 13.799 2.896 14.154C3.409 14.867 4.132 15.634 5.009 16.341C6.752 17.746 9.217 19 12 19C14.783 19 17.248 17.746 18.991 16.341C19.868 15.635 20.591 14.867 21.104 14.154C21.361 13.798 21.575 13.441 21.729 13.099C21.877 12.771 22 12.389 22 12C22 11.612 21.877 11.229 21.73 10.901C21.5567 10.5295 21.347 10.1761 21.104 9.846C20.591 9.133 19.868 8.366 18.991 7.659C17.248 6.254 14.783 5 12 5ZM11 12C11 11.7348 11.1054 11.4804 11.2929 11.2929C11.4804 11.1054 11.7348 11 12 11C12.2652 11 12.5196 11.1054 12.7071 11.2929C12.8946 11.4804 13 11.7348 13 12C13 12.2652 12.8946 12.5196 12.7071 12.7071C12.5196 12.8946 12.2652 13 12 13C11.7348 13 11.4804 12.8946 11.2929 12.7071C11.1054 12.5196 11 12.2652 11 12ZM12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9Z"
                                                        />
                                                    </g>
                                                </svg>
                                            </button>

                                            <button className="me-3" onClick={() => handleDeleteClick(item.id)}>
                                                <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M11.28 5.80189e-08C11.6998 0.00010886 12.1088 0.132286 12.4493 0.377808C12.7898 0.62333 13.0444 0.96975 13.177 1.368L13.72 3H17C17.2652 3 17.5196 3.10536 17.7071 3.29289C17.8946 3.48043 18 3.73478 18 4C18 4.26522 17.8946 4.51957 17.7071 4.70711C17.5196 4.89464 17.2652 5 17 5L16.997 5.071L16.13 17.214C16.0759 17.9706 15.7372 18.6786 15.182 19.1956C14.6269 19.7125 13.8965 19.9999 13.138 20H4.862C4.10346 19.9999 3.37311 19.7125 2.81797 19.1956C2.26283 18.6786 1.92411 17.9706 1.87 17.214L1.003 5.07C1.00119 5.04671 1.00019 5.02336 1 5C0.734784 5 0.48043 4.89464 0.292893 4.70711C0.105357 4.51957 0 4.26522 0 4C0 3.73478 0.105357 3.48043 0.292893 3.29289C0.48043 3.10536 0.734784 3 1 3H4.28L4.823 1.368C4.9557 0.969588 5.21043 0.623052 5.5511 0.377515C5.89176 0.131978 6.30107 -0.000101061 6.721 5.80189e-08H11.28ZM6 8C5.75507 8.00003 5.51866 8.08996 5.33563 8.25272C5.15259 8.41547 5.03566 8.63975 5.007 8.883L5 9V15C5.00028 15.2549 5.09788 15.5 5.27285 15.6854C5.44782 15.8707 5.68695 15.9822 5.94139 15.9972C6.19584 16.0121 6.44638 15.9293 6.64183 15.7657C6.83729 15.6021 6.9629 15.3701 6.993 15.117L7 15V9C7 8.73478 6.89464 8.48043 6.70711 8.29289C6.51957 8.10536 6.26522 8 6 8ZM12 8C11.7348 8 11.4804 8.10536 11.2929 8.29289C11.1054 8.48043 11 8.73478 11 9V15C11 15.2652 11.1054 15.5196 11.2929 15.7071C11.4804 15.8946 11.7348 16 12 16C12.2652 16 12.5196 15.8946 12.7071 15.7071C12.8946 15.5196 13 15.2652 13 15V9C13 8.73478 12.8946 8.48043 12.7071 8.29289C12.5196 8.10536 12.2652 8 12 8ZM11.28 2H6.72L6.387 3H11.613L11.28 2Z" fill="#E85347" />
                                                </svg>
                                            </button>
                                            <button className="underline text-blue-500" onClick={() => handleRestoreClick(item.id)}>
                                                Restore
                                            </button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {backups?.data?.totalElementsCount > 10 && (
                        <ReactPaginate
                            forcePage={currentPage}
                            breakLabel="..."
                            nextLabel=" >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={backups?.data?.totalPagesCount}
                            previousLabel="< "
                            renderOnZeroPageCount={null}
                            containerClassName="pagination"
                            activeClassName="active"
                        />
                    )}


                </Container>

                {successBackup && (
                    <Modal show={openModalDetails} size="md" onClose={() => setOpenModalDetails(false)} popup>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="text-start">
                                <h3 className="mb-5 text-xl font-normal text-gray-500 dark:text-gray-400">
                                    Name : {backup.data.name}
                                </h3>
                                <p className="mb-5">Mode : {backup.data.mode}</p>
                                <p className="mb-5">Created Date : {new Date(backup.data.createdDate).toISOString().split('T')[0]}</p>
                                <p className="mb-5">Size : {backup.data.size}</p>
                                <div className="grid md:grid-cols-2 mb-5">

                                    <Button color="blue" onClick={() => downloadFile(backup.data.name)}>Download</Button>

                                </div>
                                <div className="flex justify-center gap-4">
                                    <Button color="gray" onClick={() => setOpenModalDetails(false)}>
                                        Exit
                                    </Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                )}


                <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Are you sure you want to delete this backup?
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button color="failure" onClick={handleDelete}>
                                    {"Yes, I'm sure"}
                                </Button>
                                <Button color="gray" onClick={() => setOpenModal(false)}>
                                    No, cancel
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

                <Modal show={openModalRestore} size="md" onClose={() => setOpenModalRestore(false)} popup>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Are you sure you want to restore this backup?
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button color="failure" onClick={handleRestore}>
                                    {"Yes, I'm sure"}
                                </Button>
                                <Button color="gray" onClick={() => setOpenModalRestore(false)}>
                                    No, cancel
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

            </>

        ) : (
            <div className='grid justify-center items-center text-center gap-5'>
                <div>
                    <img className='w-[350px]' src="/images/Empty.png" alt="#" />
                </div >
                <div>
                    <h1 className='font-bold text-[20px] font-sans text-[#041631] dark:text-white'>There is no backups</h1>
                    <p className="text-[#526484] font-sans text-[15px] font-semibold">You can add a backup by clicking on this button</p>
                </div>
                <div className='mt-3'>
                    <Link href="/backups/add-new-backup" className="px-4 py-2.5 rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl text-white font-bold text-[18px] w-[200px] ease-in duration-300">Add new backup</Link>
                </div>
            </div >
        )


    );
}

export default BackUp;