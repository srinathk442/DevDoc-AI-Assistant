import mongoose from "mongoose";
const DocChunkSchema = new mongoose.Schema({
    text:String,
    embedding:[Number],
});
export default mongoose.models.DocChunk || mongoose.model("DocChunk", DocChunkSchema);