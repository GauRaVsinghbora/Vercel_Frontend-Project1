import React, { useState, useRef } from "react";
import { verifyOtp, resendOtp as resendOtpApi } from "../../api/authApi";
import { Button } from "../../components";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { login } from '../../slice/auth/authSlice.js';
import { getUser } from '../../api/userApi.js'

function VerifyOtp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { handleSubmit, setValue } = useForm();
    const [error, setError] = useState(null);
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const inputsRef = useRef([]);
    const email = localStorage.getItem("Email");

    const handleChange = (e, index) => {
        let val = e.target.value.replace(/\D/, ""); 

        const newOtp = [...otp];
        newOtp[index] = val || ""; 
        setOtp(newOtp);

        setValue("otp", newOtp.join(""));

        if (val && index < otp.length - 1) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            const newOtp = [...otp];
            if (otp[index]) {
                newOtp[index] = "";
                setOtp(newOtp);
                setValue("otp", newOtp.join(""));
            } else if (index > 0) {
                newOtp[index - 1] = "";
                setOtp(newOtp);
                setValue("otp", newOtp.join(""));
                inputsRef.current[index - 1].focus();
            }
        }
    };

    const create = async (formData) => {
        try {
        const payload = { otp: formData.otp, email };

        const response = await verifyOtp(payload);
        if (response) {
            localStorage.removeItem("Email");
            const useData = await getUser();
            if(useData) {
                dispatch (login(useData))
                toast.success("succes full login");
                navigate("/");
            }else{
                toast.success("please login");
                navigate('/login');
            }
        }
        } catch (err) {
        setError(err.response?.data?.message || "Verification failed");
        }
    };

    const resendOtp = async () => {
        try {
            const response = await resendOtpApi({email});
            if (response) {
            toast.success("OTP sent, please check your email");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to resend OTP");
        }
    };

    return (
        <div className="flex items-center justify-center">
        <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
            <h2 className="text-center text-2xl font-bold leading-tight">Check your email</h2>
            <p className="mt-2 text-center text-base text-black/60">
            Didn’t get the OTP?&nbsp;
            <button
                onClick={resendOtp}
                className="font-medium text-primary transition-all duration-200 hover:underline"
            >
                resend otp
            </button>
            </p>

            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

            <form onSubmit={handleSubmit(create)} className="mt-8 space-y-6">
            <div className="flex justify-center gap-3">
                {otp.map((digit, idx) => (
                <input
                    key={idx}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    ref={(el) => (inputsRef.current[idx] = el)}
                    className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                ))}
            </div>

            {/* Hidden field to connect OTP with react-hook-form */}
            <input type="hidden" name="otp" />

            <Button
                type="submit"
                className="w-full mt-6"
                label="Verify"
                disabled={otp.join("").length < 6}
            />
            </form>
        </div>
        </div>
    );
}

export default VerifyOtp;
