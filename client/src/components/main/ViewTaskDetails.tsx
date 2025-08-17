import { FileIcon } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { fetchData } from "../../../utils/fetchData"
import { ExpandedTaskOverviewValidator } from "../../../utils/validators/TaskOverviewValidator"
import { z } from "zod"
import { getStatusColor } from "../../../utils/constants"
import { getPriorityColor } from "../../../utils/constants"
import { Eye } from "lucide-react"
import { Button } from "../ui/button"
import { Dialog } from "@/components/main/Dialog"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export const ViewTaskDetails = ({id,cookie}: {id: string, cookie: string}) => {
    const {data:task} = useQuery({
      queryKey:["task",id],
      queryFn:async()=>await fetchData(`/task/${id}`,"GET",cookie,null)
    })
    
    if(!task){
      return (
        <Dialog 
          title="Task Not Found"
          description="The requested task could not be found"
          actionTitle="Close"
          action={() => { }}
          trigger={
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2"/>
              <span>View</span>
            </Button>
          }
        >
          <div className="text-center py-4">
            <p className="text-muted-foreground">Task not found or you don't have permission to view it.</p>
          </div>
        </Dialog>
      )
    }
  
    const {success, data:taskData, error} = z.object(
      ExpandedTaskOverviewValidator.shape
    ).safeParse(task)
    if(!success){
      console.error('Task parsing error:', error)
      return (
        <Dialog 
          title="Error"
          description="Failed to load task details"
          actionTitle="Close"
          action={() => { }}
          trigger={
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2"/>
              <span>View</span>
            </Button>
          }
        >
          <div className="space-y-4">
            <p className="text-destructive">There was an error loading this task.</p>
            <p className="text-sm text-muted-foreground">Please try again later or contact support if the issue persists.</p>
          </div>
        </Dialog>
      )
    }
    const completionRate = Math.round((taskData.checklist|| []).filter((item) => item.checked).length / ((taskData.checklist|| []).length == 0 ? 1 : (taskData.checklist|| []).length) || 0)*100;
    return (
      <Dialog
        title="Task Details"
        description="View and manage task information"
        actionTitle="Close"
        action={() => { }}
        trigger={
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            <span>View</span>
          </Button>
        }
      >
        <div className="space-y-6">
          {/* Header Section */}
          <div className="space-y-2"> 
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold tracking-tight">{taskData.title}</h3>
              <div className="flex items-center gap-2">
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium",
                  getStatusColor(taskData.status)
                )}>
                  {taskData.status}
                </span>
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium",
                  getPriorityColor(taskData.priority)
                )}>
                  {taskData.priority}
                </span>
              </div>
            </div>
            
            {taskData.description && (
              <p className="text-muted-foreground">{taskData.description}</p>
            )}
          </div>
  
          {/* Details Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Due Date */}
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-muted-foreground">Due Date</h4>
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span>{taskData.overdue ? new Date(taskData.overdue).toLocaleDateString() : 'No due date'}</span>
              </div>
            </div>
  
            {/* Created At */}
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-muted-foreground">Created</h4>
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span>{new Date(taskData.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
  
          {/* Notes Section */}
          {taskData.notes && (
            taskData.notes.length > 0 ? (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Notes</h4>
                <div className="space-y-2">
                  {taskData.notes.map((note, i) => (
                    <div key={i} className="bg-muted/50 p-3 rounded-lg text-sm">
                      {note}
                    </div>
                  ))}
                </div>
              </div>
            ):(
              <p className="text-muted-foreground">No notes</p>
            )
          )}
  
          {/* Assignees Section */}
          {taskData.assignees && (
            taskData.assignees.length > 0 ? (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Assignees</h4>
                <div className="flex flex-wrap gap-2">
                  {taskData.assignees.map((assignee) => (
                    <div key={assignee._id} className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-lg">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {assignee.firstName[0]}{assignee.lastName?.[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{assignee.firstName} {assignee.lastName}</p>
                      <p className="text-xs text-muted-foreground">{assignee.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            ):(
              <p className="text-muted-foreground">No assignees</p>
            )
          )}
  
          {/* Additional Sections (Comments, Attachments, Checklist) */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Comments */}
            {taskData.comments && taskData.comments.length > 0 ? (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Comments ({taskData.comments.length})</h4>
                <div className="space-y-2">
                  {taskData.comments.map((comment, i) => (
                    <div key={i} className="border-l-2 border-primary/20 pl-3 py-1 text-sm">
                      {comment} 
                    </div>
                  ))}
                </div>
              </div>
            ):(
              <p className="text-muted-foreground">No comments</p>
            )}
  
            {/* Checklist */}
            {taskData.checklist && taskData.checklist.length > 0 ? (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Checklist</h4>
                <p className="text-xs text-muted-foreground">{completionRate}% completed</p>
                <div className="space-y-2">
                  {taskData.checklist.map((item, i) => {
                    return (
                      <div key={i} className="flex items-center gap-2 text-sm">
                      <div className={`h-4 w-4 rounded border ${item.checked ? 'bg-primary' : 'bg-background'}`} />
                      <span className={item.checked ? 'line-through text-muted-foreground' : ''}>
                        {item.name}
                      </span>
                    </div>
                    )
                  })}
                </div>
              </div>
            ): (
              <div className="space-y-2">
                <p className="text-muted-foreground">No checklist</p>
                {completionRate}
              </div>
            )}
          </div>
  
          {/* Attachments */}
          {taskData.attachments && taskData.attachments.length > 0 ? (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Attachments ({taskData.attachments.length})</h4>
              <div className="grid gap-2 grid-cols-2 sm:grid-cols-3">
                {taskData.attachments.map((attachment, i) => (
                  <div key={i} className="border rounded-lg p-2 text-sm flex items-center gap-2">
                    <FileIcon className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{attachment.split('/').pop()}</span>
                  </div>
                ))}
              </div>
            </div>
          ): (
            <p className="text-muted-foreground">No attachments</p>
          )}
        </div>
      </Dialog>
    )
  }