import { useQuery } from "@tanstack/react-query"
import { useCookies } from "react-cookie"
import { fetchData } from "../../../utils/fetchData"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog } from "@/components/main/Dialog"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Edit, Plus, Search, User } from "lucide-react"
import { NotesValidator } from "../../../utils/validators/NotesValidator"
import { SkeletonCard } from "@/components/main/SkeletonCard"
import { Separator } from "@/components/ui/separator"
import z from "zod"
import NotFoundImage from "@/assets/not_found.svg"
export default function Notes() {
  const [cookie,,] = useCookies(["auth_token"])
  const [page,setPage] = useState(1)
  const {data,error,isLoading} = useQuery({
    queryKey:["notes",page],
    queryFn:async()=>await fetchData(`/note?page=${page}`,"GET",cookie.auth_token,null)
  })
  const queryClient = useQueryClient()
  const searchNotesMutation = useMutation({
    mutationFn:async()=>await fetchData(`/note?page=${page}`,"GET",cookie.auth_token,null),
    mutationKey:["notes",page],
    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey:["notes",page]
      })
    },
    onError:(error)=>{
      console.log(error)
    }
  })
  const [search,setSearch] = useState("")
  const [note,setNote] = useState<{
    title:string,
    content:string
  }>({
    title:"",
    content:""
  })
  const [selectedNote,setSelectedNote] = useState<{
    title:string,
    content:string,
    _id:string
  }|null>(null)
  const createNoteMutation = useMutation({
    mutationFn:async()=>await fetchData("/note","POST",cookie.auth_token,note),
    mutationKey:["notes",page],
    onSuccess:()=>{
      setNote({
        title:"",
        content:""
      })
      queryClient.invalidateQueries({
        queryKey:["notes",page]
      })
    },
    onError:(error)=>{
      console.log(error)
    }
  })
  const updateNoteMutation = useMutation({
    mutationFn:async()=>await fetchData("/note/"+selectedNote?._id,"PATCH",cookie.auth_token,{title:selectedNote?.title,content:selectedNote?.content}),
    mutationKey:["notes",page],
    onSuccess:()=>{
      setSelectedNote(null)
      setNote({
        title:"",
        content:""
      })
      queryClient.invalidateQueries({
        queryKey:["notes",page]
      })
    },
    onError:(error)=>{
      console.log(error)
    }
  })
  const {success,data:notes,error:notesError} = z.object({notes:NotesValidator.array(),count:z.number(),page:z.number()}).safeParse(data)
  if(isLoading){
    return (
      <main className="flex flex-row items-center justify-center flex-wrap w-full min-h-screen gap-4 pt-20 overflow-x-hidden">
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
  if(error || notesError){
    console.log("error",error);
    console.log("notesError",notesError);
    return (
      <main className="flex flex-col items-center justify-start w-full min-h-screen gap-4 pt-20 overflow-x-hidden">
        <p className="text-red-500">Error something went wrong</p>
      </main>
    )
  }
  if(success){
    const filteredNotes = notes.notes?.filter((note)=>note.title.toLowerCase().includes(search.toLowerCase()) || note.content.toLowerCase().includes(search.toLowerCase()))
    return (
        <main className="flex flex-col items-center justify-start w-full min-h-screen gap-4 overflow-x-hidden pt-15">
          <h2 className='text-2xl font-bold text-center md:text-3xl'>Notes</h2>
          <section className="flex flex-col items-center justify-center w-full max-w-7xl flex-wrap gap-4">
            <div className="flex flex-row flex-wrap items-center justify-center w-full max-w-5xl gap-4 p-2 transition-all ease-in-out border border-gray-300 rounded-md bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 max-w-5xl">
            <Input
              placeholder="Search note"
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />
            <Button variant="outline" onClick={()=>setSearch("")}><Search className="mr-2"/><span>Search note</span></Button>
          </div>
          <Dialog
            title="Add Note"
            description="Add a new note"
            actionTitle="Add Note"
            action={()=>createNoteMutation.mutate()}
            trigger={<Button variant="outline"><Plus className="mr-2"/><span>Add Note</span></Button>}
          >
            <div className="flex flex-col gap-2">
              <Input placeholder="Note title" onChange={(e)=>setNote({...note,title:e.target.value})}/>
              <Input placeholder="Note content" onChange={(e)=>setNote({...note,content:e.target.value})}/>
            </div>
          </Dialog>
        </section>
        <section className="flex flex-row flex-wrap items-center justify-center w-full gap-4">
          {
            filteredNotes?.map((note)=>{
              return (
                <Card key={note._id} className="w-[clamp(200px,30%,20rem)] relative">
                  <Dialog
                    title="Update"
                    description="Update a note"
                    actionTitle="Update"
                    action={()=>updateNoteMutation.mutate()}
                    trigger={<Button variant="outline" className="absolute p-1 w-fit hover:bg-gray-200 dark:hover:bg-gray-800 top-1 right-1" onClick={()=>setSelectedNote(note)}><Edit className="mr-2"/><span>Update</span></Button>}
                  >
                    <div className="flex flex-col gap-2">
                      <Input placeholder="Note title" onChange={(e)=>setSelectedNote({...note,title:e.target.value})}/>
                      <Input placeholder="Note content" onChange={(e)=>setSelectedNote({...note,content:e.target.value})}/>
                    </div>
                  </Dialog>
                  <CardHeader>
                    <CardTitle>{note.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{note.content}</p>
                  </CardContent>
                  <Separator/>
                  <CardFooter className="flex flex-col items-center justify-start gap-2">
                    <p className="flex flex-row items-center w-full gap-2"><User className="mr-2"/> <span>{note.creator.firstName + " " + note.creator.lastName}</span></p>
                    {
                      note.createdAt && (
                        <p className="flex flex-row items-center w-full gap-2"><Calendar className="mr-2"/> <span>{new Intl.DateTimeFormat("en-US").format(new Date(note.createdAt))}</span></p>
                      )
                    }
                    {
                      note.updatedAt && (
                        <p className="flex flex-row items-center w-full gap-2"><Edit className="mr-2"/> 
                          <span>
                            {
                              note.updatedAt === note.createdAt ? (
                                <span>Not updated yet</span>
                              ) : (
                                <span>Updated {new Intl.DateTimeFormat("en-US").format(new Date(note.updatedAt))}</span>
                              )
                            }
                          </span>
                        </p>
                      )
                    }
                  </CardFooter>
                </Card>
              )
            })
          }
        </section>  
        {
          notes?.notes?.length === 0 && (
            <div className="flex flex-col items-center justify-center w-full min-h-screen gap-4">
              <p className="text-center">No notes found</p>
              <img src={NotFoundImage} alt="not found"/>
            </div>
          )
        }
        {
          Array.from({length:Math.ceil(notes.count/10)}).map((_,idx)=>{
            return (
              <Button 
                variant="outline" 
                className={page === idx+1 ? "bg-primary text-primary-foreground" : ""} 
                key={idx} 
                onClick={async()=>{
                  setPage(idx+1)
                  await searchNotesMutation.mutateAsync()
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