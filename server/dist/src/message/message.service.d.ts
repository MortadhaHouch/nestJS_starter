import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Model } from 'mongoose';
import { Message } from './entities/message.entity';
export declare class MessageService {
    private messageModel;
    constructor(messageModel: Model<Message>);
    create(createMessageDto: CreateMessageDto): Promise<import("mongoose").Document<unknown, {}, Message, {}> & Message & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Message, {}> & Message & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, Message, {}> & Message & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    update(id: string, updateMessageDto: UpdateMessageDto): Promise<(import("mongoose").Document<unknown, {}, Message, {}> & Message & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    remove(id: string): Promise<(import("mongoose").Document<unknown, {}, Message, {}> & Message & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
}
