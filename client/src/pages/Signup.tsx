import {useForm, type FieldValues} from "react-hook-form"
export default function Signup() {
    const {
        register,
        reset,
        formState: { errors,isLoading },
        handleSubmit,
    } = useForm();
    const handleSignup=async(v:FieldValues)=>{
        try {
            // logic 
            reset();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <main className='flex flex-col justify-center items-center'>
            <form onSubmit={handleSubmit(handleSignup)} className='flex flex-col gap-2'>
                <div>
                    <label htmlFor="email">email</label>
                    <input 
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
                <div>
                    <label htmlFor="password">password</label>
                    <input 
                        type="password"
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
                <button disabled={isLoading}>signup</button>
            </form>
        </main>
    )
}
