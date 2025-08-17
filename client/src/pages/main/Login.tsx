import {Input} from "@/components/ui/input";
import {useForm, type FieldValues} from "react-hook-form"
import { LogInIcon, LucideArrowRight, LucideEye, LucideEyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Img from "../../../src/assets/Login.svg"
import {motion} from "framer-motion"
import { NavLink, useNavigate } from "react-router-dom";
import {fetchData} from "../../../utils/fetchData"
export default function Login() {
    const [isPasswordVisible,setIsPasswordVisible]=useState(false);
    const [isSuccess,setIsSuccess]=useState(false);
    const [,setLoading]=useState(false);
    const navigate=useNavigate()
    const {
        register,
        reset,
        formState: { errors,isLoading },
        setError,
        clearErrors,
        handleSubmit,
    } = useForm();
    const handleSignup = async (v: FieldValues) => {
        setLoading(true);
        // Clear all previous errors
        clearErrors();
        
        try {
            const response = await fetchData("/user/login", "POST", "", {
                email: v.email,
                password: v.password
            });
    
            // Handle success case
            if (response.success) {
                localStorage.setItem("email", v.email);
                reset();
                setIsSuccess(true);
                navigate("/validate");
                return;
            }
    
            // Handle specific error cases
            if (response.email_error) {
                setError("email", {
                    type: "manual",
                    message: response.email_error
                });
            }
    
            if (response.password_error) {
                setError("password", {
                    type: "manual",
                    message: response.password_error
                });
            }
    
        } catch (error: any) {
            // Handle network errors or unexpected errors
            const errorMessage = error.response?.data?.message || "An unexpected error occurred";
            setError("root", {
                type: "manual",
                message: errorMessage
            });
        } finally {
            setLoading(false);
        }
    };
    return (
        <main className='flex flex-row flex-wrap gap-4 justify-center items-center w-full min-h-screen'>
            <motion.img 
                src={Img} 
                className="w-[clamp(300px, 45%, 500px)] object-cover aspect-square" 
                width={500} 
                height={500} 
                alt=""
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
            />
            <motion.form 
                onSubmit={handleSubmit(handleSignup)} 
                className='flex flex-col gap-2 w-[clamp(300px,400px,40%)] px-4 py-8 border shadow-lg rounded-md'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
            >
                <h2 className='font-bold text-center text-md md:text-lg lg:text-xl'>Login to your account</h2>
                <div className="w-full">
                    <label htmlFor="email">email</label>
                    <Input 
                        type="email"
                        {
                            ...register("email",{
                                required:{
                                    value:true,
                                    message:"email is required"
                                },
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                                    message: "invalid email address"
                                },
                                minLength: {
                                    value: 8,
                                    message: "email must be at least 8 characters long"
                                },
                                maxLength: {
                                    value: 32,
                                    message: "email must be at most 32 characters long"
                                }
                            })
                        } 
                    />
                    {
                        errors.email && <p className='text-red-500'>{errors.email.message?.toString()}</p>
                    }
                </div>
                <div className="relative w-full">
                    <label htmlFor="password">password</label>
                    <Button className='absolute right-0 top-6' type="button" variant="outline" onClick={()=>setIsPasswordVisible(v=>!v)} size="icon">
                        {
                            isPasswordVisible? (
                                <LucideEye/>
                            ):(
                                <LucideEyeOff/>
                            )
                        }
                    </Button>
                    <Input 
                        type={isPasswordVisible?"text":"password"}
                        {
                            ...register("password",{
                                required:{
                                    value:true,
                                    message:"password is required"
                                },
                                minLength: {
                                    value: 8,
                                    message: "password must be at least 8 characters long"
                                },
                                maxLength: {
                                    value: 32,
                                    message: "password must be at most 32 characters long"
                                }
                            })
                        } 
                    />
                    {
                        errors.password && (
                            <p className='text-red-500'>{errors.password.message?.toString()}</p>
                        )
                    }
                </div>
                <Button variant="default" className={`${isLoading?"cursor-not-allowed":"cursor-pointer"} flex flex-row items-center`} disabled={isLoading}>
                    <LogInIcon className="mr-1"/>
                    <span>Login</span>
                </Button>
                <p>Don&apos;t have an account?</p>
                <NavLink to="/signup">
                    <Button className="w-full" variant="outline">signup</Button>
                </NavLink>
                {
                    isSuccess&&(
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                        >
                            <p className='text-green-500'>An OTP has been sent to your email address please check your inbox</p>
                            <Button variant="default" onClick={()=>{
                                navigate("/validate");
                            }}>
                                <LucideArrowRight className="mr-2" /> <span>Validate</span>
                            </Button>
                        </motion.div>
                    )
                }
            </motion.form>
        </main>
    )
}
