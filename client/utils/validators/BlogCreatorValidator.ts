import { z } from 'zod';

export const BlogCreatorValidator = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    _id: z.string(),
});

export type BlogCreator = z.infer<typeof BlogCreatorValidator>;
