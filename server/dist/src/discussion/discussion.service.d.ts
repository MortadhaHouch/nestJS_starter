import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
export declare class DiscussionService {
    create(createDiscussionDto: CreateDiscussionDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateDiscussionDto: UpdateDiscussionDto): string;
    remove(id: number): string;
}
