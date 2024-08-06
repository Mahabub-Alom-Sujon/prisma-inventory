"use client"
import {useState} from "react";
import {ErrorToast, IsEmail, IsEmpty, SuccessToast} from "@/utility/FormHelper";
import Link from "next/link";
import LoaderButton from "@/components/master/LoaderButton";
import Swal from "sweetalert2";
const LoginForm = () => {
    let [data, setData] = useState({
        email: "",
        password: "",
    });

    const [submit, setSubmit] = useState(false);
    const inputOnChange = (name,value) => {
        setData((data)=>({
            ...data,
            [name]:value
        }))
    }

    const formSubmit =async (e) => {
        e.preventDefault();
        if(IsEmail(data.email)){
            ErrorToast("Valid Email Address Required")
        }
        else if(IsEmpty(data.password)){
            ErrorToast("Password Required")
        }
        else{
            setSubmit(true);
  
            const options = {
                method: 'POST',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }
  
            let res=await fetch("/api/user/login",options);
            let ResJson=await res.json();
  
            if (ResJson['status'] === "success") {
                  setData({email:"",password:""}) 
                //   SuccessToast("Login Success")
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your Login Success",
                    showConfirmButton: false,
                    timer: 1500
                });
                  window.location.href = '/'; 
            }
            else {
                  setSubmit(false);
                  ErrorToast("Request Fail")
            }
  
        }
      }
    return (
        <section id='from' className="all-box">
            <div className='container'>
                <div className='row justify-content-center align-items-center'>
                    <div className='col-lg-5 col-md-8 col-sm-10'>
                        <div className='from-box'>
                            <from className="card animated fadeIn p-5 shadow border-0">
                                <h2>Login</h2>
                                <div>
                                    <input value={data.email} onChange={(e) => { inputOnChange("email", e.target.value) }} type="email" placeholder="Email" className="form-control mb-4" />
                                </div>
                                <div>
                                    <input value={data.password} onChange={(e) => { inputOnChange("password", e.target.value) }} placeholder="Password" type="password" className='form-control mb-4' />
                                </div>
                                <button onClick={formSubmit} className='frm-btn'>
                                    {submit ? <LoaderButton /> :"Login" }
                                </button>
                                    
                                <div className="my-4 d-flex">
                                    <Link href="/user/registration" className="nav-link mx-2">Sign Up |</Link>
                                    <Link href="/user/emailVerify" className="nav-link mx-2">Forget Password</Link>
                                </div>
                            </from>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginForm;