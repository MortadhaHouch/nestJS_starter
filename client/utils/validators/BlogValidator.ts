import { z } from 'zod';
import { CommentValidator } from './CommentValidator';
import { BasicUserFieldsValidator } from './BasicUserFieldsValidator';

export const BlogValidator = z.object({
    _id: z.string(),
    title: z.string(),
    content: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    creator: z.object({...BasicUserFieldsValidator.shape}),
    tags: z.array(z.string()),
    comments: z.array(CommentValidator),
    likers: z.array(z.string()),
    dislikers: z.array(z.string()),
    views: z.number().min(0),
    bookmarks: z.array(z.string()),
    isPinned:z.boolean().optional()
});

export type Blog = z.infer<typeof BlogValidator>;
