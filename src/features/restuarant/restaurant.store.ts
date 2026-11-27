import { create } from "zustand";
import type { Restaurant } from "./restaurant.types";
import { addRestaurantAPI, getRestaurents, type CreateRestaurantPayload, } from "./restaurant.api";


interface RestaurantState {
    restaurants: Restaurant[];
    selectedRestaurant: Restaurant | null;
    loading: boolean;
    error: string | null

    fetchRestaurants: () => Promise<void>;
    addRestaurant: (payload: CreateRestaurantPayload) => Promise<Restaurant>;
    setSelectedRestaurant: (restaurant: Restaurant | null) => void;
    clearRestaurants: () => void;
}

export const useRestaurantStore = create<RestaurantState>((set) => ({
    restaurants: [],
    selectedRestaurant: null,
    loading: false,
    error: null,


    fetchRestaurants: async () => {
        set({ loading: true, error: null });

        try {
            const data = await getRestaurents();
            set({
                restaurants: data,
                loading: false,
            })
            console.log(data)
        }
        catch (error) {
            set({
                loading: false,
                error: error instanceof Error ? error.message : "Something went wrong"
            })
        }
    },
    addRestaurant:async(payload)=>{
        set({loading:true,error:null});
        try {
            const created =await addRestaurantAPI(payload)
            set((state)=>({
                restaurants:[...state.restaurants,created],
                loading:false
            }));
            return created
            
        } catch (error) {
            const message=error instanceof Error ? error.message: "Failed to add restaurent"
            set({loading:false,error:message})
            throw error instanceof Error ? error : new Error(message)
        }

    },
    setSelectedRestaurant: (restaurant) => {
        set({ selectedRestaurant: restaurant });
    },

    clearRestaurants: () => {
        set({
            restaurants: [],
            selectedRestaurant: null,
            error: null,
        });
    }
}));