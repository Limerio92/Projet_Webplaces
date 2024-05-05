import { Place } from "@/types/place";
import apiRequest from "@/utils/request";

const place = {
  async find(params?: string) {
    let path = "/places";
    if (params) path += "?" + params;
    const { data } = await apiRequest("GET", path);
    return data;
  },
  async findById(id?: string) {
    const path = "/places/" + id;
    const { data } = await apiRequest("GET", path);
    return data;
  },
  async create(place: Place) {
    const path = "/places";
    const { data } = await apiRequest("POST", path, place);
    return data;
  },
  async update(place: Place) {
    const path = "/places";
    const { data } = await apiRequest("PATCH", path, place);
    return data;
  },

  async delete(id: string) {
    const path = "/places/" + id;
    const { data } = await apiRequest("DELETE", path);
    return data;
  },
};

export default place;
