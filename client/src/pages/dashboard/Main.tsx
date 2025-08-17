import { AreaChart } from '@/components/charts/AreaChart'
import StatsCard from '@/components/main/StatsCard'
import { DataTable } from '@/components/main/Table'
import { useQuery } from '@tanstack/react-query'
import { Briefcase, CircleCheckBig, StickyNote, Users } from 'lucide-react'
import {fetchData} from "../../../utils/fetchData"
import {useCookies} from "react-cookie"
import {jwtDecode} from "jwt-decode"
import {useNavigate} from "react-router-dom"
import { Button } from '@/components/ui/button'
import { SkeletonCard } from '@/components/main/SkeletonCard'
import { ProfileValidator } from '../../../utils/validators/ProfileValidator'
import { getTrendValue } from '../../../utils/getTrendValue'
export default function Main() {
    const [cookie,,] = useCookies(["auth_token"])
    const {data,error,isLoading} = useQuery({
        queryKey:["dashboard",jwtDecode<{email:string}>(cookie.auth_token).email],
        queryFn:()=>fetchData("/user/dashboard","GET",cookie.auth_token,null)
    })
    console.log(data)
    const navigate = useNavigate();
    if(isLoading){
        return (
            <SkeletonCard/>
        )
    }
    if(error){
        console.log("query",error);
        return (
            <main className="flex flex-col items-center justify-start w-full min-h-screen gap-4 overflow-x-hidden pt-15">
                <p>error</p>
                <Button 
                    onClick={()=>navigate(-1)}
                    variant="secondary"
                >Go back</Button>
            </main>
        )
    }
    const {success,data:profileData,error:parseError} = ProfileValidator.safeParse(data)
    console.log("validator",parseError);
    if(!success){
        return (
            <main className="flex flex-col items-center justify-start w-full min-h-screen gap-4 overflow-x-hidden pt-15">
                <p>error</p>
                <Button 
                    onClick={()=>navigate(-1)}
                    variant="secondary"
                >Go back</Button>
            </main>
        )
    }
    const {teams,workspaces,tasks,blogs} = profileData;
  return (
    <main className="flex flex-col items-center justify-start w-full min-h-screen gap-4 overflow-x-hidden pt-15">
        <section className='flex flex-row flex-wrap items-center justify-center w-full gap-2 px-4 max-w-7xl'>
            <StatsCard 
                title="Teams"
                icon={<Users />} 
                value={teams.length.toString()} 
                extra=''
                progress={getTrendValue(teams)}
            />
            <StatsCard 
                title="Workspaces" 
                icon={<Briefcase />} 
                value={workspaces.length.toString()} 
                extra=''
                progress={getTrendValue(workspaces)}
            />
            <StatsCard 
                title="Tasks"
                icon={<CircleCheckBig />} 
                value={tasks.length.toString()} 
                extra=''
                progress={getTrendValue(tasks)}
            />
            <StatsCard 
                title="Blogs" 
                icon={<StickyNote />} 
                value={blogs.length.toString()} 
                extra=''
                progress={getTrendValue(blogs)}
            />
        </section>
        <section className='flex flex-row flex-wrap items-center justify-center w-full gap-4 px-4 max-w-7xl'>
            <AreaChart 
                title="Monthly Revenue"
                description="Revenue trends over the past 12 months"
                data={teams.map((t)=>{
                    return {
                      xValue:t.createdAt,
                      yValue:teams
                    }
                  })}
                height={250}
                colorScheme="primary"
                trendValue={12.5}
                trendPeriod="January - December 2024"
                className="flex-1 min-w-[300px]"
                showTrend
                showGrid
                showYAxis
                strokeColor="blue"
                strokeWidth={1}
            />
            <AreaChart 
                title="User Growth"
                description="New user registrations per month"
                data={workspaces.map((w)=>{
                    return {
                      xValue:w.createdAt,
                      yValue:workspaces
                    }
                  })}
                height={250}
                colorScheme="success"
                trendValue={8.3}
                trendPeriod="January - December 2024"
                className="flex-1 min-w-[300px]"
                showTrend
                showGrid
                showYAxis
                strokeColor="blue"
                strokeWidth={1}
            />
            <AreaChart 
                title="Task Completion"
                description="Tasks completed per week"
                data={tasks.map((t)=>{
                    return {
                      xValue:t.createdAt,
                      yValue:tasks
                    }
                  })}
                height={250}
                colorScheme="purple"
                trendValue={-2.1}
                trendPeriod="Q1 - Q4 2024"
                className="flex-1 min-w-[300px]"
                showTrend
                showGrid
                showYAxis
                strokeColor="blue"
                strokeWidth={1}
            />
        </section>
        <section className='flex flex-row flex-wrap items-center justify-center w-full gap-4 px-4 max-w-7xl'>
            <AreaChart 
                title="Website Traffic"
                description="Daily page views and visitors"
                data={workspaces.map((w)=>{
                    return {
                      xValue:w.createdAt,
                      yValue:workspaces
                    }
                  })}
                height={250}
                colorScheme="info"
                trendValue={15.7}
                trendPeriod="This week vs last week"
                className="flex-1 min-w-[300px]"
                showTrend
                showGrid
                showYAxis
                strokeColor="blue"
                strokeWidth={1}
            />
            <AreaChart 
                title="Conversion Rate"
                description="Lead to customer conversion percentage"
                data={workspaces.map((w)=>{
                    return {
                      xValue:w.createdAt,
                      yValue:workspaces
                    }
                  })}
                height={250}
                colorScheme="warning"
                trendValue={3.2}
                trendPeriod="Q1 - Q4 2024"
                className="flex-1 min-w-[300px]"
                showTrend
                showGrid
                showYAxis
                strokeColor="blue"
                strokeWidth={1}
            />
            <AreaChart 
                title="Customer Satisfaction"
                description="Average customer satisfaction score"
                data={workspaces.map((w)=>{
                    return {
                      xValue:w.createdAt,
                      yValue:workspaces
                    }
                  })}
                height={250}
                colorScheme="pink"
                trendValue={0.8}
                trendPeriod="January - December 2024"
                className="flex-1 min-w-[300px]"
                showTrend
                showGrid
                showYAxis
                strokeColor="blue"
                strokeWidth={1}
            />
        </section>
        <section className='flex flex-row flex-wrap items-center justify-center w-full gap-2 px-4 max-w-7xl'>
            <DataTable/>
        </section>
    </main>
  )
}
