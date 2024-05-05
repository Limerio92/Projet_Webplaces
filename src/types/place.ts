import * as yup from "yup";

export const placeTypes = ["Restaurant", "Musée", "Bar", "Parc"] as const;

export const restaurantTypeDataSchema = yup.object().shape({
  type_cuisine: yup.string().required("Type de cuisine requis"),
  stars: yup.number().min(1).max(3).required("Nombre d'étoiles requis"),
  price: yup.number().min(1).max(5).required("Prix moyen requis"),
});

export const museumTypeDataSchema = yup.object().shape({
  art_movement: yup.string().required("Courant artistique requis"),
  art_type: yup.string().required("Type d'art requis"),
  free: yup.string(),
  price: yup.number().when("free", {
    is: (value: string) => value == "No",
    then: (schema: yup.Schema) => schema.required("Prix requis"),
  }),
});

export const barTypeDataSchema = yup.object().shape({
  bar_type: yup.string().required("Type de bar requis"),
  price: yup.number().min(1).max(5).required("Prix moyen requis"),
});

export const parkTypeDataSchema = yup.object().shape({
  park_type: yup.string().required("Type de parc requis"),
  public: yup.string(),
  free: yup.string(),
  price: yup.number().when("free", {
    is: (value: string) => value == "No",
    then: () => yup.number().min(1).max(5).required("Prix requis"),
  }),
});

export const placeSchema = yup.object().shape({
  _id: yup.string(),
  type: yup.string().required("Type de lieu requis"),
  restaurant_data: restaurantTypeDataSchema.when("type", {
    is: (value: string) => value === "Restaurant",
    then: (schema: yup.Schema) => schema.required(),
    otherwise: (schema: yup.Schema) => yup.object().notRequired(),
  }),
  museum_data: museumTypeDataSchema.when("type", {
    is: (value: string) => value === "Musée",
    then: (schema: yup.Schema) => schema.required(),
    otherwise: (schema: yup.Schema) => yup.object().notRequired(),
  }),
  bar_data: barTypeDataSchema.when("type", {
    is: (value: string) => value === "Bar",
    then: (schema: yup.Schema) => schema.required(),
    otherwise: (schema: yup.Schema) => yup.object().notRequired(),
  }),
  park_data: parkTypeDataSchema.when("type", {
    is: (value: string) => value === "Parc",
    then: (schema: yup.Schema) => schema.required(),
    otherwise: (schema: yup.Schema) => yup.object().notRequired(),
  }),

  place_name: yup.string().required("Nom du lieu requis"),
  address: yup.string().required("Adresse requise"),
  city: yup.string().required("Ville requise"),
  postal_code: yup.string().required("Code postal requis"),
  country: yup.string().required("Pays requis"),
});

export type Place = yup.InferType<typeof placeSchema>;

export type PlaceResponseItem = Place & {
  createdAt: string;
  updatedAt: string;
};
