import place from "@/data/place";
import { PlaceResponseItem } from "@/types/place";
import { useMutation, useQuery } from "react-query";

export const useCreatePlace = () => useMutation(place.create);
export const useUpdatePlace = () => useMutation(place.update);

export const useFindPlaces = (params?: string) =>
  useQuery<PlaceResponseItem[]>(["places", params], () => place.find(params));

export const useFindPlaceById = (id?: string) =>
  useQuery<PlaceResponseItem>(["places", id], () => place.findById(id));

export const useDeletePlace = () => useMutation(place.delete);
