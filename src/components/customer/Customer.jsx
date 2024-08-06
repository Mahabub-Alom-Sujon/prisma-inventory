"use client"
import {useEffect, useState} from "react";
import LoaderButton from "@/components/master/LoaderButton";
import { ErrorToast, IsEmail, IsEmpty, IsMobile, SuccessToast } from "@/utility/FormHelper";
import { useRouter} from "next/navigation";
const Customer = (props) => {
    const [submit, setSubmit] = useState(false);
    const router = useRouter();
    let [data, setData] = useState({
        Name:props.data?.Name || "",
        Phone:props.data?.Phone || "",
        Email:props.data?.Email || "",
        Address:props.data?.Address || "",
    });
    
    useEffect(() => {
        setData({
            Name: props.data?.Name || "",
            Phone: props.data?.Phone || "",
            Email: props.data?.Email || "",
            Address: props.data?.Address || ""
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
            ErrorToast("Customer Name Required !")
        }
        else if(IsMobile(data.Phone)) {
            ErrorToast("Customer Phone  Number Required !")
        }
        else if(IsEmail(data.Email)) {
            ErrorToast("Valid Email Address Required !")
        }
        else if(IsEmpty(data.Address)) {
            ErrorToast("Valid Address Required !")
        }
        else {
            setSubmit(true);
            const options = {
                method:props.data.id ? 'PUT' : 'POST',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }
            let url =props.data.id ? `/api/dashboard/customers/update?id=${props.id}` : "/api/dashboard/customers/create";
            let res=await fetch(url, options);
            let ResJson = await res.json();
            if (ResJson['status'] === "success") {
                setData({id: null,Name:"",Phone:"",Email:"",Address:""}) 
                SuccessToast(`Customer ${props.data.id ? "Updated" : "Created"}`);
                router.replace("/CustomerList")
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
                {/* {JSON.stringify(props.data)} */}
                <div className='row justify-content-center'>
                    <div className='col-sm-10 col-md-8 col-lg-5'>
                        <div className='from-box'>
                            <from className='card animated fadeIn p-5 shadow border-0'>
                            <h2>{props.data?.id ? "Update" : "Save"} Customer</h2>
                                 <div className='col-lg-12'>
                                        <input value={data.Name} onChange={(e) => { inputOnChange("Name", e.target.value) }} className="form-control mb-4" type="text" placeholder="Customer Name" />
                                    </div>
                                     <div className='col-lg-12'>
                                        <input value={data.Phone} onChange={(e) => { inputOnChange("Phone", e.target.value) }} className="form-control mb-4" type="text" placeholder="Mobile No" />
                                    </div>
                                    <div className='col-lg-12'>
                                        <input value={data.Email} onChange={(e) => { inputOnChange("Email", e.target.value) }} className="form-control mb-4" type="email" placeholder="Email" />
                                    </div>
                                    <div className='col-lg-12'>
                                        <input value={data.Address} onChange={(e) => { inputOnChange("Address", e.target.value) }} className="form-control mb-4" type="text" placeholder="Address" />
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

export default Customer;