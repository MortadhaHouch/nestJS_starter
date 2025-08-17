import { useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchData } from "../../../utils/fetchData"
import { type ExpandedTaskOverview } from "../../../utils/validators/TaskOverviewValidator"
import { TaskPriority, TaskStatus } from "../../../utils/types"
import { Button } from "../ui/button"
import { Dialog } from "../main/Dialog"
import { Input } from "../ui/input"
import { useState, type ChangeEvent } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "../ui/badge"
import { Edit, Plus, Trash } from "lucide-react"
import { Calendar } from "../main/Calendar"
import { getPriorityColor, getStatusColor } from "../../../utils/constants"
import CheckListItem from "./CheckListItem"

export const EditTask = ({id,page,cookie}: {id: string, page: number,cookie: string}) => {
    const queryClient = useQueryClient()
    const [editError,setEditError] = useState<string>("")
    const [task,setTask] = useState<Omit<ExpandedTaskOverview,"creator"|"_id"|"createdAt"|"updatedAt">>({
      title:"",
      description:"",
      status:TaskStatus.PENDING,
      priority:TaskPriority.LOW,
      overdue:"",
      assignees:[{
        _id:"",
        firstName:"",
        lastName:"",
        email:"",
      }],
      checklist:[{
        _id:"",
        name:"",
        checked:false
      }],
      comments:[],
      attachments:[],
      notes:[],
      color:"",
  
    })
    const editTaskMutation = useMutation({
      mutationFn:()=>fetchData(`/task/${id}`,"PATCH",cookie,task),
      mutationKey:["tasks",page],
      onSuccess:()=>{
        queryClient.invalidateQueries({
          queryKey:["tasks",page]
        })
      },
      onError:(error)=>{
        setEditError(error.message)
      }
    })
    return (
      <Dialog
        title="Edit Task"
        description="Edit task details"
        actionTitle="Edit Task"
        action={() => editTaskMutation.mutate()}
        trigger={<Button variant="outline"><Edit className="mr-1"/><span>Edit</span></Button>}
      >
        <div className="space-y-4">
          {
            editError && (
              <p className="text-red-500">{editError}</p>
            )
          }
          <div className="space-y-2 flex flex-col">
            <label htmlFor="title">Title</label>
            <Input placeholder="Title" value={task.title} onChange={(e)=>setTask({...task,title:e.target.value})}/>
          </div>
          <div className="space-y-2 flex flex-col">
            <label htmlFor="description">Description</label>
            <Input placeholder="Description" value={task.description} onChange={(e)=>setTask({...task,description:e.target.value})}/>
          </div>
          <div className="space-y-2 flex flex-col">
            <label htmlFor="overdue">Overdue</label>
            <Calendar onChange={(date)=>setTask({...task,overdue:date.toISOString()})} selected={task.overdue?new Date(task.overdue):undefined}/>
          </div>
          <div className="space-y-2 flex flex-col">
            <label htmlFor="priority">Priority</label>
            <div className="flex flex-row gap-2">
              {
                Object.values(TaskPriority).map((priority)=>{
                    const color = getPriorityColor(priority)
                    return (
                        <Badge 
                            className={cn(color,priority===task.priority?color.replace("text-","bg-"):"cursor-pointer","px-2 py-1 text-xs")} 
                            key={priority} 
                            onClick={()=>setTask({...task,priority})}
                        >
                            {priority}
                        </Badge>
                    )
                })
              }
            </div>
          </div>
          <div className="space-y-2 flex flex-col">
            <label htmlFor="status">Status</label>
            <div className="flex flex-row gap-2">
              {
                Object.values(TaskStatus).map((status)=>{
                    const color = getStatusColor(status)
                    return (
                        <Badge 
                            className={cn(color,status===task.status?color.replace("text-","bg-"):"cursor-pointer","px-2 py-1 text-xs")} 
                            key={status} 
                            onClick={()=>setTask({...task,status})}
                        >
                            {status}
                        </Badge>
                    )
                })
              }
            </div>
          </div>
          <div className="space-y-2 flex flex-col">
            <label htmlFor="color">Color</label>
            <Input placeholder="Color" value={task.color} type="color" onChange={(e)=>setTask({...task,color:e.target.value})}/>
          </div>
          <div className="space-y-2 flex flex-col">
            <label htmlFor="assignees">Assignees</label>
            {
            task.assignees?.map((assignee)=>{
              return (
                <div key={assignee._id} className="flex flex-row gap-2">
                  <Input placeholder={assignee.firstName} value={assignee._id} onChange={()=>setTask({...task})}/>
                  <Button className="cursor-pointer flex items-center" variant="outline" onClick={()=>setTask({...task,assignees:task.assignees?.filter((assignee)=>assignee._id!==assignee._id)})}><Trash className="mr-1 h-4 w-4 cursor-pointer text-red-500 hover:text-red-700"/></Button>
                </div>
              )
            })
          }
          </div>
          <div className="space-y-2 flex flex-col">
            <label htmlFor="comments">Comments</label>
            {
                task.comments?.map((comment)=>{
                    return (
                        <div key={comment} className="flex flex-row gap-2">
                            <Input placeholder={comment} value={comment} onChange={()=>setTask({...task,comments:task.comments?.map((comment)=>comment)})}/>
                            <Button className="cursor-pointer flex items-center" variant="outline" onClick={()=>setTask({...task,comments:task.comments?.filter((comment)=>comment!==comment)})}><Trash className="mr-1 h-4 w-4 cursor-pointer text-red-500 hover:text-red-700"/></Button>
                        </div>
                    )
                })
            }
            <div className="flex flex-row gap-2">
                <Input placeholder="Comment" value={task.comments?.[task.comments?.length-1]||""} onChange={(e)=>setTask({...task,comments:[...task.comments||[],e.target.value]})}/>
                <Button className="cursor-pointer flex items-center" variant="outline" onClick={()=>setTask({...task,comments:[...task.comments||[],task.comments?.[task.comments?.length-1]||""+1]})}><Plus className="mr-1 h-4 w-4 cursor-pointer text-red-500 hover:text-red-700"/></Button>
            </div>
          </div>
          <div className="space-y-2 flex flex-col">
            <label htmlFor="attachments">Attachments</label>
            {
                task.attachments?.map((attachment)=>{
                    return (
                        <div key={attachment} className="flex flex-row gap-2">
                            <Input placeholder={attachment} value={attachment} onChange={()=>setTask({...task,attachments:task.attachments?.map((attachment)=>attachment)})}/>
                            <Button className="cursor-pointer flex items-center" variant="outline" onClick={()=>setTask({...task,attachments:task.attachments?.filter((attachment)=>attachment!==attachment)})}><Trash className="mr-1 h-4 w-4 cursor-pointer text-red-500 hover:text-red-700"/></Button>
                        </div>
                    )
                })
            }
            <div className="flex flex-row gap-2">
                <Input placeholder="Attachment" value={task.attachments?.[task.attachments?.length-1]||""} onChange={(e)=>setTask({...task,attachments:[...task.attachments||[],e.target.value]})}/>
                <Button className="cursor-pointer flex items-center" variant="outline" onClick={()=>setTask({...task,attachments:[...task.attachments||[],task.attachments?.[task.attachments?.length-1]||""+1]})}><Plus className="mr-1 h-4 w-4 cursor-pointer text-red-500 hover:text-red-700"/></Button>
            </div>
          </div>
          <div className="space-y-2 flex flex-col">
            <label htmlFor="notes">Notes</label>
            {
              task.notes?.map((note)=>{
                return (
                  <div key={note} className="flex flex-row gap-2">
                    <Input placeholder={note} value={note} onChange={()=>setTask({...task,notes:task.notes?.map((note)=>note)})}/>
                    <Button className="cursor-pointer flex items-center" variant="outline" onClick={()=>setTask({...task,notes:task.notes?.filter((note)=>note!==note)})}><Trash className="mr-1 h-4 w-4 cursor-pointer text-red-500 hover:text-red-700"/></Button>
                  </div>
                )
              })
            }
            <div className="flex flex-row gap-2">
                <Input placeholder="Note" value={task.notes?.[task.notes?.length-1]||""} onChange={(e)=>setTask({...task,notes:[...task.notes||[],e.target.value]})}/>
                <Button className="cursor-pointer flex items-center" variant="outline" onClick={()=>setTask({...task,notes:[...task.notes||[],task.notes?.[task.notes?.length-1]||""+1]})}><Plus className="mr-1 h-4 w-4 cursor-pointer text-red-500 hover:text-red-700"/></Button>
            </div>
          </div>
          <div className="space-y-2 flex flex-col">
            <label htmlFor="checklist">Checklist</label>
            {
              task.checklist?.map((checklist)=>{
                return (
                  <CheckListItem key={checklist._id} task={task} setTask={(task)=>setTask({...task})}/>
                )
              })
            }
            <div className="flex flex-row gap-2">
                
            </div>
          </div>
        </div>
      </Dialog>
    )
  }
  