"use client"
import { useEffect, useState } from "react";
import Cookies from "js-cookie"
import { useGetAllEducationSystemQuery } from "./api/manageSystems";
import Systems from "./components/Systems";
import EmptyEducations from "./components/emptySchools";
import Container from "@/components/Container";

const ManageSchool = () => {
    
    const token = Cookies.get('token') || "";
    
    const [search , setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(0);
    const { data , isError , isLoading, refetch } = useGetAllEducationSystemQuery({ token, page:currentPage, search })

    const empty = data?.data?.emptyPage 
    useEffect(() => {
        refetch()
    })
    

    return (
        <>
            <Container>
                {
                    empty || isError ?
                    <EmptyEducations/>
                    :
                    <Systems data={data} search={search} setSearch={setSearch} isLoading={isLoading} setCurrentPage={setCurrentPage}/>
                }
            </Container>
        </>
    )
}

export default ManageSchool;