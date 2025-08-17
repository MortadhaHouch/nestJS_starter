import { BasicUserFieldsValidator } from './BasicUserFieldsValidator';
import { z } from "zod";

export const DiscussionValidator = z.object({
    _id:z.string(),
    title:z.string(),
    creator:BasicUserFieldsValidator,
    members:z.array(BasicUserFieldsValidator),
    createdAt:z.string().datetime(),
    updatedAt:z.string().datetime()
})