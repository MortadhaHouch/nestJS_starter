import { fetchData } from '../../../utils/fetchData';
import { useCookies } from 'react-cookie';
import { TeamValidator } from '../../../utils/validators/TeamValidator';
import { useQuery ,useQueryClient,useMutation} from '@tanstack/react-query';
import { SkeletonCard } from '@/components/main/SkeletonCard';
import { useParams } from 'react-router';
import { z } from 'zod';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog } from '@/components/main/Dialog';
import { Briefcase, Eye, Info, LucideMail, MessagesSquare, Plus, User2, UsersRound,CircleMinus, User,Mail, CirclePlus, EllipsisVertical, Edit, Delete } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DialogDescription } from '@/components/ui/dialog';
import { DialogContent } from '@radix-ui/react-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { NavLink } from 'react-router-dom';
import NotFoundImage from '@/assets/not_found.svg';
import { useRef, useState,useCallback } from 'react';
import {Combobox} from "../../components/main/Combobox"
import {BasicUserFieldsValidator} from "../../../utils/validators/BasicUserFieldsValidator"
import { DropdownMenu } from '@/components/main/Dropdown';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
export default function Team() {
    const [cookie] = useCookies(["auth_token"])
    const {id} = useParams();
    const [user,setUser] = useState("")
    const searchUsers = async (searchTerm: string, authToken: string) => {
        return fetchData(
            `/user/find?email=${searchTerm}&lastName=${searchTerm}&firstName=${searchTerm}`,
            "GET",
            authToken,
            null
        );
    };
    const searchTimeoutRef = useRef<NodeJS.Timeout>();
    const queryClient = useQueryClient();
    const teamMembersMutation = useMutation({
        mutationKey:["user",user],
        mutationFn:()=>fetchData("/user","POST",cookie.auth_token,{}),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["user",user]})
        }
    })
    const handleAddOrRemoveMember = () =>{
        teamMembersMutation.mutate()
    }
    const { data: results, isLoading: usersLoading, error: usersFetchError } = useQuery({
        queryKey: ["user", user],
        queryFn: () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
                queryClient.invalidateQueries({
                    queryKey: ["user", user],
                })
            }
            return new Promise((resolve) => {
                searchTimeoutRef.current = setTimeout(async () => {
                    try {
                        const data = await searchUsers(user, cookie.auth_token);
                        resolve(data);
                    } catch (error) {
                        console.error("Search error:", error);
                        throw error;
                    }
                }, 500);
            });
        },
        enabled: !!user.trim()
    });
    const foundUsers = BasicUserFieldsValidator.array().safeParse(results);
    const {data,isLoading,error} = useQuery({
        queryKey:["team",id],
        queryFn:async()=>fetchData(`/team/${id}`,"GET",cookie.auth_token,null)
    })
    const parsedData = z.object({team:TeamValidator,isAdmin:z.boolean()}).nullable().safeParse(data)
    const isMember = useCallback(()=>{
        const membersIds = parsedData.data?.team.members.map((u)=>u._id)
        const foundUsersIds = foundUsers.data?.map((u)=>u._id)
        if(membersIds && foundUsersIds){
            return membersIds.some((id)=>foundUsersIds.includes(id))
        }
        return false;
    },[parsedData,foundUsers])
    if(isLoading){
        return (
            <main className="flex flex-col items-center justify-start w-screen min-h-screen p-4 pt-20 max-w-7xl">
                <section className='flex flex-col items-center justify-start w-full min-h-screen max-w-7xl'>
                    <h2 className='text-4xl font-bold'>Teams</h2>
                    <SkeletonCard/>
                </section>
            </main>
        )
    }
    if(error){
        console.log(error);
        return (
            <main className="flex flex-col items-center justify-start w-screen min-h-screen p-4 pt-20 max-w-7xl">
                <section className='flex flex-col items-center justify-start w-full min-h-screen max-w-7xl'>
                    <h2 className='text-4xl font-bold'>Teams</h2>
                    <p className="text-red-500">OOPS something went wrong</p>
                </section>
            </main>
        )
    }
    if (!parsedData.success){
        console.log(parsedData.error);
        return (
            <main className="flex flex-col items-center justify-start w-screen min-h-screen p-4 pt-20 max-w-7xl">
                <section className='flex flex-col items-center justify-start w-full min-h-screen max-w-7xl'>
                    <h2 className='text-4xl font-bold'>Teams</h2>
                    <p className="text-red-500">OOPS something went wrong</p>
                </section>
            </main>
        )
    }
    return (
        <main className='flex flex-col items-center justify-start w-screen min-h-screen gap-4 p-4 pt-20 mx-auto max-w-7xl bg-background text-foreground'>
            {
                parsedData.data ? (
                    <>
                        <section className="grid w-full grid-cols-1 gap-2 p-4 border border-border md:grid-cols-2 rounded-xl bg-muted/20 dark:bg-muted/30 relative">
                            <DropdownMenu 
                                trigger={
                                    <Button variant="outline" className='w-auto gap-2 p-2 absolute top-2 right-2 z-10'>
                                        <EllipsisVertical className="w-6 h-6"/>
                                    </Button>
                                }
                            >
                                    <DropdownMenuItem 
                                        onClick={()=>{}}
                                        className="flex items-center gap-2 hover:bg-accent/20 cursor-pointer">
                                        <Edit 
                                            className="w-6 h-6 text-green-500"
                                        />
                                        <span>Edit</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                        onClick={()=>{}}
                                        className="flex items-center gap-2 hover:bg-accent/20 cursor-pointer">
                                        <Delete className="w-6 h-6 text-red-500"/>
                                        <span>Delete</span>
                                    </DropdownMenuItem>
                            </DropdownMenu>  
                            <h2 className="col-span-1 mb-6 text-2xl font-bold tracking-tight md:col-span-2 md:text-4xl">{parsedData.data.team.name}</h2>
                            <h3 className="col-span-1 gap-2 mb-6 text-lg font-bold tracking-tight md:col-span-2 flex justify-start items-center"><Info className="w-6 h-6" /> <span>{parsedData.data.team.description}</span></h3>
                            <h3 className="col-span-2 gap-2 mb-6 text-lg font-bold tracking-tight md:col-span-1 flex justify-start items-center"><User2 className="w-6 h-6" /> <span>{parsedData.data.team.members.length} Members</span></h3>
                            <h3 className="col-span-2 gap-2 mb-6 text-lg font-bold tracking-tight md:col-span-1 flex justify-start items-center"><Briefcase className="w-6 h-6" /> <span>{parsedData.data.team.workspaces.length} Workspaces</span></h3>
                            <h3 className="col-span-2 gap-2 mb-6 text-lg font-bold tracking-tight md:col-span-1 flex justify-start items-center"><MessagesSquare className="w-6 h-6" /> <span>{parsedData.data.team.discussions.length} Discussions</span></h3>
                            <h3 className="col-span-2 gap-2 mb-6 text-lg font-bold tracking-tight md:col-span-1 flex justify-start items-center"><MessagesSquare className="w-6 h-6" /> <span>{new Intl.DateTimeFormat("en-US",{dateStyle:"full",timeStyle:"short"}).format(new Date(parsedData.data.team.createdAt))}</span></h3>
                        </section>
                        <section className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                            <Card
                                className="col-span-2 md:col-span-1"
                            >
                                <CardHeader>
                                    <CardTitle>
                                        <h3 className="flex items-center gap-2 mb-1 text-lg font-medium"><MessagesSquare className="w-6 h-6" /><span>Discussions</span></h3>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <section>
                                        {parsedData.data.team.discussions.length ? (
                                            <ul className="space-y-1 list-disc list-inside text-muted-foreground">
                                                {parsedData.data.team.discussions.map((discussion: string, idx: number) => (
                                                    <li key={idx}>{discussion}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-sm text-muted-foreground">No discussions yet.</p>
                                        )}
                                    </section>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" className="gap-2"><Plus className="w-4 h-4" /><span>Add Discussion</span></Button>
                                </CardFooter>
                            </Card>
                            <Card className="col-span-2 md:col-span-1">
                                <CardHeader>
                                    <CardTitle>
                                        <h3 className="flex items-center gap-2 mb-1 text-lg font-medium"><Briefcase className="w-4 h-4" /><span>Workspaces</span></h3>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <section className='flex flex-col items-center justify-start w-full max-w-7xl'>
                                        {parsedData.data.team.workspaces.length ? (
                                            <div className="flex flex-wrap gap-2">
                                                {parsedData.data.team.workspaces.map((workspace: string, idx: number) => (
                                                    <Badge key={idx} variant="outline">{workspace}</Badge>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-sm text-muted-foreground">No workspaces added.</p>
                                        )}
                                    </section>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" className="gap-2"><Plus className="w-4 h-4" /><span>Add Workspace</span></Button>
                                </CardFooter>
                            </Card>
                            <Card className="col-span-2">
                                <CardHeader>
                                    <CardTitle>
                                        <h3 className="flex items-center gap-2 mb-1 text-lg font-medium"><UsersRound className="w-4 h-4" /><span>Team Members</span></h3>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <section className='flex flex-col items-center justify-start w-full max-w-7xl'>
                                        {parsedData.data.team.members.length ? (
                                            <div className="grid grid-cols-1 gap-4 mt-2 md:grid-cols-2">
                                                {
                                                    parsedData.data.team.members.length > 5 ? (
                                                        <>
                                                            {
                                                                parsedData.data.team.members.slice(0, 5).map((member, idx: number) => (
                                                                    <div key={idx} className="p-3 border rounded-xl bg-muted/20 dark:bg-muted/30">
                                                                        <p className="font-semibold">{member.firstName} {member.lastName}</p>
                                                                        <p className="text-sm text-muted-foreground">{member.email}</p>
                                                                    </div>
                                                                ))
                                                            }
                                                            </>
                                                        ):(
                                                            parsedData.data.team.members.map((member, idx: number) =>(
                                                                <div key={idx} className="p-3 border rounded-xl bg-muted/20 dark:bg-muted/30">
                                                                    <p className="font-semibold">{member.firstName} {member.lastName}</p>
                                                                    <p className="text-sm text-muted-foreground">{member.email}</p>
                                                                </div>
                                                        ))
                                                    )
                                                }
                                            </div>
                                        ) : (
                                            <p className="text-sm text-muted-foreground">No members in this team.</p>
                                        )}
                                    </section>
                                </CardContent>
                                <CardFooter>
                                    <Dialog 
                                        title="Team Members" 
                                        description="Here are the team members" 
                                        actionTitle={<><Plus className="w-4 h-4" /><span>Add Member</span></>}
                                        action={() => {}}
                                        trigger={<Button variant="outline" className="gap-2"><Eye className="w-4 h-4" /><span>View All</span></Button>}
                                    >
                                        <DialogContent>
                                            <DialogDescription>
                                                {
                                                    parsedData.data.team.members.length ? (
                                                        <ScrollArea className="h-[200px] w-full flex flex-col gap-2">
                                                            {
                                                                parsedData.data.team.members.map((member, idx: number) =>(
                                                                    <div key={idx} className="p-3 border rounded-xl bg-muted/20 dark:bg-muted/30">
                                                                        <p className="font-semibold"><User2 className="w-4 h-4"/><span>{member.firstName} {member.lastName}</span></p>
                                                                        <p className="text-sm text-muted-foreground"><LucideMail className="w-4 h-4"/><span>{member.email}</span></p>
                                                                        <NavLink to={`/dashboard/profile/${member._id}`}><Button variant="outline" className="gap-2"><User2 className="w-4 h-4"/><span>View Profile</span></Button></NavLink>
                                                                    </div>
                                                                ))
                                                            }
                                                        </ScrollArea>
                                                    ) : (
                                                        <div className="flex flex-col items-center justify-center w-full h-full gap-2">
                                                            <p className="text-sm text-muted-foreground">No members in this team.</p>
                                                            <img loading="lazy" src={NotFoundImage} alt="" className='w-[clamp(200px, 20vw, 400px)]' />
                                                        </div>
                                                    )
                                                }
                                            </DialogDescription>
                                        </DialogContent>
                                    </Dialog>
                                    {
                                        parsedData.data.isAdmin && ( 
                                            <Dialog
                                                title="Add Member"
                                                description="Add a new member to this team"
                                                actionTitle="Add"
                                                action={() => {}}
                                                trigger={<Button variant="outline" className="gap-2"><Plus className="w-4 h-4" /><span>Add Member</span></Button>}
                                            >
                                                <div className="w-full">
                                                    <Combobox 
                                                        options={
                                                            foundUsers.success?
                                                            foundUsers.data.map((u)=>{
                                                                return {
                                                                    label:`${u.firstName} ${u.lastName}`,
                                                                    value:u.email
                                                                }
                                                            }):
                                                            []
                                                        }
                                                        value={user}
                                                        setValue={(e:string)=>setUser(e)}
                                                        isError={!!usersFetchError}
                                                        isLoading={usersLoading}
                                                    />
                                                </div>
                                                <div className="w-full flex flex-row justify-center items-center gap-2 flex-wrap">
                                                    {
                                                        foundUsers.data?.map((u)=>{
                                                            return (
                                                                <div className="relative flex flex-col justify-start items-center p-2 gap-1 rounded-md bg-slate-300 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 cursor-pointer w-full">
                                                                    <h3 className="w-full flex flex-row justify-start items-center gap-1">
                                                                        <User/> <span>{u.firstName} {u.lastName}</span>
                                                                    </h3>
                                                                    <h4 className="w-full flex flex-row justify-start items-center gap-1"><Mail/><span>{u.email}</span></h4>
                                                                    {
                                                                        isMember() ? (
                                                                            <CircleMinus 
                                                                                onClick={()=>handleAddOrRemoveMember} 
                                                                                className="absolute top-2 right-2 text-red-500 cursor-pointer hover:text-red-600 hover:shadow-md active:text-red-400"
                                                                            />
                                                                        ):(
                                                                            <CirclePlus
                                                                                onClick={()=>handleAddOrRemoveMember} 
                                                                                className="absolute top-2 right-2 text-green-500 cursor-pointer hover:text-green-600 hover:shadow-md active:text-green-400"
                                                                            />
                                                                        )
                                                                    }
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </Dialog>
                                        )
                                    }
                                </CardFooter>
                            </Card>
                        </section>
                    </>
                ):(
                    <div className="border bg-slate-300 dark:bg-gray-800">
                        <h3>OOPS team not found</h3>
                        <img loading="lazy" src={NotFoundImage} alt="" className='w-[clamp(200px, 20vw, 400px)]' />
                    </div>
                )
            }
        </main>
    )
}
