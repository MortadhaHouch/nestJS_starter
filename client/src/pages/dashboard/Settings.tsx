import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import { fetchData } from '../../../utils/fetchData';
import { ProfileValidator } from '../../../utils/validators/ProfileValidator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { jwtDecode } from 'jwt-decode';
import SettingsImg from "../../assets/settings.svg"
export default function Settings() {
    const [cookie] = useCookies(["auth_token"])
    const [profileData,setProfileData] = useState({
      firstName:"",
      lastName:"",
      password:"",
      socialMediaLinks:[""],
      website:"",
      birthDate:"",
      phoneNumber:""
    })
    const {data,error} = useQuery({
        queryKey:["my-profile",jwtDecode<{email:string}>(cookie.auth_token).email],
        queryFn:async()=>{
            const response = await fetchData("/user/my-profile","GET",cookie.auth_token,null)
            return response
        }
    })
    if(error){
        console.log(error,"query");
        return (
            <main className="flex flex-col items-center justify-start w-full min-h-screen gap-4 overflow-x-hidden pt-15">
                <h2>Settings</h2>
                <p className="text-red-500">OOPS something went wrong</p>
            </main>
        )
    }
    const {success,data:userData,error:parseError} = ProfileValidator.pick({user:true}).optional().safeParse(data)
    console.log("validator",parseError);
    if(!success){
        return (
            <main className="flex flex-col items-center justify-start w-full min-h-screen gap-4 overflow-x-hidden pt-15">
                <h2>Settings</h2>
                <p className="text-red-500">OOPS something went wrong</p>
            </main>
        )
    }
    console.log(userData);
  return (
    <main className="flex flex-col items-center justify-start w-full min-h-screen gap-4 overflow-x-hidden pt-15">
      <h2>Settings</h2>
      <section className="flex flex-row items-center justify-center w-full max-w-7xl min-h-screen gap-2 flex-wrap">
        <img className='w-[clamp(400px,40%,450px)] aspect-square object-cover rounded-md' loading='lazy' src={SettingsImg} alt="Settings" />
        <Card className="w-[clamp(400px,40%,450px)]">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form className='flex flex-col items-start justify-start w-full gap-2'>
              {
                Object.entries(profileData).map(([key,value],index)=>{
                  return (
                    <div key={index} className="flex flex-col items-start justify-start w-full gap-2">
                      <label htmlFor={key}>{key.replace(/([A-Z])/g, ' $1').toLowerCase().trim()}</label>
                      {
                        Array.isArray(value)? (
                          value.map((val,idx)=>{
                            return (
                              <Input 
                                type="text" 
                                name={idx.toString()} 
                                id={idx.toString()} 
                                placeholder={key.replace(/([A-Z])/g, ' $1').toLowerCase().trim()} 
                                value={val} 
                                onChange={(e)=>setProfileData({...profileData,[key]:value.map((val,idx)=>idx===idx?e.target.value:val)})} 
                              />
                            )
                          })
                        ):(
                          <Input 
                            type="text" 
                            name={key} 
                            id={key} 
                            placeholder={key.replace(/([A-Z])/g, ' $1').toLowerCase().trim()} 
                            value={value} 
                            onChange={(e)=>setProfileData({...profileData,[key]:e.target.value})} 
                          />
                        )
                      }
                    </div>
                  )
                })
              }
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
