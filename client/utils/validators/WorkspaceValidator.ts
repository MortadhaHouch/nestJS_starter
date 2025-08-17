import { WorkSpaceStatus } from '../types';
import { BasicUserFieldsValidator } from './BasicUserFieldsValidator';
import { z } from "zod";

export const WorkspaceValidator = z.object({
    _id:z.string(),
    title:z.string().optional(),
    description:z.string(),
    creator:BasicUserFieldsValidator,
    members:z.array(BasicUserFieldsValidator),
    status:z.nativeEnum(WorkSpaceStatus),
    createdAt:z.string().datetime(),
    updatedAt:z.string().datetime()
})

export type Workspace = z.infer<typeof WorkspaceValidator>;