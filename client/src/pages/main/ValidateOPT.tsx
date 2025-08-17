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
import { useEffect, useState } from 'react';
import { fetchData } from '../../../utils/fetchData';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { Ban, LucideArrowRight, LucideLoader, RefreshCcw, RefreshCwOff } from 'lucide-react';

export default function ValidateOTP() {
    const [optValue, setOptValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [authFlow, setAuthFlow] = useState({
        expiry:false,
        validate:false,
        retries:0,
        timeElapsed:0,
        canTryAgain:true
    });
    const [,setCookie] = useCookies(['auth_token'])
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setInterval(() => {
            setAuthFlow(prev => ({
                ...prev,
                timeElapsed: (prev.timeElapsed || 0) + 1
            }));
        }, 1000);
    
        // Cleanup interval on component unmount
        return () => clearInterval(timer);
    }, []);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setAuthFlow({
            ...authFlow,
            timeElapsed:0,
            retries:authFlow.retries + 1
        });

        try {
            const response = await fetchData('/user/validate', 'POST', '', {
                code: parseInt(optValue),
                email: localStorage.getItem('email'),
            });
            console.log(response);
            if(response.expiry_message_error){
                setAuthFlow({
                    ...authFlow,
                    expiry:true,
                    validate:false,
                    timeElapsed:0,
                    retries:authFlow.retries + 1
                });
            }
            if(response.code_error){
                setAuthFlow({
                    ...authFlow,
                    expiry:false,
                    validate:false,
                    timeElapsed:0,
                    retries:authFlow.retries + 1
                });
            }
            if(response.success){
                setAuthFlow({
                    ...authFlow,
                    expiry:false,
                    validate:true,
                    timeElapsed:0,
                    retries:authFlow.retries + 1
                });
                console.log(response);
                setCookie("auth_token",response.token,{
                    path:"/",
                    maxAge:60*60*24*7
                })
                localStorage.setItem("email",response.data.email as string);
                localStorage.setItem("firstName",response.data.firstName as string);
                localStorage.setItem("lastName",response.data.lastName as string);
                navigate("/")
            }
        } catch (error) {
            setAuthFlow({
                ...authFlow,
                expiry:false,
                validate:false,
                timeElapsed:0,
                retries:authFlow.retries + 1
            });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    const handleTryAgain = async () => {
        try {
            setLoading(true);
            setAuthFlow({
                ...authFlow,
                timeElapsed:0,
                retries:authFlow.retries + 1,
                canTryAgain:true
            });
            const response = await fetchData('/user/resend-opt', 'POST', '', {
                email: localStorage.getItem('email'),
                code:parseInt(optValue)
            });
            if(response.otp_trial_error){
                setAuthFlow({
                    ...authFlow,
                    timeElapsed:0,
                    retries:authFlow.retries + 1,
                    canTryAgain:false
                });
            }
        } catch (error) {
            setAuthFlow({
                ...authFlow,
                retries:authFlow.retries + 1
            });
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <main className="flex items-center justify-center w-full min-h-screen px-4 bg-muted">
            <Card className="w-full max-w-md border shadow-xl rounded-2xl">
                <form className='flex flex-col items-center justify-center gap-4' onSubmit={handleSubmit}>
                <CardHeader className="w-full text-center">
                    <CardTitle className="text-2xl">OTP Verification</CardTitle>
                    <CardDescription className="mt-1 text-sm text-muted-foreground">
                        Please enter the 4-digit code sent to your email.
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col items-center justify-center w-full gap-6">
                    <InputOTP optValue={optValue} setOptValue={setOptValue} />
                    {authFlow.validate && (
                        <p className="text-sm text-green-600">
                            OTP validated successfully please wait while you are redirected to the dashboard
                        </p>
                    )}
                    <p className="text-sm text-muted-foreground">{authFlow.timeElapsed}</p>
                    {authFlow.expiry && (
                        <div className='flex flex-col items-center justify-center gap-2'>
                            <p className="text-sm text-red-600 flex flex-row gap-1 justify-start items-center">
                                <Ban className="mr-2 h-4 w-4" /> <span>OOPS your OTP has expired please try again</span>
                            </p>
                            <Button onClick={handleTryAgain} variant="outline"><RefreshCcw className="mr-2 h-4 w-4" /> <span>Try again</span></Button>
                        </div>
                    )}
                    {!authFlow.canTryAgain && (
                        <div className='flex flex-col items-center justify-center gap-2'>
                            <p className="text-sm text-red-600 flex flex-row gap-1 justify-start items-center">
                                <RefreshCwOff className="mr-2 h-4 w-4" /> <span>OOPS you have reached the maximum number of retries please try again after 1 hour</span>
                            </p>
                        </div>
                    )}
                </CardContent>

                <CardFooter className="flex justify-end w-full pt-0">
                    <Button type="submit" disabled={loading} className="w-full">
                        {loading ? <><LucideLoader className="mr-2 h-4 w-4 animate-spin" /> Validating...</> : <><LucideArrowRight className="mr-2 h-4 w-4" /> Validate</>}
                    </Button>
                </CardFooter>
                </form>
            </Card>
        </main>
    );
}
