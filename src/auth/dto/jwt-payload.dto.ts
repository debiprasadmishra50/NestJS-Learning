import * as mongoose from "mongoose";

export interface JwtPayload {
    id: mongoose.Schema.Types.ObjectId;
}
