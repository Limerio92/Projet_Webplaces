import { Schema, model, models } from "mongoose";

const placeSchema = new Schema(
  {
    type: { type: String, required: true },
    restaurant_data: { type: Schema.Types.Mixed },
    museum_data: { type: Schema.Types.Mixed },
    bar_data: { type: Schema.Types.Mixed },
    park_data: { type: Schema.Types.Mixed },
    place_name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postal_code: { type: String, required: true },
    country: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Place = models.Place || model("Place", placeSchema);

export default Place;
