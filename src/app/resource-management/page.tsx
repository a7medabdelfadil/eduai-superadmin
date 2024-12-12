"use client"
import { useState } from "react";
import { useGetAllCoursesQuery } from "./api/getCoursesSlice";
import Courses from "./components/Courses";
import EmptyCourses from "./components/EmptyCourses";
import Cookies from "js-cookie"
import Container from "@/components/Container";

const ResourseManagement = () => {

    const token = Cookies.get('token') || "";
    const [currentPage, setCurrentPage] = useState(0);
    const [search , setSearch] = useState("")

    const {data , isLoading } = useGetAllCoursesQuery({token , page:currentPage , search})
    console.log('courses:', data)

    return (
        <>
            <Container>
            {
                    data?.data?.empty ?
                    <EmptyCourses/>
                    :
                    <Courses search={search} setSearch={setSearch} isLoading={isLoading} setCurrentPage={setCurrentPage} data={data} />
                }
            </Container>
        </>
    )
}

export default ResourseManagement;