import { useQuery } from "@tanstack/react-query"
import { jwtDecode } from "jwt-decode"
import { useCookies } from "react-cookie"
import { fetchData } from "../../../utils/fetchData"
import { ProfileValidator } from "../../../utils/validators/ProfileValidator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { z } from "zod"
import { BasicUserFieldsValidator } from "../../../utils/validators/BasicUserFieldsValidator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import NotFoundImage from "@/assets/not_found.svg"
export default function Friends() {
  const [cookie,,] = useCookies(["auth_token"])
  const [search,setSearch] = useState("")
  const {data,error,isLoading} = useQuery({
    queryKey:["friends",jwtDecode<{email:string}>(cookie.auth_token).email],
    queryFn:()=>fetchData("/user/friends","GET",cookie.auth_token,null)
  })
  if(isLoading){
    return (
      <main className="flex flex-col items-center justify-start w-full min-h-screen gap-4 overflow-x-hidden pt-15">
        <p>Loading...</p>
      </main>
    )
  }
  const {success,data:friends,error:friendsError} = z.object({...ProfileValidator.shape,friends:BasicUserFieldsValidator.array()}).array().safeParse(data)
  if(error || friendsError){
    console.log("error",error);
    console.log("friendsError",friendsError);
    return (
      <main className="flex flex-col items-center justify-start w-full min-h-screen gap-4 overflow-x-hidden pt-15">
        <p className="text-red-500">Error something went wrong</p>
      </main>
    )
  }
  console.log("friends",friends);
  if(success){
    return (
      <main className="flex flex-col items-center justify-start w-full min-h-screen gap-4 pt-20 overflow-x-hidden">
        <div className="flex flex-col items-center justify-center w-full gap-4 p-2">
          <h2 className='text-2xl font-bold text-center md:text-3xl'>Friends</h2>
          <div className="flex flex-row items-center justify-center w-full max-w-[50rem] gap-4 border border-gray-300 rounded-md p-2 bg-slate-200 hover:bg-slate-300 transition-all ease-in-out dark:bg-slate-800 dark:hover:bg-slate-700 flex-wrap">
            <Input
              placeholder="Search friend"
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />
            <Button variant="outline" onClick={()=>setSearch("")}>Search friend</Button>
          </div>
        </div>
        <section className='flex flex-row flex-wrap items-center justify-center w-full gap-4'>
          {
            friends.length > 0 ?(
              friends?.filter((friend)=>friend.user.firstName.toLowerCase().includes(search.toLowerCase()) || friend.user.lastName.toLowerCase().includes(search.toLowerCase())).map((friend,index)=>{
                return (
                  <Card key={index} className="w-full max-w-[20rem]">
                    <CardHeader>
                      <CardTitle>
                        {friend.user.firstName} {friend.user.lastName}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm md:text-base">{friend.user.email}</p>
                      <p className="text-sm md:text-base">{friend.user.phoneNumber}</p>
                      <p className="text-sm md:text-base">{new Intl.DateTimeFormat("en-US",{dateStyle:"full",timeStyle:"short"}).format(new Date(friend.user.birthDate || ""))}</p>
                    </CardContent>
                  </Card>
                )
              })
            ):(
              <div className="flex flex-col items-center justify-center w-full gap-2">
                <p>No friends found</p>
                <img src={NotFoundImage} alt="" className="w-full max-w-[20rem] aspect-square object-cover"/>
              </div>
            )
          }
        </section>
      </main>
    )
  }
}
