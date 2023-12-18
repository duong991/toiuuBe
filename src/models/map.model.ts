import { model, Schema, Document } from 'mongoose';

const DOCUMENT_NAME = 'Map';
const COLLECTION_NAME = 'Maps';
const mapSchema: Schema = new Schema(
  {
    map_structure: { type: String, required: true },
    data_type: { type: String, required: true },
    size_array: { type: Number, required: true },
    cpu_time: {
      insertion: { type: Array, required: true },
      iteration: { type: Array, required: true },
      random_query: { type: Array, required: true },
      deletion: { type: Array, required: true },
    },
    memory_usage: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
);

export const MapModel = model(DOCUMENT_NAME, mapSchema);
