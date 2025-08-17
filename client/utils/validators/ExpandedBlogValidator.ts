import { z } from 'zod';
import { BlogValidator } from './BlogValidator';

export const ExpandedBlogValidator = z.object({
    blog: BlogValidator.nullable(),
    similarBlogs: z.array(BlogValidator),
    count: z.number(),
    page: z.number()
});

export type ExpandedBlog = z.infer<typeof ExpandedBlogValidator>;
