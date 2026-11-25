import { create } from "zustand";
import type { Restaurant } from "./restaurant.types";
import { getRestaurents } from "./restaurant.api";


interface RestaurantState {
    restaurants: Restaurant[];
    selectedRestaurant: Restaurant | null;
    loading: boolean;
    error: string | null

    fetchRestaurants: () => Promise<void>;
    setSelectedRestaurant: (restaurant: Restaurant) => void;
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