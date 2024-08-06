"use client"
import {useEffect, useState} from "react";
import LoaderButton from "@/components/master/LoaderButton";
import { ErrorToast,IsEmpty,SuccessToast } from "@/utility/FormHelper";
import { useRouter} from "next/navigation";

const ProductCreateUpdate = (props) => {
    const [submit, setSubmit] = useState(false);
    const router = useRouter();
    let [data, setData] = useState({
        Name:props.data?.Name || "",
        Unit:props.data?.Unit || "",
        Details:props.data?.Details || "",
        CategoryID: props.data?.CategoryID || "",
        BrandID: props.data?.BrandID || "",
    });
    
    useEffect(() => {
        setData({
            Name:props.data?.Name || "",
            Unit:props.data?.Unit || "",
            Details:props.data?.Details || "",
            CategoryID: props.data?.CategoryID || "",
            BrandID: props.data?.BrandID || "",
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
            ErrorToast("Product Name Required !")
        }
        else if(IsEmpty(data.BrandID)) {
            ErrorToast("Brand Name Required !")
        }
        else if(IsEmpty(data.CategoryID)) {
            ErrorToast("Category Name Required !")
        }
        else if(IsEmpty(data.Unit)) {
            ErrorToast("Unit is Required !")
        }
        else if(IsEmpty(data.Details)) {
            ErrorToast("Details is Required !")
        }
        else {
            setSubmit(true);
            const options = {
                method:props.data.id ? 'PUT' : 'POST',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }
            let url =props.data.id ? `/api/dashboard/product/update?id=${props.id}` : "/api/dashboard/product/create";
            let res=await fetch(url, options);
            let ResJson = await res.json();
            if (ResJson['status'] === "success") {
                setData({id: null,Name:"",Unit:"",Details:"",CategoryID:"",BrandID:""}) 
                SuccessToast(`Product ${props.data.id ? "Updated" : "Created"}`);

                router.replace("/ProductList")
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
                {/* {JSON.stringify(props.Category)} */}
                <div className='row justify-content-center'>
                    <div className='col-sm-10 col-md-8 col-lg-5'>
                        <div className='from-box'>
                            <from className='card animated fadeIn p-5 shadow border-0'>
                            <h2>{props.data?.id ? "Update" : "Save"} Product</h2>
                                 <div className='col-lg-12'>
                                        <input value={data.Name} onChange={(e) => { inputOnChange("Name", e.target.value) }} className="form-control mb-4" type="text" placeholder="Product Name" />
                                    </div>
                                    <div className='col-lg-12'>
                                        <select value={data.BrandID} onChange={(e)=>{inputOnChange("BrandID",e.target.value)}}  className='form-select form-control mb-4'>
                                                <option value="">Select Brand</option>
                                                {
                                                    props.Brand.map((item, i) => {
                                                        return(<option key={i.toLocaleString()} value={item.id}>{item.Name}</option>)
                                                    })
                                                }
                                            </select>
                                    </div>
                                    <div className='col-lg-12'>
                                        <select value={data.CategoryID} onChange={(e)=>{inputOnChange("CategoryID",e.target.value)}}  className='form-select form-control mb-4'>
                                                <option value="">Select Category</option>
                                                {
                                                    props.Category.map((item, i) => {
                                                        return(<option key={i.toLocaleString()} value={item.id}>{item.Name}</option>)
                                                    })
                                                }
                                            </select>
                                    </div>
                                    <div className='col-lg-12'>
                                        <input value={data.Unit} onChange={(e) => { inputOnChange("Unit", e.target.value) }} className="form-control mb-4" type="text" placeholder="Unit" />
                                    </div>
                                    <div className='col-lg-12'>
                                        <input value={data.Details} onChange={(e) => { inputOnChange("Details", e.target.value) }} className="form-control mb-4" type="text" placeholder="Details" />
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

export default ProductCreateUpdate;