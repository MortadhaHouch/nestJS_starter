import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useCookies } from "react-cookie"
import { fetchData } from "../../../utils/fetchData"
import { TaskOverviewValidator, type ExpandedTaskOverview } from "../../../utils/validators/TaskOverviewValidator"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SkeletonCard } from "@/components/main/SkeletonCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import NotFoundImage from "@/assets/not_found.svg"
import { TaskPriority, TaskStatus } from "../../../utils/types"
import { DropdownMenu } from "@/components/main/Dropdown"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Check, Circle, Plus, Timer, X } from "lucide-react"
import { Dialog } from "@/components/main/Dialog"
import { Calendar } from "@/components/main/Calendar"
import { Timer as CalendarIcon } from "lucide-react"
import z from "zod"
import { cn } from "@/lib/utils"
import { ViewTaskDetails } from "@/components/main/ViewTaskDetails"
import { EditTask } from "@/components/main/EditTask"
import { DeleteTask } from "@/components/main/DeleteTask"
export default function Tasks() {
  const [cookie,,] = useCookies(["auth_token"])
  const [search,setSearch] = useState("")
  const [selectedStatus,setStatus] = useState<string>(TaskStatus.PENDING)
  const [page,setPage] = useState(1)
  const [selectedPriority,setPriority] = useState<string>(TaskPriority.LOW)
  const [createError,setCreateError] = useState<string>("")
  const queryClient = useQueryClient()
  const {data,error,isLoading,refetch} = useQuery({
    queryKey:["tasks",page],
    queryFn:async()=>await fetchData(`/task?page=${page}`,"GET",cookie.auth_token,null)
  })
  const searchTasksMutation = useMutation({
    mutationFn:async()=>await fetchData(`/task?page=${page}`,"GET",cookie.auth_token,null),
    mutationKey:["tasks",page],
    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey:["tasks",page]
      })
    },
    onError:(error)=>{
      console.log(error.message)
    }
  })
  const [task,setTask] = useState({
    title:"",
    description:"",
    dueDate:new Date(),
    priority:TaskPriority.LOW,
    status:TaskStatus.PENDING
  })
  const createTaskMutation = useMutation({
    mutationFn:()=>fetchData("/task","POST",cookie.auth_token,task),
    mutationKey:["tasks",page],
    onSuccess:()=>{
      setTask({
        title:"",
        description:"",
        dueDate:new Date(),
        priority:TaskPriority.LOW,
        status:TaskStatus.PENDING
      })
      queryClient.invalidateQueries({
        queryKey:["tasks",page]
      })
      refetch()
    },
    onError:(error)=>{
      setCreateError(error.message)
    },
    onMutate: async() => {
      await queryClient.cancelQueries({
        queryKey: ["tasks", page]
      })
      queryClient.setQueryData(['tasks', page], (oldData: {tasks:ExpandedTaskOverview[],count:number,page:number}) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          tasks: [...oldData.tasks, task],
          count: oldData.count + 1
        };
      });
    },
    onSettled: async() => {
      await queryClient.cancelQueries({
        queryKey: ["tasks", page]
      })
    }
  })
  const {success,data:tasks,error:tasksError} = z.object({tasks:TaskOverviewValidator.array(),count:z.number(),page:z.number()}).safeParse(data)
  if(isLoading){
    return (
      <main className="flex flex-row items-center flex-wrap justify-center w-full min-h-screen gap-4 pt-20 overflow-x-hidden">
        {
          Array.from({length:10}).map((_,idx)=>{
            return (
              <SkeletonCard key={idx}/>
            )
          })
        }
      </main>
    )
  }
  if(error || tasksError){
    console.log("error",error);
    console.log("tasksError",tasksError);
    return (
      <main className="flex flex-row items-center flex-wrap justify-center w-full min-h-screen gap-4 pt-20 overflow-x-hidden">
        <p className="text-red-500">Error something went wrong</p>
      </main>
    )
  }
  const getStatusIcon = (status:string)=>{
    switch(status){
      case TaskStatus.PENDING:
        return <Timer className="text-yellow-500"/>
      case TaskStatus.OVERDUE:
        return <X className="text-red-500"/>
      case TaskStatus.DONE:
        return <Check className="text-green-500"/>
    }
  }
  const getPriorityIcon = (priority:string)=>{
    switch(priority){
      case TaskPriority.LOW:
        return <Circle className="text-green-500"/>
      case TaskPriority.MEDIUM:
        return <Circle className="text-yellow-500"/>
      case TaskPriority.HIGH:
        return <Circle className="text-red-500"/>
    }
  }
  const getStatusColor = (status:string)=>{
    switch(status){
      case TaskStatus.PENDING:
        return "text-yellow-500"
      case TaskStatus.OVERDUE:
        return "text-red-500"
      case TaskStatus.DONE:
        return "text-green-500"
    }
  }
  const getPriorityColor = (priority:string)=>{
    switch(priority){
      case TaskPriority.LOW:
        return "text-green-500"
      case TaskPriority.MEDIUM:
        return "text-yellow-500"
      case TaskPriority.HIGH:
        return "text-red-500"
    }
  }
  if(success){
    const filteredTasks = tasks?.tasks?.filter((task)=>task.title.toLowerCase().includes(search.toLowerCase()) || task.description.toLowerCase().includes(search.toLowerCase()))
    .filter((task)=>task.status===selectedStatus)
    .filter((task)=>task.priority===selectedPriority)
    return (
      <main className="flex flex-col items-center justify-start w-full min-h-screen gap-4 pt-20 overflow-x-hidden">
        <div className="flex flex-col items-center justify-center w-full gap-4 p-2">
          <h2 className='text-2xl font-bold text-center md:text-3xl'>Tasks</h2>
          <div className="flex flex-row flex-wrap items-center justify-center w-full gap-4 p-2 transition-all ease-in-out border border-gray-300 rounded-md bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 max-w-7xl">
            <Input
              placeholder="Search task"
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />
            <Button variant="outline" onClick={()=>setSearch("")}>Search task</Button>
            <DropdownMenu trigger={<Button variant="outline">{selectedStatus || "Status"}</Button>}>
              {
                Object.values(TaskStatus).map((status)=>{
                  return (
                    <DropdownMenuItem key={status} onClick={()=>setStatus(status)}>
                      {getStatusIcon(status)} {status == selectedStatus ? <><Check/>{status}</> : status}
                    </DropdownMenuItem>
                  )
                })
              }
            </DropdownMenu>
            <DropdownMenu trigger={<Button variant="outline">{selectedPriority || "Priority"}</Button>}>
              {
                Object.values(TaskPriority).map((priority)=>{
                  return (
                    <DropdownMenuItem key={priority} onClick={()=>setPriority(priority)}>
                      {getPriorityIcon(priority)} {priority == selectedPriority ? <><Check/>{priority}</> : priority}
                    </DropdownMenuItem>
                  )
                })
              }
            </DropdownMenu>
            {
              createError && (
                <p className="text-red-500">{createError}</p>
              )
            }
            <Dialog 
              title="Add Task" 
              description="Add a new task" 
              actionTitle="Add Task" 
              action={()=>createTaskMutation.mutate()}
              trigger={<Button variant="outline"><Plus className="mr-2"/><span>Add Task</span></Button>}
            >
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-sm md:text-base" htmlFor="task-title">Task title</label>
                  <Input id="task-title" placeholder="Task title" onChange={(e)=>setTask({...task,title:e.target.value})}/>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm md:text-base" htmlFor="task-description">Task description</label>
                  <Input id="task-description" placeholder="Task description" onChange={(e)=>setTask({...task,description:e.target.value})}/>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm md:text-base" htmlFor="task-due-date">Task due date</label>
                  <Calendar
                    className="w-full max-w-[20rem]"
                    selected={task.dueDate}
                    onChange={(date)=>setTask({...task,dueDate:date})}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm md:text-base" htmlFor="task-priority">Task priority</label>
                  <DropdownMenu trigger={<Button variant="outline">{selectedPriority || "Priority"}</Button>}>
                  {
                    Object.values(TaskPriority).map((priority)=>{
                      return (
                        <DropdownMenuItem key={priority} onClick={()=>setPriority(priority)}>
                          {getPriorityIcon(priority)} {priority == selectedPriority ? <><Check/>{priority}</> : priority}
                        </DropdownMenuItem>
                      )
                    })
                  }
                </DropdownMenu>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm md:text-base" htmlFor="task-status">Task status</label>
                <DropdownMenu trigger={<Button variant="outline">{selectedStatus || "Status"}</Button>}>
                  {
                    Object.values(TaskStatus).map((status)=>{
                      return (
                        <DropdownMenuItem key={status} onClick={()=>setStatus(status)}>
                          {getStatusIcon(status)} {status == selectedStatus ? <><Check/>{status}</> : status}
                        </DropdownMenuItem>
                      )
                    })
                  }
                </DropdownMenu>
                </div>
              </div>
            </Dialog>
          </div>
        </div>
        <section className="flex flex-row flex-wrap items-center justify-center w-full gap-4">
          {
            filteredTasks.length > 0 ?(
              filteredTasks.map((task,index)=>{
                return (
                  <Card key={index} className="w-full max-w-[20rem] p-2">
                    <CardHeader>
                      <CardTitle>
                        {task.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm md:text-base">{task.description.length > 20 ? task.description.substring(0,20) + "..." : task.description}</p>
                      <p className={cn("flex flex-row items-center gap-2","text-sm md:text-base")}> <span>{task.overdue?<><CalendarIcon className="mr-2"/>{(new Date(task.overdue)).toLocaleDateString()}</>:<><X className="mr-2 text-red-500"/> No due date specified</>}</span></p>
                      <p className={cn(getPriorityColor(task.priority),"flex flex-row items-center gap-2","text-sm md:text-base")}>{getPriorityIcon(task.priority)} <span>{task.priority}</span></p>
                      <p className={cn(getStatusColor(task.status),"flex flex-row items-center gap-2","text-sm md:text-base")}>{getStatusIcon(task.status)} <span>{task.status}</span></p>
                    </CardContent>
                    <CardFooter className="flex flex-row items-center justify-between gap-2">
                      <ViewTaskDetails id={task._id} cookie={cookie.auth_token}/>
                      <EditTask id={task._id} page={page} cookie={cookie.auth_token}/>
                      <DeleteTask id={task._id} page={page} cookie={cookie.auth_token}/>
                    </CardFooter>
                  </Card>
                )
              })
            ):(
              <div>
                <p>No tasks found</p>
                <img src={NotFoundImage} alt="" className="w-full max-w-[20rem] aspect-square object-cover"/>
              </div>
            )
          }
        </section>
        {
          Array.from({length:Math.ceil(tasks.count/10)}).map((_,idx)=>{
            return (
              <Button 
                variant="outline" 
                className={page === idx+1 ? "bg-primary text-primary-foreground" : ""} 
                key={idx} 
                onClick={async()=>{
                  setPage(idx+1)
                  await searchTasksMutation.mutateAsync()
                }}
              >
                {idx+1}
              </Button>
            )
          })
        }
      </main>
    )
  }
}
