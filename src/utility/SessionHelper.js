class SessionHelper{
    SetEmail(value) {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem("email", value);
        } else {
            console.error("localStorage is not available.");
        }
    }
    GetEmail() {
        if (typeof localStorage !== 'undefined') {
            return localStorage.getItem("email");
        } else {
            console.error("localStorage is not available.");
            return null;
        }
    }
    setOTP(OTP) {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem("OTP",OTP)
        } else {
            console.error("localStorage is not available.");
        }
        localStorage.setItem("OTP",OTP)
    }
    getOTP() {
        if (typeof localStorage !== 'undefined') {
            return localStorage.getItem("OTP")
        } else {
            console.error("localStorage is not available.");
            return null;
        }
    }
    getUserDetails() {
        if (typeof localStorage !== 'undefined') {
            const photoData = localStorage.getItem("photo");
            if (photoData) {
                try {
                    return JSON.parse(photoData);
                } catch (e) {
                    console.error("Error parsing JSON from localStorage:", e);
                    return null;
                }
            } else {
                console.warn("No 'photo' key found in localStorage.");
                return null;
            }
        } else {
            console.error("localStorage is not available.");
            return null;
        }
    }
}
export const {SetEmail,GetEmail,setOTP,getOTP,getUserDetails}=new SessionHelper();