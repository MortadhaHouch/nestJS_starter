import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchData } from "../../../utils/fetchData"
import { SkeletonCard } from "@/components/main/SkeletonCard"
import { useCookies } from "react-cookie"
import { ExpandedTeamResponseValidator } from "../../../utils/validators/TeamValidator"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import NotFoundImage from "@/assets/not_found.svg"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LayoutDashboard, MessageCircle, Plus, Search, UserRound, Users } from "lucide-react"
import { useState } from "react"
import { Meteors } from "@/components/main/Meteors"
import { Dialog } from "@/components/main/Dialog"
import { NavLink } from "react-router-dom"
export default function Teams() {
  const [cookie,,] = useCookies(["auth_token"])
  const [searchQuery,setSearchQuery] = useState("")
  const [page,setPage] = useState(1)
  const {data,isLoading,error} = useQuery({
    queryKey:["teams",page],
    queryFn:()=>fetchData(`/team?page=${page}`,"GET",cookie.auth_token,null)
  })
  console.log(data);
  const [team,setTeam] = useState<{name:string,description:string}>({
    name:"",
    description:""
  })
  const [createTeamError,setCreateTeamError] = useState<string>("")
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setTeam({...team,[e.target.name]:e.target.value})
  }
  const queryClient = useQueryClient()
  const onSuccess = () => {
    setTeam({
      name:"",
      description:""
    })
    queryClient.invalidateQueries({
      queryKey:["teams",page]
    })
  }
  const handleFetch = useMutation({
    mutationFn:async()=>{
      const response = await fetchData(`/team/page=${page}`,"GET",cookie.auth_token,null);
      return response;
    },
    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey:["teams",page]
      })
    }
  })
  const createTeam = useMutation({
    mutationFn:async(team:{name:string,description:string})=>{
      const response = await fetchData("/team","POST",cookie.auth_token,team);
      return response;
    },
    onSuccess,
    onError:(error)=>{
      setCreateTeamError(error.message)
    }
  })
  if (isLoading){
    return (
      <main className="flex flex-col items-center justify-center w-screen min-h-screen p-4 pt-20 max-w-7xl">
        <section className="flex flex-col items-center justify-start w-full min-h-screen max-w-7xl">
          <h2 className="text-4xl font-bold">Teams</h2>
          <div className="flex flex-row flex-wrap items-center justify-start w-full min-h-screen max-w-7xl gap-4">
            {
              Array.from({length:10}).map((_,idx)=>{
                return (
                  <SkeletonCard key={idx}/>
                )
              })
            }
          </div>
        </section>
      </main>
    )
  }
  if(error){
    console.log(error);
    return (
      <main className="flex flex-col items-center justify-start w-screen min-h-screen p-4 pt-20 max-w-7xl">
        <section className='flex flex-col items-center justify-start w-full min-h-screen max-w-7xl'>
          <h2 className='text-4xl font-bold'>Teams</h2>
          <p className="text-red-500">{error.message}</p>
        </section>
      </main>
    )
  }
  const parsedData = ExpandedTeamResponseValidator.safeParse(data)
  if (!parsedData.success){
    console.log(parsedData.error);
    return (
      <main className="flex flex-col items-center justify-start w-screen min-h-screen p-4 pt-20 max-w-7xl">
        <section className='flex flex-col items-center justify-start w-full min-h-screen max-w-7xl'>
          <h2 className='text-4xl font-bold'>Teams</h2>
          <p className="text-red-500">{parsedData.error.message}</p>
        </section>
      </main>
    )
  }
  const action = async() => {
    try {
      const response = await createTeam.mutateAsync(team);
      setCreateTeamError(Array.isArray(response.message)?response.message.join(","):response.message)
    } catch (error) {
      setCreateTeamError((error as Error).message)
    }
  }
  return (
    <main className="flex flex-col items-center w-full min-h-screen px-4 pt-20">
      <section className="w-full max-w-7xl">
        <Meteors
          title="Team Management"
          description="Find and join teams to collaborate on projects"
          containerClassName="w-full"
        >
          <div className="flex flex-row items-center w-full gap-4 mb-8">
            <Input
              type="text"
              placeholder="Search teams"
              className="flex-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              variant="outline"
              disabled={searchQuery.trim() === ""}
              onClick={() => console.log(searchQuery)}
              className="gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </Button>
            <Dialog
              title="Create Team"
              description="Create a new team"
              actionTitle="Create"
              action={action}
              trigger={<Button variant="outline" className="gap-2"><Plus className="w-4 h-4" /><span>Create Team</span></Button>}
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Name</label>
                <Input
                  type="text"
                  placeholder="Team Name"
                  className="w-full"
                  value={team.name}
                  onChange={(e) => handleChange(e)}
                  name="name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="description">Description</label>
                <Input
                  type="text"
                  placeholder="Team Description"
                  className="w-full"
                  value={team.description}
                  onChange={(e) => handleChange(e)}
                  name="description"
                />
              </div>
              {
                createTeamError && (
                  <div className="text-red-500">
                    <ul>
                      {
                        createTeamError.split(",").map((error,idx)=>(
                          <li key={idx}>{error}</li>
                        ))
                      }
                    </ul>
                  </div>
                )
              }
            </Dialog>
          </div>
        </Meteors>


        {/* Pagination Info */}
        <div className="mb-6 text-sm text-gray-500">
          Page {parsedData.data.page} of{" "}
          {Math.ceil(parsedData.data.count / 10)}
        </div>

        {/* Not Found Image */}
        {parsedData.data.teams.length === 0 && (
          <motion.img
            src={NotFoundImage}
            alt="not found"
            className="w-[clamp(300px,50%,500px)] mx-auto mb-8 object-contain"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          />
        )}
        
        {/* Teams Grid */}
        <div className="grid grid-cols-1 gap-6 mb-10 sm:grid-cols-2 lg:grid-cols-3">
          {parsedData.data.teams.filter(team=>team.name.toLowerCase().includes(searchQuery.toLowerCase())).map((team, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <NavLink to={`/dashboard/teams/${team._id}`}>
                <Card className="h-full rounded-2xl border border-border bg-gradient-to-br from-background to-muted/50 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:from-[#0f172a] dark:to-[#1e293b]/60 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
                      <Users className="w-5 h-5 text-primary" />
                      {team.name}
                    </CardTitle>
                  </CardHeader>
              
                  <CardContent className="pb-3 text-sm text-muted-foreground">
                    <p className="line-clamp-3">{team.description}</p>
                  </CardContent>
              
                  <CardFooter className="flex flex-col gap-3 pt-4 text-sm border-t border-muted dark:border-muted/30">
                    
                    <div className="flex items-center gap-2">
                      <UserRound className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">
                        <strong>Creator:</strong> {team.creator.firstName} {team.creator.lastName}
                      </span>
                    </div>
              
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>
                        <strong>Members:</strong> {team.members.length} member{team.members.length !== 1 && "s"}
                      </span>
                    </div>
              
                    <div className="flex items-center gap-2">
                      <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
                      <span>
                        <strong>Workspaces:</strong> {team.workspaces.length} workspace{team.workspaces.length !== 1 && "s"}
                      </span>
                    </div>
              
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-muted-foreground" />
                      <span>
                        <strong>Discussions:</strong> {team.discussions.length} discussion{team.discussions.length !== 1 && "s"}
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              </NavLink>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {Array.from({ length: Math.ceil(parsedData.data.count / 10) }).map((_, idx) => (
            <Button
              key={idx}
              onClick={async()=>{
                setPage(idx+1)
                await handleFetch.mutateAsync()
              }}
              variant="outline"
              className="w-10 h-10 p-0"
            >
              {idx + 1}
            </Button>
          ))}
        </div>
      </section>
    </main>

  )
}