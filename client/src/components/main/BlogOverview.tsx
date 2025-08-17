import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import type { Blog } from "../../../utils/types"

export default function BlogOverview({blog}:{blog:Blog}) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{blog.title}</CardTitle>
        <CardDescription>{new Date(blog.createdAt).toLocaleDateString()}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{blog.content}</p>
      </CardContent>
    </Card>
  )
}