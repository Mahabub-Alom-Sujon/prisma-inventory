"use client"
import {useEffect, useState} from "react";
import LoaderButton from "@/components/master/LoaderButton";
import { ErrorToast,IsEmpty,SuccessToast } from "@/utility/FormHelper";
import { useRouter} from "next/navigation";

const CategoryCreateUpdate = (props) => {
    const [submit, setSubmit] = useState(false);
    const router = useRouter();
    let [data, setData] = useState({
        Name:props.data?.Name || "",
    });
    useEffect(() => {
        setData({
            Name: props.data?.Name || "",
        });
    }, [props.data]);
    const inputOnChange = (name,value) => {
        setData((data)=>({
            ...data,
            [name]:value
        }))
    }
    const formSubmit = async (e) => {
        e.preventDefault();
        if(IsEmpty(data.Name)){
            ErrorToast("Category Name Required !")
        }
        else {
            setSubmit(true);
            const options = {
                method:props.data.id ? 'PUT' : 'POST',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }
            let url =props.data.id ? `/api/dashboard/categories/update?id=${props.id}` : "/api/dashboard/categories/create";
            let res=await fetch(url, options);
            let ResJson = await res.json();
            if (ResJson['status'] === "success") {
                setData({id: null,Name:""}) 
                SuccessToast(`Category ${props.data.id ? "Updated" : "Created"}`);
                router.replace("/CategoryList")
                router.refresh()
            }
            else {
                  setSubmit(false);
                  ErrorToast("Request Fail")
            }
        }
    }
    return (
        <>
            <div className='container' id="from">
                <div className='row justify-content-center'>
                    <div className='col-sm-10 col-md-8 col-lg-5'>
                        <div className='from-box'>
                            <from className='card animated fadeIn p-5 shadow border-0'>
                                <h2>{props.data?.id ? "Update" : "Save"} Category</h2>
                                <div className='col-lg-12'>
                                    <input value={data.Name} onChange={(e) => { inputOnChange("Name", e.target.value) }} className="form-control mb-4" type="text" placeholder="Category Name" />
                                </div>
                                <button onClick={formSubmit} className='frm-btn'>
                                    {submit ? <LoaderButton /> :"Save Change" }
                                </button>
                            </from>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryCreateUpdate;