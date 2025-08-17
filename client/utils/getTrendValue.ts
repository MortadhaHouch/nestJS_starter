import type { Team } from './types';
import type { Workspace } from './types';
import type { TaskOverview } from './types';
import type { Blog } from './types';
export const getTrendValue = (data:(TaskOverview|Workspace|Team|Blog)[])=>{
    return data.filter((d)=>new Date(d.createdAt).getMonth() == new Date(d.createdAt).getMonth()).length - data.filter((d)=>new Date(d.createdAt).getMonth() == new Date(d.createdAt).getMonth()-1).length
}