import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
export declare class MessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    create(createMessageDto: CreateMessageDto): Promise<import("mongoose").Document<unknown, {}, import("./entities/message.entity").Message, {}> & import("./entities/message.entity").Message & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./entities/message.entity").Message, {}> & import("./entities/message.entity").Message & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./entities/message.entity").Message, {}> & import("./entities/message.entity").Message & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    update(id: string, updateMessageDto: UpdateMessageDto): Promise<(import("mongoose").Document<unknown, {}, import("./entities/message.entity").Message, {}> & import("./entities/message.entity").Message & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    remove(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./entities/message.entity").Message, {}> & import("./entities/message.entity").Message & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
}
