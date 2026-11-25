import { API } from "../../lib/api";
import {  type Restaurant, type RestaurantResponse } from "./restaurant.types";

export const getRestaurents=async():Promise<Restaurant[]>=>{
    const response=await API.get<RestaurantResponse>(
        "/owners/restuarents"
    )
    console.log(response.data)
    return response.data.data
}