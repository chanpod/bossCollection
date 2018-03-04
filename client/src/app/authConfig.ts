import { AuthConfig } from "angular-oauth2-oidc";
import { environment } from "../environments/environment";

export const authConfig: AuthConfig = {
    // Url of the Identity Provider
    

    // URL of the SPA to redirect the user to after login
    redirectUri: environment.redirectUri,

    // The SPA's id. The SPA is registerd with this id at the auth-server
    clientId: environment.clientId,
    scope: "wow.profile",
    responseType: 'code', 
};