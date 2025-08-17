import { useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchData } from "../../../utils/fetchData"
import type { ExpandedTaskOverview } from "../../../utils/validators/TaskOverviewValidator"
import { Dialog } from "./Dialog"
import { Button } from "../ui/button"
import { Trash } from "lucide-react"

export const DeleteTask = ({id, page, cookie}: {id: string, page: number, cookie: string}) => {
    const queryClient = useQueryClient()
    const deleteTaskMutation = useMutation({
      mutationFn: () => fetchData(`/task/${id}`, "DELETE", cookie, null),
      onMutate: async () => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries({ queryKey: ['tasks', page] });
        
        // Snapshot the previous value
        const previousTasks = queryClient.getQueryData(['tasks', page]) as {tasks:ExpandedTaskOverview[],count:number,page:number};
        
        // Optimistically update the tasks list
        if (previousTasks?.tasks) {
          queryClient.setQueryData(['tasks', page], {
            ...previousTasks,
            tasks: previousTasks.tasks.filter((task: ExpandedTaskOverview) => task._id !== id),
            count: previousTasks.count - 1
          });
        }
        
        // Remove the task details query if it exists
        queryClient.removeQueries({ queryKey: ['task', id] });
        
        return { previousTasks };
      },
      onError: (err, variables, context) => {
        // If the mutation fails, use the context returned from onMutate to roll back
        if (context?.previousTasks) {
          queryClient.setQueryData(['tasks', page], context.previousTasks);
        }
      },
      onSettled: () => {
        // Always refetch after error or success:
        queryClient.invalidateQueries({ queryKey: ['tasks', page] });
      }
    });

    const handleDelete = async () => {
      try {
        await deleteTaskMutation.mutateAsync();
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    };
  
    return (
      <Dialog
        title="Delete Task"
        description="Are you sure you want to delete this task? This action cannot be undone."
        actionTitle="Delete Task"
        action={handleDelete}
        trigger={
          <Button 
            variant="outline" 
            className="text-red-500 hover:bg-red-50"
            disabled={deleteTaskMutation.isPending}
          >
            <Trash className="mr-1 h-4 w-4"/>
            <span>{deleteTaskMutation.isPending ? 'Deleting...' : 'Delete'}</span>
          </Button>
        }
      >
        <div className="space-y-4">
          <p>This will permanently delete the task and all its associated data.</p>
          {deleteTaskMutation.isError && (
            <p className="text-sm text-red-500">
              Failed to delete task. Please try again.
            </p>
          )}
        </div>
      </Dialog>
    );
  };
  