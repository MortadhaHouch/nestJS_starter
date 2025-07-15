import { Schema as MongooseSchema } from "mongoose";
import { RequestStatus } from "utils/types";
export declare class FriendRequest {
    sender: MongooseSchema.Types.ObjectId;
    receiver: MongooseSchema.Types.ObjectId;
    status: RequestStatus;
}
export declare const FriendRequestSchema: MongooseSchema<FriendRequest, import("mongoose").Model<FriendRequest, any, any, any, import("mongoose").Document<unknown, any, FriendRequest, any> & FriendRequest & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, FriendRequest, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<FriendRequest>, {}> & import("mongoose").FlatRecord<FriendRequest> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
