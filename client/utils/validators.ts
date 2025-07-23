import { TaskPriority } from './types';
import { TaskStatus } from './types';
import {z} from "zod"

export const TaskOverviewValidator = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    status: z.nativeEnum(TaskStatus),
    priority: z.nativeEnum(TaskPriority),
    dueDate: z.date().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
})
export const BlogValidator = z.object({
    _id: z.string(),
    title: z.string(),
    content: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    creator:z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        _id: z.string(),
    }),
    tags: z.array(z.string()),
    comments: z.array(z.string()),
    likers: z.array(z.string()),
    dislikers: z.array(z.string()),
    views: z.number().min(0),
    bookmarks: z.array(z.string()),
    similarBlogs: z.array(z.string()),
})
export const ExpandedBlogValidator = z.object({
    blog:BlogValidator,
    similarBlogs: z.array(BlogValidator),
    count: z.number(),
    page: z.number()
})
export const BlogResponseValidator = z.object({
    results: z.array(BlogValidator),
    count: z.number(),
    page: z.number()
});
export const BlogCreatorValidator = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    _id: z.string(),
})