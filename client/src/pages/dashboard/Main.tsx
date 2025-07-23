import { AreaChart } from '@/components/charts/AreaChart'
import StatsCard from '@/components/main/StatsCard'
import { DataTable } from '@/components/main/Table'
import { Briefcase, CircleCheckBig, StickyNote, Users } from 'lucide-react'

export default function Main() {
  return (
    <main className="flex overflow-x-hidden flex-col gap-4 justify-start items-center w-full min-h-screen pt-15">
        <section className='flex flex-row flex-wrap gap-2 justify-center items-center px-4 w-full max-w-7xl'>
            <StatsCard 
                title="Teams"
                icon={<Users />} 
                value={'0'} 
                extra=''
            />
            <StatsCard 
                title="Workspaces" 
                icon={<Briefcase />} 
                value={'0'} 
                extra=''
            />
            <StatsCard 
                title="Tasks"
                icon={<CircleCheckBig />} 
                value={'0'} 
                extra=''
            />
            <StatsCard 
                title="Blogs" 
                icon={<StickyNote />} 
                value={'0'} 
                extra=''
            />
        </section>
        <section className='flex flex-row flex-wrap gap-4 justify-center items-center px-4 w-full max-w-7xl'>
            <AreaChart 
                title="Monthly Revenue"
                description="Revenue trends over the past 12 months"
                data={[
                    { xValue: 'Jan', yValue: Math.random()*50 },
                    { xValue: 'Feb', yValue: Math.random()*50 },
                    { xValue: 'Mar', yValue: Math.random()*50 },
                    { xValue: 'Apr', yValue: Math.random()*50 },
                    { xValue: 'May', yValue: Math.random()*50 },
                    { xValue: 'Jun', yValue: Math.random()*50 },
                    { xValue: 'Jul', yValue: Math.random()*50 },
                    { xValue: 'Aug', yValue: Math.random()*50 },
                    { xValue: 'Sep', yValue: Math.random()*50 },
                    { xValue: 'Oct', yValue: Math.random()*50 },
                    { xValue: 'Nov', yValue: Math.random()*50 },
                    { xValue: 'Dec', yValue: Math.random()*50 },
                ]}
                height={250}
                colorScheme="primary"
                trendValue={12.5}
                trendPeriod="January - December 2024"
                className="flex-1 min-w-[300px]"
            />
            <AreaChart 
                title="User Growth"
                description="New user registrations per month"
                data={[
                    { xValue: 'Jan', yValue: Math.random()*100 },
                    { xValue: 'Feb', yValue: Math.random()*100 },
                    { xValue: 'Mar', yValue: Math.random()*100 },
                    { xValue: 'Apr', yValue: Math.random()*100 },
                    { xValue: 'May', yValue: Math.random()*100 },
                    { xValue: 'Jun', yValue: Math.random()*100 },
                    { xValue: 'Jul', yValue: Math.random()*100 },
                    { xValue: 'Aug', yValue: Math.random()*100 },
                    { xValue: 'Sep', yValue: Math.random()*100 },
                    { xValue: 'Oct', yValue: Math.random()*100 },
                    { xValue: 'Nov', yValue: Math.random()*100 },
                    { xValue: 'Dec', yValue: Math.random()*100 },
                ]}
                height={250}
                colorScheme="success"
                trendValue={8.3}
                trendPeriod="January - December 2024"
                className="flex-1 min-w-[300px]"
            />
            <AreaChart 
                title="Task Completion"
                description="Tasks completed per week"
                data={[
                    { xValue: 'Week 1', yValue: Math.random()*200 },
                    { xValue: 'Week 2', yValue: Math.random()*200 },
                    { xValue: 'Week 3', yValue: Math.random()*200 },
                    { xValue: 'Week 4', yValue: Math.random()*200 },
                    { xValue: 'Week 5', yValue: Math.random()*200 },
                    { xValue: 'Week 6', yValue: Math.random()*200 },
                    { xValue: 'Week 7', yValue: Math.random()*200 },
                    { xValue: 'Week 8', yValue: Math.random()*200 },
                    { xValue: 'Week 9', yValue: Math.random()*200 },
                    { xValue: 'Week 10', yValue: Math.random()*200 },
                    { xValue: 'Week 11', yValue: Math.random()*200 },
                    { xValue: 'Week 12', yValue: Math.random()*200 },
                ]}
                height={250}
                colorScheme="purple"
                trendValue={-2.1}
                trendPeriod="Q1 - Q4 2024"
                className="flex-1 min-w-[300px]"
            />
        </section>
        <section className='flex flex-row flex-wrap gap-4 justify-center items-center px-4 w-full max-w-7xl'>
            <AreaChart 
                title="Website Traffic"
                description="Daily page views and visitors"
                data={[
                    { xValue: 'Mon', yValue: Math.random()*1000 },
                    { xValue: 'Tue', yValue: Math.random()*1000 },
                    { xValue: 'Wed', yValue: Math.random()*1000 },
                    { xValue: 'Thu', yValue: Math.random()*1000 },
                    { xValue: 'Fri', yValue: Math.random()*1000 },
                    { xValue: 'Sat', yValue: Math.random()*1000 },
                    { xValue: 'Sun', yValue: Math.random()*1000 },
                ]}
                height={250}
                colorScheme="info"
                trendValue={15.7}
                trendPeriod="This week vs last week"
                className="flex-1 min-w-[300px]"
            />
            <AreaChart 
                title="Conversion Rate"
                description="Lead to customer conversion percentage"
                data={[
                    { xValue: 'Q1', yValue: Math.random()*20 },
                    { xValue: 'Q2', yValue: Math.random()*20 },
                    { xValue: 'Q3', yValue: Math.random()*20 },
                    { xValue: 'Q4', yValue: Math.random()*20 },
                ]}
                height={250}
                colorScheme="warning"
                trendValue={3.2}
                trendPeriod="Q1 - Q4 2024"
                className="flex-1 min-w-[300px]"
            />
            <AreaChart 
                title="Customer Satisfaction"
                description="Average customer satisfaction score"
                data={[
                    { xValue: 'Jan', yValue: 4.2 + Math.random()*0.6 },
                    { xValue: 'Feb', yValue: 4.2 + Math.random()*0.6 },
                    { xValue: 'Mar', yValue: 4.2 + Math.random()*0.6 },
                    { xValue: 'Apr', yValue: 4.2 + Math.random()*0.6 },
                    { xValue: 'May', yValue: 4.2 + Math.random()*0.6 },
                    { xValue: 'Jun', yValue: 4.2 + Math.random()*0.6 },
                    { xValue: 'Jul', yValue: 4.2 + Math.random()*0.6 },
                    { xValue: 'Aug', yValue: 4.2 + Math.random()*0.6 },
                    { xValue: 'Sep', yValue: 4.2 + Math.random()*0.6 },
                    { xValue: 'Oct', yValue: 4.2 + Math.random()*0.6 },
                    { xValue: 'Nov', yValue: 4.2 + Math.random()*0.6 },
                    { xValue: 'Dec', yValue: 4.2 + Math.random()*0.6 },
                ]}
                height={250}
                colorScheme="pink"
                trendValue={0.8}
                trendPeriod="January - December 2024"
                className="flex-1 min-w-[300px]"
            />
        </section>
        <section className='flex flex-row flex-wrap gap-2 justify-center items-center px-4 w-full max-w-7xl'>
            <DataTable/>
        </section>
    </main>
  )
}
