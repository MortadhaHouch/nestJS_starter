import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Bookmark,
  SquareArrowOutUpRight,
  ThumbsDown,
  ThumbsUp,
  Pin
} from "lucide-react";
import { FaComments } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Dialog } from "./Dialog";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../../utils/fetchData";
import { SkeletonCard } from "./SkeletonCard";
import Comment from "./Comment";
import type { Blog as BlogType, Comment as CommentType } from "../../../utils/types";
import { CommentValidator } from "../../../utils/validators/CommentValidator";
import { useState } from "react";


export function Blog({ blog }: { blog: BlogType }) {
  const [searchComments, setSearchComments] = useState(false);
  const {data,isLoading,isError} = useQuery<{comments:CommentType[],ok:boolean}>({
    queryKey: ['comment', blog._id],
    queryFn: async () => fetchData(`/comment/${blog._id}`, 'GET', "", null),
    enabled: !!blog._id && searchComments,
  })
  const parsedData = CommentValidator.array().safeParse(data?.comments);
  return (
    <Card className="relative w-full max-w-md transition-shadow duration-300 bg-white border border-gray-200 rounded-2xl dark:border-slate-700 hover:shadow-xl dark:bg-slate-900">
        <Button variant="outline" className="absolute top-3 right-3">
          <NavLink 
            to={`/blog/${blog._id}`}
            className="flex flex-row items-center justify-center gap-1"
          >
            <SquareArrowOutUpRight className="w-4 h-4" />
            <span>{blog.views}</span>
          </NavLink>
        </Button>
        {
          blog.isPinned && (
            <Button variant="outline" className="absolute top-3 right-20">
              <Pin className="w-4 h-4"/>
            </Button>
          )
        }
      {/* Header */}
      <CardHeader className="pb-1">
        <div className="flex items-center gap-3">
          <Avatar className="w-9 h-9">
            <AvatarFallback>
              {blog.creator.firstName[0]}
              {blog.creator.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <p className="text-sm font-medium text-gray-800 dark:text-slate-200">
            {blog.creator.firstName} {blog.creator.lastName}
          </p>
        </div>
        <CardTitle className="mt-2 text-xl font-semibold text-gray-900 dark:text-slate-50">
          {blog.title}
        </CardTitle>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-3">
        <p className="text-sm leading-relaxed text-gray-700 dark:text-slate-400">
          {blog.content.length > 150
            ? blog.content.slice(0, 150) + "..."
            : blog.content}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {blog.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      </CardContent>

      {/* Footer Actions */}
      <CardFooter className="grid grid-cols-2 gap-2 pt-4 border-t sm:grid-cols-4">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center justify-center gap-1 transition-all bg-gray-50 dark:bg-slate-800 hover:bg-purple-100 dark:hover:bg-purple-950"
        >
          <ThumbsUp className="w-4 h-4" />
          <span>{blog.likers.length}</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center justify-center gap-1 transition-all bg-gray-50 dark:bg-slate-800 hover:bg-purple-100 dark:hover:bg-purple-950"
        >
          <ThumbsDown className="w-4 h-4" />
          <span>{blog.dislikers.length}</span>
        </Button>
        <Dialog 
          title="View comment"
          description="" 
          actionTitle="Like" 
          action={() => {}}
          triggerAction={() => {
            setSearchComments(true);
          }}
          trigger={
              <Button
                variant="outline"
                size="sm"
                className="flex items-center justify-center gap-1 transition-all bg-gray-50 dark:bg-slate-800 hover:bg-purple-100 dark:hover:bg-purple-950"
              >
                <FaComments className="w-4 h-4" />
                <span>{blog.comments.length}</span>
              </Button>
            }
        >
          {
            isLoading ? (
              <>
                {
                  Array.from({length: blog.comments.length  }).map((_,index) => (
                    <SkeletonCard key={index}/>
                  ))
                }
              </>
            ) : (
              isError ?(
                <p>Something went wrong</p>
              ):(
                <>
                  {
                    parsedData.error ? (
                      <p>Something went wrong</p>
                    ) : (
                      parsedData.data?.map((comment,index) => (
                        <Comment key={index} comment={comment}/>
                      ))
                    )
                  }
                </>
              )
            )
          }
        </Dialog>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center justify-center gap-1 transition-all bg-gray-50 dark:bg-slate-800 hover:bg-purple-100 dark:hover:bg-purple-950"
        >
          <Bookmark className="w-4 h-4" />
          <span>{blog.bookmarks.length}</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
