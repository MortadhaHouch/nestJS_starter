import type { Blog as BlogType } from "utils/types";
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
} from "lucide-react";
import { FaComments } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export function Blog({ blog }: { blog: BlogType }) {
  return (
    <Card className="relative w-full max-w-md bg-white rounded-2xl border border-gray-200 transition-shadow duration-300 dark:border-slate-700 hover:shadow-xl dark:bg-slate-900">
        <NavLink 
          to={`/blog/${blog._id}`}
          className="flex absolute top-3 right-3 flex-row gap-1 justify-center items-center px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-md dark:text-slate-300 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700"
        >
          <SquareArrowOutUpRight className="w-4 h-4" />
          <span>{blog.views}</span>
        </NavLink>

      {/* Header */}
      <CardHeader className="pb-1">
        <div className="flex gap-3 items-center">
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
          className="flex gap-1 justify-center items-center bg-gray-50 transition-all dark:bg-slate-800 hover:bg-purple-100 dark:hover:bg-purple-950"
        >
          <ThumbsUp className="w-4 h-4" />
          <span>{blog.likers.length}</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex gap-1 justify-center items-center bg-gray-50 transition-all dark:bg-slate-800 hover:bg-purple-100 dark:hover:bg-purple-950"
        >
          <ThumbsDown className="w-4 h-4" />
          <span>{blog.dislikers.length}</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex gap-1 justify-center items-center bg-gray-50 transition-all dark:bg-slate-800 hover:bg-purple-100 dark:hover:bg-purple-950"
        >
          <FaComments className="w-4 h-4" />
          <span>{blog.comments.length}</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex gap-1 justify-center items-center bg-gray-50 transition-all dark:bg-slate-800 hover:bg-purple-100 dark:hover:bg-purple-950"
        >
          <Bookmark className="w-4 h-4" />
          <span>{blog.bookmarks.length}</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
