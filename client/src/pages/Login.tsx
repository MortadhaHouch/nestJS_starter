import { useForm, type FieldValues } from 'react-hook-form';

export default function Login() {
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
                    <label htmlFor="firstName">firstName</label>
                    <input 
                        type="text"
                        {
                            ...register("firstName",{
                                required:"firstName is required",
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
                <div>
                    <label htmlFor="lastName">lastName</label>
                    <input 
                        type="text"
                        {
                            ...register("lastName",{
                                required:"lastName is required",
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
