// schema
import { Schema } from "mongoose";

const messageSchema = new Schema({
    content: {
         type: String,
         required: true },
         recieverId:{
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
         }
})
// model
const Message = mongoose.model("Message", messageSchema);