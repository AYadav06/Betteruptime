import { create_user, sigin_user } from "./user-controller";
import { website_add } from "./website-controller";

export  const website_controller={
    website_add
}
export const user_controller={
    create_user,
    sigin_user
}