import { type ChangeEvent, type Dispatch, type SetStateAction } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Trash } from 'lucide-react'
import type { ExpandedTaskOverview } from '../../../utils/validators/TaskOverviewValidator'
export default function taskItem({task,setTask}: {task: ExpandedTaskOverview,setTask: Dispatch<SetStateAction<ExpandedTaskOverview>>}) {
  return (
    <div 
        key={task.checklist?.[task.checklist?.length-1]?._id} 
        className="flex flex-row gap-2"
    >
        <Input 
            type='checkbox' 
            checked={task.checklist?.[task.checklist?.length-1]?.checked}
            onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                setTask({...task})
            }}
        />
        <Input 
            placeholder={task.checklist?.[task.checklist?.length-1]?.name} 
            value={task.checklist?.[task.checklist?.length-1]?.name}
            onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                setTask({...task,checklist:[...task.checklist||[],{name:e.target.value,checked:false,_id:""}],_id:task._id})
            }}
        />
        <Button 
            variant="outline"
            onClick={()=>{
                setTask({...task,checklist:task.checklist?.filter((checklist)=>checklist._id!==task.checklist?.[task.checklist?.length-1]?._id)})
            }}
        >
            <Trash className="mr-1 h-4 w-4 cursor-pointer text-red-500 hover:text-red-700"/>
        </Button>
    </div>
  )
}
