import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Model, ObjectId } from 'mongoose';
import { Note } from './entities/note.entity';
export declare class NoteService {
    private noteModel;
    constructor(noteModel: Model<Note>);
    create(createNoteDto: CreateNoteDto, userId: ObjectId): Promise<import("mongoose").Document<unknown, {}, Note, {}> & Note & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(userId: ObjectId, page?: number): Promise<(import("mongoose").Document<unknown, {}, Note, {}> & Note & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    })[] | {
        notes: (import("mongoose").Document<unknown, {}, Note, {}> & Note & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        })[];
        count: number;
        page: number;
    }>;
    findOne(id: string, userId: ObjectId): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Note, {}> & Note & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, Note, {}> & Note & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }, {}, Note, "findOne", {}>;
    update(id: string, updateNoteDto: UpdateNoteDto, userId: ObjectId): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Note, {}> & Note & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, Note, {}> & Note & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }, {}, Note, "findOneAndUpdate", {}>;
    remove(id: string, userId: ObjectId): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Note, {}> & Note & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, Note, {}> & Note & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }, {}, Note, "findOneAndDelete", {}>;
}
