import { WorkspaceValidator } from './WorkspaceValidator';
import { z } from 'zod';
import {ProfileAccessLevel} from "../types"
import {BasicUserFieldsValidator} from "./BasicUserFieldsValidator"
import { TaskOverviewValidator } from './TaskOverviewValidator';
import { BlogValidator } from './BlogValidator';
import {CommentValidator} from "./CommentValidator"
import { TeamValidator } from './TeamValidator';
export const ProfileValidator = z.object({
    user:z.object({
        ...BasicUserFieldsValidator.shape,
        latestLoginTrial:z.string().datetime().optional(),
        friends:z.array(BasicUserFieldsValidator),
        accessLevel:z.nativeEnum(ProfileAccessLevel),
        views:z.array(BasicUserFieldsValidator),
        isLoggedIn:z.boolean().optional(),
        socialMediaLinks:z.array(z.string()).optional(),
        website:z.string().optional(),
        phoneNumber:z.number().optional(),
        birthDate:z.string().datetime().optional()
    }),
    tasks:z.array(TaskOverviewValidator),
    workspaces:z.array(WorkspaceValidator),
    teams:z.array(TeamValidator),
    blogs:z.array(BlogValidator),
    comments:z.array(CommentValidator)
})
export type Profile = z.infer<typeof ProfileValidator>