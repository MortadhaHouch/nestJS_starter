import { Input } from '../ui/input'
import { useState} from 'react'
import { Select } from '../ui/select';
import {  TaskPriority, TaskStatus } from "../../../utils/types";
export default function AddTaskForm() {
    const [task,setTask] = useState<{title: string, description: string, status: TaskStatus, priority: TaskPriority}>({
        title: '',
        description: '',
        status: TaskStatus.PENDING,
        priority: TaskPriority.MEDIUM
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTask(prev => ({
            ...prev,
            [name]: value
        }));
    };
    return (
        <div className="grid gap-4">
            <div className="grid gap-3">
                <label htmlFor="name-1">Name</label>
                <Input id="name-1" name="title" defaultValue={task?.title} onChange={handleChange} />
            </div>
            <div className="grid gap-3">
                <label htmlFor="username-1">Username</label>
                <Input id="username-1" name="description" defaultValue={task?.description} onChange={handleChange} />
            </div>
            <Select>
                
            </Select>
        </div>
    )
}
