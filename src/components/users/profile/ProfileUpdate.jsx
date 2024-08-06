"use client"
import { useEffect, useState } from "react";
import {ErrorToast, IsEmail, IsEmpty, SuccessToast, getBase64} from "@/utility/FormHelper";
import {useRouter} from "next/navigation";
import LoaderButton from "@/components/master/LoaderButton";
const ProfileUpdate = (props) => {
    const [submit, setSubmit] = useState(false);
    const router = useRouter();
    const [storedPhoto, setStoredPhoto] = useState(null);
    const [data, setData] = useState({
        email: props.data['email'],
        firstName: props.data['firstName'],
        lastName: props.data['lastName'],
        mobile: props.data["mobile"],
        password: props.data['password'],
        photo:props.data["photo"]
    });
    useEffect(() => {
        const savedPhoto = localStorage.getItem('photo');
        if (savedPhoto) {
            setStoredPhoto(savedPhoto);
        }
    }, []);
    const inputOnChange = (name,value) => {
        setData((data)=>({
            ...data,
            [name]:value
        }))
    }
    const PreviewImage = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const base64String = await getBase64(file);
            setData(prevData => ({
                ...prevData,
                photo: base64String
            }));
            setStoredPhoto(base64String);
            localStorage.setItem('photo', base64String); // Update localStorage
        }
    };
    const formSubmit = async () => {
        if (IsEmpty(data.firstName)) {
            ErrorToast("First Name Required")
        }
        else if (IsEmpty(data.lastName)) {
            ErrorToast("Last Name Required")
        }
        else if (IsEmail(data.email)) {
            ErrorToast("Valid Email Address Required")
        }
        
        else if (IsEmpty(data.password)) {
            ErrorToast("Password Required")
        }
        else if (IsEmpty(data.mobile)) {
            ErrorToast("Phone Required")
        }
        else {
            setSubmit(true);
            const options = {
                method: 'PUT',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }
            let res = await fetch("/api/dashboard/profile",options);
            let ResJson=await res.json();
            setSubmit(false);
            if(ResJson['status']==="success"){
                SuccessToast("Update Success")
                router.refresh()
            }
            else{
                ErrorToast("Request Fail")
            }
        }
    }
    return (
        <section id="from">
            <div className='container'>
                <div className='row justify-content-center align-items-center'>
                    <div className='col-lg-5 col-md-8 col-sm-10'>
                        <div className='from-box'>
                            <from className="card animated fadeIn p-5 shadow border-0">
                                <h2>Profile Update</h2>
                                {storedPhoto && <img className="icon-nav-img-lg mb-4" src={storedPhoto} alt="User" /> }
                                {/* <img  className="icon-nav-img-lg mb-4" src={data.photo} /> */}
                                <input  onChange={PreviewImage}   className="form-control mb-4" type="file"/>
                                <input value={data.firstName} onChange={(e)=>{inputOnChange("firstName",e.target.value)}} type="text" placeholder='First Name' className="form-control mb-4" />
                                <input value={data.lastName}  onChange={(e)=>{inputOnChange("lastName",e.target.value)}}  type="text" placeholder='Last Name' className="form-control mb-4" />
                                <input value={data.email} onChange={(e) => { inputOnChange("email", e.target.value) }} readOnly={true} type="email" placeholder='Email' className="form-control mb-4" />
                                <input value={data.password} onChange={(e)=>{inputOnChange("password",e.target.value)}} type="password" placeholder='password' className="form-control mb-4" />
                                <input value={data.mobile} onChange={(e)=>{inputOnChange("mobile",e.target.value)}} type="text" placeholder='Phone' className="form-control mb-4" />
                                <button onClick={formSubmit} className='frm-btn'>
                                    {submit ? <LoaderButton/>:"Update"}
                                </button>
                            </from>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfileUpdate;