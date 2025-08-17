import { z } from 'zod';
import { BlogValidator } from './BlogValidator';

export const BlogResponseValidator = z.object({
    results: z.array(BlogValidator),
    count: z.number(),
    page: z.number()
});

export type BlogResponse = z.infer<typeof BlogResponseValidator>;
