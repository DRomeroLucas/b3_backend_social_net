import text from "body-parser/lib/types/text.js";
import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const PublicationSchema = Schema({
    user_id: {
        type: Schema.ObjectId,
        ref: "User",
        rqequired: true
    },
    text: {
        type: String,
        required: true
    },
    file: String,
    created_at: {
        type: Date,
        default: Date.now,
    }
});

// Configurar schema
PublicationSchema.plugin(mongoosePaginate);

export default model("Publication", PublicationSchema, "publications");
