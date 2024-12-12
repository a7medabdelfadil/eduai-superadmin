"use client"
import { useDeleteFeedbackMutation, useGetAllFeedbackQuery, useGetFeedbackQuery } from "./api/feedbackSlice";
import Cookies from 'js-cookie';
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Button, Modal } from "flowbite-react";
import Image from "next/image";
import { toast } from "react-toastify";
import Container from "@/components/Container";

const FeedBack = () => {

    const token = Cookies.get("token") || ""

    const [search, setSearch] = useState("")
    const [page, setCurrentPage] = useState(0)
    const [openModal, setOpenModal] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const { data, isSuccess } = useGetAllFeedbackQuery({ token, page, search })
    const { data: feedback, isSuccess: successFeedback } = useGetFeedbackQuery({ token, id: selectedId }, { skip: selectedId === null })

    const handlePageClick = (selectedPage: any) => {
        setCurrentPage(selectedPage.selected);
    };

    const HandleView = (id: number) => {
        setOpenModal(true)
        setSelectedId(id)
    }

    const [selectedFeedBackId, setSelectedFeedBackId] = useState<number | null>(null);

    const handleDeleteClick = (id: number) => {
        setSelectedFeedBackId(id);
        setOpenModalDelete(true);
    };

    const [deleteFeedback] = useDeleteFeedbackMutation()

    const handleDelete = () => {
        if (selectedFeedBackId !== null) {
            deleteFeedback({ token, id: selectedFeedBackId })
            toast.success("Feedback deleted successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setOpenModalDelete(false)
        }
    }

    return (
        <>
            <Container className="md:px-2 relative mt-5 overflow-x-auto bg-transparent sm:rounded-lg max-[1200px]:w-screen ">
                <h1 className="font-bold text-[28px] mb-3 font-sans text-[#041631] dark:text-white">Feedback</h1>

                <div className="flex justify-between max-[502px]:grid max-[502px]:justify-center text-center">
                    <div className="my-3">
                        <label htmlFor="icon" className="sr-only">Search</label>
                        <div className="relative min-w-72 md:min-w-80">
                            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                                <svg className="flex-shrink-0 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                            </div>
                            <input onChange={(e) => setSearch(e.target.value)} type="text" id="icon" name="icon" className="py-2 dark:bg-[#0D0D0D] dark:border-gray-800  outline-none border-2 px-4 ps-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Search" />
                        </div>
                    </div>
                </div>

                {isSuccess && (
                    <div className="overflow-auto relative shadow-md sm:rounded-lg">
                        <table className="w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-500 ">
                            <thead className="text-xs text-gray-700 uppercase bg-[#daeafb] ">
                                <tr className="dark:bg-[#06203C] dark:text-white">

                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                        Name School
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                        message
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                        subject
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.data.content.map((item: any) => (
                                    <tr key={item.id} className="bg-white border-b card hover:bg-gray-50 ">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap ">
                                            {item.schoolName}
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap ">
                                            {item.message}
                                        </th>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {item.subject}
                                        </td>
                                        <td className="px-6 py-4 flex items-center whitespace-nowrap">
                                            <button onClick={() => HandleView(item.id)} className="font-medium text-blue-600 hover:underline " >
                                                View
                                            </button>
                                            <button className="ms-3" onClick={() => handleDeleteClick(item.id)}>
                                                <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M11.28 5.80189e-08C11.6998 0.00010886 12.1088 0.132286 12.4493 0.377808C12.7898 0.62333 13.0444 0.96975 13.177 1.368L13.72 3H17C17.2652 3 17.5196 3.10536 17.7071 3.29289C17.8946 3.48043 18 3.73478 18 4C18 4.26522 17.8946 4.51957 17.7071 4.70711C17.5196 4.89464 17.2652 5 17 5L16.997 5.071L16.13 17.214C16.0759 17.9706 15.7372 18.6786 15.182 19.1956C14.6269 19.7125 13.8965 19.9999 13.138 20H4.862C4.10346 19.9999 3.37311 19.7125 2.81797 19.1956C2.26283 18.6786 1.92411 17.9706 1.87 17.214L1.003 5.07C1.00119 5.04671 1.00019 5.02336 1 5C0.734784 5 0.48043 4.89464 0.292893 4.70711C0.105357 4.51957 0 4.26522 0 4C0 3.73478 0.105357 3.48043 0.292893 3.29289C0.48043 3.10536 0.734784 3 1 3H4.28L4.823 1.368C4.9557 0.969588 5.21043 0.623052 5.5511 0.377515C5.89176 0.131978 6.30107 -0.000101061 6.721 5.80189e-08H11.28ZM6 8C5.75507 8.00003 5.51866 8.08996 5.33563 8.25272C5.15259 8.41547 5.03566 8.63975 5.007 8.883L5 9V15C5.00028 15.2549 5.09788 15.5 5.27285 15.6854C5.44782 15.8707 5.68695 15.9822 5.94139 15.9972C6.19584 16.0121 6.44638 15.9293 6.64183 15.7657C6.83729 15.6021 6.9629 15.3701 6.993 15.117L7 15V9C7 8.73478 6.89464 8.48043 6.70711 8.29289C6.51957 8.10536 6.26522 8 6 8ZM12 8C11.7348 8 11.4804 8.10536 11.2929 8.29289C11.1054 8.48043 11 8.73478 11 9V15C11 15.2652 11.1054 15.5196 11.2929 15.7071C11.4804 15.8946 11.7348 16 12 16C12.2652 16 12.5196 15.8946 12.7071 15.7071C12.8946 15.5196 13 15.2652 13 15V9C13 8.73478 12.8946 8.48043 12.7071 8.29289C12.5196 8.10536 12.2652 8 12 8ZM11.28 2H6.72L6.387 3H11.613L11.28 2Z" fill="#E85347" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}


                {data?.data?.totalElementsCount > 10 && (
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=" >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={data?.data?.totalPagesCount}
                        previousLabel="< "
                        renderOnZeroPageCount={null}
                        containerClassName="pagination"
                        activeClassName="active"
                    />
                )}

            
                {successFeedback && (
                    <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="text-start">
                                <h3 className="mb-5 text-xl font-normal text-gray-500 dark:text-gray-400">
                                    School name : {feedback.data.schoolName}
                                </h3>
                                <p className="mb-5">User name : {feedback.data.userName}</p>
                                <p className="mb-5">message : {feedback.data.message}</p>
                                <div className="grid md:grid-cols-2 mb-5">
                                    {feedback.data.attachments.map((item: any) => (
                                        <Image className="md:m-2 my-2 mx-auto" width={150} height={150} key={item.id} src={item.viewLink} alt="" />
                                    ))}
                                </div>
                                <div className="flex justify-center gap-4">
                                    <Button color="gray" onClick={() => setOpenModal(false)}>
                                        Exit
                                    </Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                )}


                <Modal show={openModalDelete} size="md" onClose={() => setOpenModalDelete(false)} popup>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Are you sure you want to delete this Feedback?
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button color="failure" onClick={handleDelete}>
                                    {"Yes, I'm sure"}
                                </Button>
                                <Button color="gray" onClick={() => setOpenModalDelete(false)}>
                                    No, cancel
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </Container>
        </>
    );
}

export default FeedBack;