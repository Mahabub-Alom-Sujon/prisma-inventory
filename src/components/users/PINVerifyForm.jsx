"use client"
import {useState} from "react";
import {ErrorToast,IsEmpty, SuccessToast} from "@/utility/FormHelper";
import {GetEmail,setOTP} from "@/utility/SessionHelper"
import {useRouter} from "next/navigation";
import ReactCodeInput from "react-code-input";
import LoaderButton from "../master/LoaderButton";
const PINVerifyForm = () => {
    const [data, setData] = useState({email:GetEmail(),otp:""});
    const [submit, setSubmit] = useState(false);
    const router=useRouter();
    const inputOnChange = (name,value) => {
        setData((data)=>({
            ...data,
            [name]: value
        }))
    }
    const formSubmit = async (e) => {
        e.preventDefault();
        if(IsEmpty(data.otp)){
            ErrorToast("Valid PIN Code Required")
        }
        else{
            setSubmit(true);
            const options = {
                method: 'POST',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }
  
            let res=await fetch("/api/user/verifyOTP",options);
            let ResJson=await res.json();
  
            setSubmit(false);
  
            if(ResJson['status']==="success"){
                SuccessToast("Verification Success");
                setOTP(data.otp)
                router.push("/user/resetPassword")
            }
            else{
                ErrorToast("Request Fail")
            }
  
        }
    }
    let  defaultInputStyle= {
            fontFamily: "monospace",
            MozAppearance: "textfield",
            margin: "6px",
            paddingLeft: "8px",
            width: "45px",
            height: "45px",
            fontSize: "40px",
            border: '1px solid lightskyblue',
            boxSizing: "border-box",
            color: "black",
            backgroundColor: "white",
            borderColor: "lightgrey",
        
        }
    return (
        <section className="all-box" id='from'>
            <div className='container'>
                <div className='row justify-content-center align-items-center'>
                    <div className='col-lg-5'>
                        <div className='from-box'>
                            <from onSubmit={formSubmit} className="card animated fadeIn p-5 shadow border-0">
                                <h2>Verification PIN</h2>
                                <ReactCodeInput className="mb-4 text-center otp" value={data.otp} onChange={(value) => { inputOnChange('otp', value)}}  type='number' inputStyle={defaultInputStyle} fields={6} />
                                <button onClick={formSubmit} className='frm-btn'>
                                    {
                                        submit? <LoaderButton/>:"Next"
                                    }
                                </button>

                            </from>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        )
};

export default PINVerifyForm;