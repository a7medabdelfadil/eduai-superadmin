/* eslint-disable @next/next/no-img-element */
"use client"
import Spinner from '@/components/spinner';
import Link from "next/link";
import React from 'react';
import ReactPaginate from 'react-paginate';

interface Props {
    data: any;
    search: string;
    setSearch: (search: string) => void;
    isLoading: boolean;
    setCurrentPage: (page: number) => void
}

const Schools: React.FC<Props> = ({ data, search, setSearch, isLoading, setCurrentPage }) => {
    const handlePageClick = (selectedPage: any) => {
        setCurrentPage(selectedPage.selected);
    };
    return (
        <>
            {
                isLoading ? (
                    <div className='mt-64'>
                        <Spinner />
                    </div>
                ) : (

                    <div className="relative md:px-2 mt-4 overflow-x-auto bg-transparent sm:rounded-lg max-[1200px]:w-screen h-screen">

                        <h1 className="font-bold text-[28px] mb-3 font-sans text-[#041631] dark:text-white">Manage School</h1>
                        <div className="flex justify-between max-[502px]:grid max-[502px]:justify-center text-center">

                            <div className="my-3">
                                <label htmlFor="icon" className="sr-only">Search</label>
                                <div className="relative min-w-72 md:min-w-80">
                                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                                        <svg className="flex-shrink-0 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                                    </div>
                                    <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" id="icon" name="icon" className="py-2 dark:bg-[#0D0D0D] dark:border-gray-800 outline-none border-2 px-4 ps-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Search" />
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <Link href="/add-new-school" className="px-4 py-2 whitespace-nowrap rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl mb-5 mr-3 text-white text-[18px] w-[180px] ease-in font-semibold duration-300">+ Add new school</Link>
                            </div>
                        </div>
                        <div className="overflow-auto relative shadow-md sm:rounded-lg">
                            <table className="w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-500 ">
                                <thead className="text-xs text-gray-700 uppercase bg-[#daeafb] dark:bg-[#06203C] dark:text-white">
                                    <tr>

                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            Name School
                                        </th>
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            Code
                                        </th>
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            Type
                                        </th>
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            Theme
                                        </th>
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            Work Start
                                        </th>
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            Work End
                                        </th>
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            Features
                                        </th>
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            Admin
                                        </th>
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.map((item: any, index: number) => (
                                        <tr key={index} className="bg-white card border-b  hover:bg-gray-50">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap ">
                                                {item.name}
                                            </th>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.code}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.type}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.theme}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.workDayStartTime}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.workDayEndTime}
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Link href={`manage-school/features/${item.id}`} className="font-medium text-blue-600 hover:underline">Feature</Link>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Link href={`/manage-school/admin/${item.id}`} className="font-medium text-blue-600 hover:underline">View</Link>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Link href={`/manage-school/edit-school/${item.id}`} className="font-medium text-blue-600 hover:underline">
                                                    <svg className=" dark:fill-white" width="56" height="24" viewBox="0 0 56 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M16.8617 4.48667L18.5492 2.79917C19.2814 2.06694 20.4686 2.06694 21.2008 2.79917C21.9331 3.53141 21.9331 4.71859 21.2008 5.45083L10.5822 16.0695C10.0535 16.5981 9.40144 16.9868 8.68489 17.2002L6 18L6.79978 15.3151C7.01323 14.5986 7.40185 13.9465 7.93052 13.4178L16.8617 4.48667ZM16.8617 4.48667L19.5 7.12499M18 14V18.75C18 19.9926 16.9926 21 15.75 21H5.25C4.00736 21 3 19.9926 3 18.75V8.24999C3 7.00735 4.00736 5.99999 5.25 5.99999H10" stroke="#040F0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M28.484 17V6.78H29.856V17H28.484ZM29.576 17V15.768H34.532V17H29.576ZM29.576 12.422V11.19H34.098V12.422H29.576ZM29.576 8.012V6.78H34.392V8.012H29.576ZM39.6405 17.252C39.1085 17.252 38.6185 17.154 38.1705 16.958C37.7225 16.762 37.3305 16.4867 36.9945 16.132C36.6678 15.7773 36.4111 15.3667 36.2245 14.9C36.0471 14.4333 35.9585 13.9293 35.9585 13.388V13.136C35.9585 12.604 36.0471 12.1047 36.2245 11.638C36.4018 11.1713 36.6491 10.7607 36.9665 10.406C37.2931 10.0513 37.6758 9.776 38.1145 9.58C38.5625 9.37467 39.0571 9.272 39.5985 9.272C40.1678 9.272 40.6858 9.39333 41.1525 9.636C41.6191 9.86933 42.0018 10.238 42.3005 10.742C42.5991 11.246 42.7671 11.8993 42.8045 12.702L42.2445 11.806V6.78H43.5885V17H42.5245V13.682H42.9165C42.8791 14.5313 42.7018 15.222 42.3845 15.754C42.0671 16.2767 41.6658 16.6593 41.1805 16.902C40.7045 17.1353 40.1911 17.252 39.6405 17.252ZM39.8225 16.076C40.2798 16.076 40.6951 15.9733 41.0685 15.768C41.4418 15.5627 41.7405 15.2687 41.9645 14.886C42.1885 14.494 42.3005 14.0367 42.3005 13.514V12.87C42.3005 12.3567 42.1838 11.9227 41.9505 11.568C41.7265 11.204 41.4231 10.9287 41.0405 10.742C40.6671 10.546 40.2565 10.448 39.8085 10.448C39.3138 10.448 38.8751 10.5647 38.4925 10.798C38.1191 11.0313 37.8251 11.358 37.6105 11.778C37.4051 12.198 37.3025 12.6927 37.3025 13.262C37.3025 13.8313 37.4098 14.3307 37.6245 14.76C37.8391 15.18 38.1378 15.5067 38.5205 15.74C38.9031 15.964 39.3371 16.076 39.8225 16.076ZM46.5348 17V9.524H47.8788V17H46.5348ZM45.3868 10.588V9.524H47.8788V10.588H45.3868ZM46.9128 8.32C46.6141 8.32 46.3901 8.24067 46.2408 8.082C46.1008 7.92333 46.0308 7.72267 46.0308 7.48C46.0308 7.23733 46.1008 7.03667 46.2408 6.878C46.3901 6.71933 46.6141 6.64 46.9128 6.64C47.2115 6.64 47.4308 6.71933 47.5708 6.878C47.7201 7.03667 47.7948 7.23733 47.7948 7.48C47.7948 7.72267 47.7201 7.92333 47.5708 8.082C47.4308 8.24067 47.2115 8.32 46.9128 8.32ZM53.3895 17.084C52.8295 17.084 52.3441 17.0047 51.9335 16.846C51.5321 16.6873 51.2195 16.4167 50.9955 16.034C50.7808 15.642 50.6735 15.1147 50.6735 14.452V7.256H51.9615V14.62C51.9615 15.0213 52.0688 15.334 52.2835 15.558C52.5075 15.7727 52.8201 15.88 53.2215 15.88H54.5375V17.084H53.3895ZM49.3855 10.532V9.524H54.5375V10.532H49.3855Z" fill="currentColor" />
                                                    </svg>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

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
                    </div>
                )
            }

        </>
    );
}

export default Schools;