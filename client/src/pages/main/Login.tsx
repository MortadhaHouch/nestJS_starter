import { Input } from "@/components/ui/input";
import {useForm, type FieldValues} from "react-hook-form"
import { LucideEye, LucideEyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Img from "../../../src/assets/Login.svg"
import {motion} from "framer-motion"
import { NavLink } from "react-router-dom";
export default function Login() {
    const [isPasswordVisible,setIsPasswordVisible]=useState(false)
    const {
        register,
        reset,
        formState: { errors,isLoading },
        handleSubmit,
    } = useForm();
    const handleSignup=async(v:FieldValues)=>{
        try {
            console.log(v);
            reset();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <main className='flex flex-row flex-wrap gap-4 justify-center items-center w-screen min-h-screen'>
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
                                required:"email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
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
                                required:"password is required",
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
                        errors.password && <p className='text-red-500'>{errors.password.message?.toString()}</p>
                    }
                </div>
                <Button variant="default" className={`${isLoading&&"cursor-not-allowed"}`} disabled={isLoading}>signup</Button>
                <p>Don&apos;t have an account?</p>
                <NavLink to="/signup">
                    <Button className="w-full" variant="outline">signup</Button>
                </NavLink>
            </motion.form>
        </main>
    )
}
