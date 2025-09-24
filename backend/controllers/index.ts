import { create_user, sigin_user } from "./user-controller";
import { website_add, website_status } from "./website-controller";

export  const website_controller={
    website_add,
    website_status,
}
export const user_controller={
    create_user,
    sigin_user
}