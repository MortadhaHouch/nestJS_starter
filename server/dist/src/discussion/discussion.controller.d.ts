import { DiscussionService } from './discussion.service';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
export declare class DiscussionController {
    private readonly discussionService;
    constructor(discussionService: DiscussionService);
    create(createDiscussionDto: CreateDiscussionDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateDiscussionDto: UpdateDiscussionDto): string;
    remove(id: string): string;
}
