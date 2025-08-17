import { BasicUserFieldsValidator } from './BasicUserFieldsValidator';
import { z } from 'zod';

export const CommentValidator = z.object({
    _id: z.string(),
    content: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    __v: z.number().int(),
    creatorId:z.object({...BasicUserFieldsValidator.shape}),
});

export type Comment = z.infer<typeof CommentValidator>;
