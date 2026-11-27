import { API } from "../../lib/api";
import {  type Restaurant, type RestaurantResponse, type SingleRestaurentInterface } from "./restaurant.types";

export type CreateRestaurantPayload=Omit<Restaurant,"id"|"owner_id"|"created_at"|"updated_at">;

export const getRestaurents=async():Promise<Restaurant[]>=>{
    const response=await API.get<RestaurantResponse>(
        "/owners/restuarents"
    )
    console.log(response.data)
    return response.data.data
}

export const addRestaurantAPI=async(payload:CreateRestaurantPayload):Promise<Restaurant>=>{
    const response=await API.post<SingleRestaurentInterface>("/add/restaurents",payload);
    return response.data.data
}