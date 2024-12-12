"use client"
import { useState } from "react";
import Schools from "./components/Schools";
import EmptySchools from "./components/emptySchools";
import Cookies from "js-cookie"
import { useGetAllSchoolsQuery, useGetAllSchoolsWithSearchQuery } from "./api/manageSchool";
import Container from "@/components/Container";

const ManageSchool = () => {
    
    const token = Cookies.get('token') || "";
    
    const [currentPage, setCurrentPage] = useState(0);
    const [search, setSearch] = useState("");
    const { data, isError, isLoading } = useGetAllSchoolsQuery({ token, page: currentPage, search });

    const schools = data?.data?.content;

    const filteredData = schools?.filter((item: any) => 
        item.name.toLowerCase().includes(search.toLowerCase())
    );
    console.log('filterData', filteredData);

    const empty = data?.data?.emptyPage;
    return (
        <>
            <Container>
                
                {
                    empty || isError ?
                    <EmptySchools/>
                    :
                    <Schools data={filteredData} search={search} setSearch={setSearch} isLoading={isLoading} setCurrentPage={setCurrentPage}/>
                }
            </Container>
        </>
    )
}

export default ManageSchool;