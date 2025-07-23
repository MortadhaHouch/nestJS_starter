import { Button } from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import { LucideEye, LucideEyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm, type FieldValues } from 'react-hook-form';
import Img from "../../../src/assets/Sign-up.svg"
import {motion} from "framer-motion"
import { NavLink, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
export default function Signup() {
    const [isPasswordVisible,setIsPasswordVisible]=useState(false)
    const [cookie,,] = useCookies(['auth_token'])
    const navigate=useNavigate()
    useEffect(()=>{
        if(cookie.auth_token){
            navigate('/')
        }
    },[])
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
    <main className='flex flex-row flex-wrap gap-4 justify-center items-center w-full min-h-screen'>
        <motion.img 
            src={Img} 
            className="w-[clamp(300px, 45%, 500px)] object-cover aspect-square" 
            width={500} 
            height={500} 
            alt=""
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }} 
        />
            <motion.form 
                onSubmit={handleSubmit(handleSignup)} 
                className='flex flex-col gap-2 w-[clamp(300px,400px,40%)] px-4 py-8 border shadow-lg rounded-md'
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
            >
                <div className="w-full">
                    <h2 className='font-bold text-center text-md md:text-lg lg:text-xl'>Create an account</h2>
                    <label htmlFor="firstName">first name</label>
                    <Input 
                        type="text"
                        {
                            ...register("firstName",{
                                required:{
                                    value:true,
                                    message:"firstName is required"
                                },
                                minLength: {
                                    value: 3,
                                    message: "firstName must be at least 3 characters long"
                                },
                                maxLength: {
                                    value: 32,
                                    message: "firstName must be at most 32 characters long"
                                }
                            })
                        } 
                    />
                    {
                        errors.firstName && <p className='text-red-500'>{errors.firstName.message?.toString()}</p>
                    }
                </div>
                <div className="w-full">
                    <label htmlFor="lastName">last name</label>
                    <Input 
                        type="text"
                        {
                            ...register("lastName",{
                                required:{
                                    value:true,
                                    message:"lastName is required"
                                },
                                minLength: {
                                    value: 3,
                                    message: "lastName must be at least 3 characters long"
                                },
                                maxLength: {
                                    value: 32,
                                    message: "lastName must be at most 32 characters long"
                                }
                            })
                        } 
                    />
                    {
                        errors.lastName && <p className='text-red-500'>{errors.lastName.message?.toString()}</p>
                    }
                </div>
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
                    <Button className='absolute right-0 top-6' type='button' variant="outline" onClick={()=>setIsPasswordVisible(v=>!v)} size="icon">
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
                        errors.password && <p className='text-red-500'>{errors.password.message?.toString()}</p>
                    }
                </div>
                <Button type='submit' className='w-full' variant="default" disabled={isLoading}>signup</Button>
                <p className='text-center'>Already have an account? </p>
                <NavLink to="/login" className='text-center text-blue-500'>
                    <Button className='w-full' variant="secondary">Login</Button>
                </NavLink>
            </motion.form>
        </main>
  )
}
