import { z } from "zod";
import { BasicUserFieldsValidator } from "./BasicUserFieldsValidator";

export const TeamValidator = z.object({
    _id:z.string(),
    creator:BasicUserFieldsValidator,
    members:z.array(BasicUserFieldsValidator),
    name:z.string(),
    createdAt:z.string().datetime(),
    updatedAt:z.string().datetime(),
    description:z.string(),
    workspaces:z.array(z.string()),
    discussions:z.array(z.string())
})
export const ExpandedTeamResponseValidator = z.object({
    teams:z.array(TeamValidator),
    count:z.number(),
    page:z.number()
})
export type Team = z.infer<typeof TeamValidator>;
export type ExpandedTeamResponse = z.infer<typeof ExpandedTeamResponseValidator>;