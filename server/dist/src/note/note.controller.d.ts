import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { AuthenticatedRequest } from 'utils/types';
export declare class NoteController {
    private readonly noteService;
    constructor(noteService: NoteService);
    create(createNoteDto: CreateNoteDto, req: AuthenticatedRequest): Promise<import("mongoose").Document<unknown, {}, import("./entities/note.entity").Note, {}> & import("./entities/note.entity").Note & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(req: AuthenticatedRequest, page?: number): Promise<(import("mongoose").Document<unknown, {}, import("./entities/note.entity").Note, {}> & import("./entities/note.entity").Note & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    })[] | {
        notes: (import("mongoose").Document<unknown, {}, import("./entities/note.entity").Note, {}> & import("./entities/note.entity").Note & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        })[];
        count: number;
        page: number;
    }>;
    findOne(id: string, req: AuthenticatedRequest): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./entities/note.entity").Note, {}> & import("./entities/note.entity").Note & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("./entities/note.entity").Note, {}> & import("./entities/note.entity").Note & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("./entities/note.entity").Note, "findOne", {}>;
    update(id: string, updateNoteDto: UpdateNoteDto, req: AuthenticatedRequest): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./entities/note.entity").Note, {}> & import("./entities/note.entity").Note & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("./entities/note.entity").Note, {}> & import("./entities/note.entity").Note & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("./entities/note.entity").Note, "findOneAndUpdate", {}>;
    remove(id: string, req: AuthenticatedRequest): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./entities/note.entity").Note, {}> & import("./entities/note.entity").Note & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("./entities/note.entity").Note, {}> & import("./entities/note.entity").Note & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("./entities/note.entity").Note, "findOneAndDelete", {}>;
}
