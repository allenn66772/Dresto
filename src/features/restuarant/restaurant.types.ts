export interface Restaurant {
    id:string;
    owner_id:string;
    restaurant_name:string;
    location:string;
    email:string;
    cuisine:string;
    phone:string;
    fssai_reg_no:string|null;
    gstin:string|null;
    is_active:boolean;
    image_url:string|null;
    created_at:string;
    updated_at:string
}

export interface RestaurantResponse {
    success:boolean;
    message:string;
    data:Restaurant[];
}

export interface SingleRestaurentInterface {
    success:boolean;
    message:string;
    data:Restaurant;
}