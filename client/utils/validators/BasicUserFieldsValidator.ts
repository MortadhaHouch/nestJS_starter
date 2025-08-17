import { z } from 'zod';

export const BasicUserFieldsValidator = z.object({
    _id:z.string(),
    firstName:z.string(),
    lastName:z.string(),
    email:z.string().email(),
    createdAt:z.string().datetime().optional(),
    updatedAt:z.string().datetime().optional(),
})
export type BasicUserFields = z.infer<typeof BasicUserFieldsValidator>