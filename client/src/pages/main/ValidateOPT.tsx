import { InputOTP } from '@/components/main/InputOTP';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { useState } from 'react';
import { fetchData } from '../../../utils/fetchData';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

export default function ValidateOTP() {
    const [optValue, setOptValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [cookie,setCookie] = useCookies(['auth_token'])
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetchData('/user/validate', 'POST', '', {
                otp: parseInt(optValue),
                email: localStorage.getItem('email'),
            });
            if(response.error){
                
            }
            setMessage('✅ OTP validated successfully!');
            console.log(response);
        } catch (error) {
            setMessage('❌ Invalid OTP or error occurred.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex justify-center items-center px-4 w-full min-h-screen bg-muted">
        <Card className="w-full max-w-md rounded-2xl border shadow-xl">
            <form className='flex flex-col gap-4 justify-center items-center' onSubmit={handleSubmit}>
            <CardHeader className="w-full text-center">
                <CardTitle className="text-2xl">OTP Verification</CardTitle>
                <CardDescription className="mt-1 text-sm text-muted-foreground">
                Please enter the 4-digit code sent to your email.
                </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-6 justify-center items-center w-full">
                <InputOTP optValue={optValue} setOptValue={setOptValue} />
                {message && (
                <p className={`text-sm ${message.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
                    {message}
                </p>
                )}
            </CardContent>

            <CardFooter className="flex justify-end pt-0 w-full">
                <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Validating...' : 'Validate'}
                </Button>
            </CardFooter>
            </form>
        </Card>
        </main>
    );
}
