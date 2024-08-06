'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import {ErrorToast, SuccessToast} from "@/utility/FormHelper";
import { useRouter } from "next/navigation";
import { DeleteAlert } from "@/utility/DeleteAlert";
import { AiOutlineLeft,AiOutlineRight } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import ReactPaginate from "react-paginate";
import {Fetcher} from "@/utility/Fetcher";
import useSWR from "swr";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
const ProductList = () => {
    const router = useRouter();
    let [searchKey, setSearchKey] = useState(0);
    let [searchInput, setSearchInput] = useState("");
    let [perPage, setPerPage] = useState(10);
    const [pageNo, setPageNo] = useState(1);
    const { data, mutate } = useSWR(`/api/dashboard/product/read-list?pageNo=${pageNo}&perPage=${perPage}&searchKey=${searchKey}`, Fetcher);
    const PageKeyOnChange =(e) => {
        setPerPage(parseInt(e.target.value));
        setPageNo(1); 
    };
    const searchOnChange = (e) => {
        setSearchInput(e.target.value);
        if ((e.target.value.length) === 0) {
            setSearchKey("0")
            router.refresh();
        }
    };
    const searchButtonClick = () => {
        setSearchKey(searchInput);
    };
    const handlePageClick = ({selected}) => {
        setPageNo(selected + 1);
        router.refresh()
    };
    const TextSearch = (e) => {
        const rows = document.querySelectorAll('tbody tr')
        rows.forEach(row => {
            row.style.display = (row.innerText.includes(e.target.value)) ? '' : 'none'
        })
    }
    const onDelete = async (id) => {
        let Result = await DeleteAlert();
        if (Result.isConfirmed) {
            const options = {
                method: 'DELETE',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
               // body: JSON.stringify({id:parseInt(id)})
            }
            let res=await fetch(`/api/dashboard/product/delete?id=${id}`,options);
              let ResJson=await res.json();
              if (ResJson['status'] === "success") {
                  SuccessToast("Request Success")
                  router.refresh()
                  await mutate();
              }
              else if (ResJson["status"] === "fail") {
                ErrorToast("Product Name Already Exist")
              }
              else {
                    ErrorToast("Request Fail ! Try Again")
              }
        }
        
    }
    return (
        <>
            <div className='list'>
                 <div className='container'>
                    <div className='row g-0'>
                        <div className='col-lg-12'>
                            <div className='card animated fadeIn shadow border-0 p-4 pt-5'>
                                <div className='container g-0'>
                                    <div className='row gx-2 align-items-center'>
                                        <div className='col-lg-4 col-md-12'>
                                            <h2 className='mb-0'>Product List</h2>
                                        </div>
                                        <div className="col-lg-2 col-md-3 col-sm-3 offset-md-1 offset-lg-1">
                                            <input onKeyUp={TextSearch} placeholder="Text Filter" className="form-control"/>
                                        </div>
                                        <div className="col-lg-2 col-md-4 col-sm-4">
                                            <select onChange={PageKeyOnChange} className="form-select form-control" >
                                                <option value="10">10 Per Page</option>
                                                <option value="20">20 Per Page</option>
                                                <option value="20">30 Per Page</option>
                                                <option value="50">50 Per Page</option>
                                                <option value="100">100 Per Page</option>
                                            </select>
                                        </div>
                                        <div className="col-lg-3 col-md-4 col-sm-5">
                                            <div className="input-group">
                                                <input onChange={searchOnChange} type="text" className="form-control" placeholder="Search.." aria-label="Recipient's username" aria-describedby="button-addon2"/>
                                                <button onClick={searchButtonClick} className="mb-0" type="button">
                                                    <span><IoIosSearch /></span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {data && data['data']?.length > 0 ? (
                                        <div className='row'>
                                            <div className='col-lg-12 mt-4'>
                                                <div className='table-responsive table-section'>
                                                    <table  className="table text-center table-bordered">
                                                    <thead className="bg-white">
                                                            <tr>
                                                                <td className="text-uppercase">No</td>
                                                                <td className="text-uppercase">Name</td>
                                                                <td className="text-uppercase">Unit</td>
                                                                <td className="text-uppercase">Brand</td>
                                                                <td className="text-uppercase">Category</td>
                                                                <td className="text-uppercase">Details</td>
                                                                <td className="text-uppercase ">Action</td>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {data && data['data'].map((item, i) => (
                                                                <tr key={i}>
                                                                    <td><p className="text-xs mb-0">{(pageNo - 1) * perPage + i + 1}</p></td>
                                                                    <td><p className="text-xs mb-0">{item.Name}</p></td>
                                                                    <td><p className="text-xs mb-0">{item.Unit}</p></td>
                                                                    <td><p className="text-xs mb-0">{item.brands ? item.brands['Name']:""}</p></td>
                                                                    <td><p className="text-xs mb-0">{item.categories ? item.categories['Name']:""}</p></td>
                                                                    <td><p className="text-xs mb-0">{item.Details}</p></td>
                                                                    <td>
                                                                        <Link href={`/ProductCreateUpdate?id=${item['id']}`}><AiOutlineEdit className='pen' /></Link>
                                                                        <span onClick={() => onDelete(item["id"])}><MdDelete className='delete' /></span>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className='col-lg-12 d-flex justify-content-center'>
                                                <nav aria-label="Page navigation example">
                                                    {data && (
                                                        <ReactPaginate
                                                            previousLabel={<AiOutlineLeft/>}
                                                            nextLabel={<AiOutlineRight/>}
                                                            pageClassName="page-item"
                                                            pageLinkClassName="page-link"
                                                            previousClassName="page-item"
                                                            previousLinkClassName="page-link"
                                                            nextClassName="page-item"
                                                            nextLinkClassName="page-link"
                                                            breakLabel="..."
                                                            breakClassName="page-item"
                                                            breakLinkClassName="page-link"
                                                            pageCount={Math.ceil(data['total'] / perPage)}
                                                            marginPagesDisplayed={2}
                                                            pageRangeDisplayed={5}
                                                            onPageChange={handlePageClick}
                                                            containerClassName="pagination"
                                                            activeClassName="active"
                                                            forcePage={pageNo - 1}
                                                        />
                                                    )}
                                                </nav>
                                            </div>
                                        </div>
                                    ): (
                                        <div className="row mt-4">
                                            {data && data['data']?.length === 0 ? (
                                                    <h5>No Data Found</h5>
                                                ) : (
                                                    <SkeletonTheme>
                                                        <Skeleton count={16} />
                                                    </SkeletonTheme>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductList;