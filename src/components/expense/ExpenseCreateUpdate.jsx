"use client"
import {useEffect, useState} from "react";
import LoaderButton from "@/components/master/LoaderButton";
import { ErrorToast,IsEmpty,SuccessToast } from "@/utility/FormHelper";
import { useRouter} from "next/navigation";

const ExpenseCreateUpdate = (props) => {
    const [submit, setSubmit] = useState(false);
    const router = useRouter();
    let [data, setData] = useState({
        TypeID:props.data?.TypeID || "",
        Amount:props.data?.Amount || "",
        Note:props.data?.Note || "",
    });
    useEffect(() => {
        setData({
            TypeID:props.data?.TypeID || "",
            Amount:props.data?.Amount || "",
            Note:props.data?.Note || "",
        });
    }, [props.data]);
    const inputOnChange = (name,value) => {
        setData((data)=>({
            ...data,
            [name]:value
            //[name]: name === "Amount" ? parseFloat(value) : value
        }))
    }
    const formSubmit = async (e) => {
        e.preventDefault();
        if(IsEmpty(data.TypeID)){
            ErrorToast("Type Name Required !")
        }
        else if(IsEmpty(data.Amount)) {
            ErrorToast("Expense Amount Required !")
        }
        else if(IsEmpty(data.Note)) {
            ErrorToast("Expense Note is Required !")
        }
        else {
            setSubmit(true);
            const options = {
                method:props.data.id ? 'PUT' : 'POST',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }
            let url =props.data.id ? `/api/dashboard/expenses/update?id=${props.id}` : "/api/dashboard/expenses/create";
            let res=await fetch(url, options);
            let ResJson = await res.json();
            if (ResJson['status'] === "success") {
                setData({id: null,TypeID:"",Amount:"",Note:""}) 
                SuccessToast(`Expense ${props.data.id ? "Updated" : "Created"}`);
                router.replace("/ExpenseList")
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
                            <h2>{props.data?.id ? "Update" : "Save"} Expense</h2>
                                <div className='col-lg-12'>
                                    <select value={data.TypeID} onChange={(e)=>{inputOnChange("TypeID",e.target.value)}}  className='form-select form-control mb-4'>
                                            <option value="">Select Type</option>
                                            {
                                                props.ExpenseType.map((item, i) => {
                                                    return(<option key={i.toLocaleString()} value={item.id}>{item.Name}</option>)
                                                })
                                            }
                                        </select>
                                </div>
                                <div className='col-lg-12'>
                                    <input value={data.Amount} onChange={(e) => { inputOnChange("Amount", parseFloat(e.target.value)) }} className="form-control mb-4" type="number" placeholder="Expense Amount"/>
                                </div>
                                <div className='col-lg-12'>
                                    <input value={data.Note} onChange={(e) => { inputOnChange("Note", e.target.value) }} className="form-control mb-4" type="text" placeholder="Expense Note" />
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

export default ExpenseCreateUpdate;