import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm, type FieldValues } from 'react-hook-form'

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors,isLoading},
  } = useForm()
  const submitMessage = async (v:FieldValues) => {
    try {
      console.log(v);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <main className='flex flex-col justify-center items-center w-screen min-h-screen'>
      <section className='flex justify-center items-center w-full max-w-7xl min-h-screen'>
        <form onSubmit={handleSubmit(submitMessage)} className='w-[clamp(300px, 50%, 600px)] flex flex-col gap-2' action="">
          <div className='w-full'>
            <Input 
              type="text" 
              placeholder='Name'
              {
                ...register("name",{
                  required:"name is required",
                  minLength: {
                    value: 3,
                    message: "name must be at least 3 characters long"
                  }
                })
              }
            />
            {
              errors.name && <p className='text-red-500'>{errors.name.message?.toString()}</p>
            }
          </div>
          <div className='w-full'>
            <Input 
              type="email" 
              placeholder='Email'
              {
                ...register("email",{
                  required:"email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address"
                  }
                })
              } 
            />
            {
              errors.email && <p className='text-red-500'>{errors.email.message?.toString()}</p>
            }
          </div>
          <div>
            <textarea 
              {
                ...register("message",{
                  required:"message is required",
                  minLength: {
                    value: 3,
                    message: "message must be at least 3 characters long"
                  }
                })
              }
              id=""
            ></textarea>
            {
              errors.message && <p className='text-red-500'>{errors.message.message?.toString()}</p>
            }
          </div>
          <Button className='w-full bg-primary' disabled={isLoading}>
            Send Message
          </Button>
        </form>
      </section>
    </main>
  )
}
