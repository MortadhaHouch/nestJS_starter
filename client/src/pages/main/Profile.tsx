import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { fetchData } from "../../../utils/fetchData";
import { ProfileValidator } from "../../../utils/validators/ProfileValidator";
import { ArrowLeft, Eye, Lock, Mail, Plus, User, InfoIcon, Copy, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { AreaChart } from "@/components/charts/AreaChart";
import type { ProfileAccessLevel } from "utils/types";
import QRCode from "react-qr-code";
import { Dialog } from "@/components/main/Dialog";
import { toast } from "sonner";
import { Blog } from "../../components/main/Blog";
import { FaShare, FaPhone } from "react-icons/fa";
import { LinkIcon } from "@/components/main/LinkIcon";
import { getTrendValue } from "../../../utils/getTrendValue";
import { useCookies } from "react-cookie";
export default function Profile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [cookie,,] = useCookies(["auth_token"]);
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => fetchData(`/user/profile/${id}`, "GET", cookie.auth_token,null),
  });
  console.log(data);
  if (isLoading){
    return (
      <main className="flex flex-col items-center justify-center w-screen min-h-screen p-4 max-w-7xl">
        <section className="grid w-full p-6 mb-6 bg-white shadow-md max-w-7xl md:flex md:flex-col rounded-xl dark:bg-gray-900">
          <Skeleton className="w-12 h-12 rounded-full md:col-span-1 md:row-span-2"/>
          <Skeleton className="w-12 h-12 rounded-md md:col-span-2 md:row-span-1"/>
          <Skeleton className="w-12 h-12 rounded-md md:col-span-2 md:row-span-1"/>
        </section>
        <section className="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center w-full rounded-md">
            <Skeleton className="w-full h-12 rounded-md"/>
            <Skeleton className="w-full h-full"/>
          </div>
          <div className="flex flex-col items-center justify-center w-full rounded-md">
            <Skeleton className="w-full h-12 rounded-md"/>
            <Skeleton className="w-full h-full"/>
          </div>
          <div className="flex flex-col items-center justify-center w-full rounded-md">
            <Skeleton className="w-full h-12 rounded-md"/>
            <Skeleton className="w-full h-full"/>
          </div>
        </section>
      </main>
    ) 
  }

  const { success, data: profileData, error:parseError } = ProfileValidator.safeParse(data);

  if (!success || parseError || error) {
    return (
      <main className="flex flex-col items-center justify-center w-screen min-h-screen p-4">
        <Button className="flex gap-2" onClick={() => navigate(-1)} aria-label="Go back">
          <ArrowLeft /> <span>Go Back</span>
        </Button>
      </main>
    );
  }

  const { user,blogs,tasks,workspaces,teams } = profileData;
  const initials = `${user.firstName[0]?.toUpperCase() || ""}${user.lastName[0]?.toUpperCase() || ""}`;
  const getAccessLevelIcon = (level:ProfileAccessLevel)=>{
    switch(level){
      case "FRIENDS":
        return <User/>;
      case "PRIVATE":
        return <Lock/>;
      case "PUBLIC":
        return <Eye/>
    }
  }
  
  const copyToClipboard = (value:string) => {
    navigator.clipboard.writeText(value);
    toast("QR Code copied to clipboard",{
      duration:2000,
      description:"QR code has been copied to the clipboard , you can share it now",
      action:{
        label:"Share",
        onClick:()=>{
          navigator.clipboard.writeText(value);
        }
      }
    });
  }
  const shareLink = (link:string)=>{
    navigator.share({
      title:`${user.firstName} ${user.lastName}`,
      url:link,
      text:"Share this link"
    })
  }
  const getAge = (birthDate: Date) => {
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--
    return age
  }
  
  return (
    <main className="flex flex-col items-center justify-start w-full min-h-screen px-4 pt-20">
      {/* Profile Header */}
      <section className="w-full p-6 mb-6 bg-white shadow-lg max-w-7xl rounded-xl dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:items-start">
          <Avatar className={`flex items-center justify-center w-20 h-20 text-2xl font-semibold text-white transition-transform duration-300 rounded-full shadow-md bg-slate-300 dark:bg-slate-800 hover:scale-105 border-2 ${user.isLoggedIn?'border-green-500':'border-red-500'}`}>
            <AvatarImage src="" alt={`${user.firstName} ${user.lastName}`} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div className="w-full space-y-3">
            {/* Name */}
            <h1 className="flex flex-row items-center justify-start gap-2 text-3xl font-bold text-center text-gray-900 md:text-left dark:text-white">
              <span>{user.firstName} {user.lastName}</span> {getAccessLevelIcon(user.accessLevel)}
            </h1>
            {/* Friends */}
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <User className="w-4 h-4" />
              <span>{user.friends.length} friends</span>
            </div>
            {/* Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Button variant="outline" className="flex items-center gap-1 px-3 py-1 text-sm cursor-pointer hover:bg-purple-600 hover:text-white">
                <Plus className="w-4 h-4" /> Connect
              </Button>
              <Dialog
                title="Share"
                description="Share your profile with others"
                actionTitle={
                  <div className="flex items-center gap-2">
                    <Copy className="w-4 h-4" />
                    <span>Copy Link</span>
                  </div>
                }
                action={() => copyToClipboard(window.location.href)}
                trigger={
                  <Button variant="outline" className="flex items-center gap-2 px-3 py-2 text-sm">
                    <InfoIcon className="w-4 h-4" />
                    Show more info
                  </Button>
                }
                triggerAction={() => copyToClipboard(window.location.href)}
              >
                <div className="flex flex-col max-w-md gap-6 p-4 sm:p-6">
                  {/* QR Section */}
                  <div className="flex flex-col items-center gap-3 p-4 bg-gray-100 shadow-sm dark:bg-gray-800 rounded-xl">
                    <QRCode value={window.location.href} className="w-32 h-32" />
                    <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                      Scan or share this QR to access your profile.
                    </p>
                  </div>

                  {/* User Info */}
                  <div className="flex flex-col gap-3 text-sm text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{user.firstName} {user.lastName}</span>
                    </div>
                    <div
                      onClick={() => copyToClipboard(user.email)}
                      className="flex items-center gap-2 transition cursor-pointer hover:text-purple-600"
                    >
                      <Mail className="w-4 h-4" />
                      <a href={`mailto:${user.email}`} className="underline underline-offset-2">{user.email}</a>
                    </div>
                    {user.createdAt && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Member since {new Date(user.createdAt).toLocaleDateString()}</span>
                      </div>
                    )}
                    {user.birthDate && (
                      <div className="flex items-center gap-2">
                        <span>🎂</span>
                        <span>
                          {new Date(user.birthDate).toLocaleDateString()} ({getAge(new Date(user.birthDate))} years old)
                        </span>
                      </div>
                    )}
                    {user.phoneNumber && (
                      <div
                        onClick={() => copyToClipboard(user.phoneNumber.toString())}
                        className="flex items-center gap-2 transition cursor-pointer hover:text-purple-600"
                      >
                        <FaPhone className="w-4 h-4" />
                        <a href={`tel:${user.phoneNumber}`} className="underline underline-offset-2">
                          {user.phoneNumber}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Divider */}
                  <hr className="border-gray-200 dark:border-gray-700" />

                  {/* Social Media Section */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Social Media</h3>
                    <div className="flex flex-wrap gap-2">
                      {user.socialMediaLinks?.map((link: string, idx: number) => (
                        <a
                          key={idx}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 transition border border-gray-200 rounded-lg dark:border-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          {LinkIcon(link)}
                          <span className="truncate max-w-[160px]">{link.replace(/^https?:\/\//, '')}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </Dialog>
              <Button variant="outline" onClick={()=>shareLink(window.location.href)} className="flex gap-2 cursor-pointer">
                <FaShare/> <span>Share Link</span>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="grid w-full grid-cols-1 gap-6 p-6 mb-6 bg-white shadow-md max-w-7xl rounded-xl dark:bg-gray-900 md:grid-cols-2">
        <AreaChart 
          title="Tasks"
          description="Tasks distribution by month"
          data={tasks.map((t)=>{
            return {
              xValue:t.createdAt,
              yValue:tasks
            }
          })}
          colorScheme="success"
          trendValue={getTrendValue(tasks)}
          trendPeriod={new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long' }).format(new Date())}
          className="h-full"
          gradientColors={{
            start:"red",
            end:"black"
          }}
          showTrend
          strokeColor="red"
          showGrid
          showYAxis
          strokeWidth={1}
        />

        <AreaChart 
          title="Workspaces"
          description="Workspaces created over time"
          data={workspaces.map((w)=>{
            return {
              xValue:w.createdAt,
              yValue:workspaces
            }
          })}
          colorScheme="info"
          trendValue={getTrendValue(workspaces)}
          trendPeriod={new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long' }).format(new Date())}
          className="h-full"
          showTrend
          strokeColor="blue"
          showGrid
          showYAxis
          strokeWidth={1}
        />

        <AreaChart 
          title="Teams"
          description="Team creation distribution"
          data={teams.map((t)=>{
            return {
              xValue:t.createdAt,
              yValue:teams
            }
          })}
          colorScheme="purple"
          trendValue={getTrendValue(teams)}
          trendPeriod={new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long' }).format(new Date())}
          className="h-full md:col-span-2"
          showTrend
          showGrid
          showYAxis
          strokeColor="purple"
          strokeWidth={1}
        />
      </section>
      <section className="flex flex-col items-center justify-start w-full gap-6 p-6 mb-6 bg-white shadow-md max-w-7xl rounded-xl dark:bg-gray-900">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Blogs</h2>
        {
          blogs.sort((b1,b2)=>(b1.isPinned || false)>(b2.isPinned || false)?1:-1).map((blog,idx)=>{
            return(
              <Blog key={idx} blog={blog}/>
            )
          })
        }
      </section>
    </main>
  );
}