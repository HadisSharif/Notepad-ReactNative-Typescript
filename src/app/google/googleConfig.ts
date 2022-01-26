import { IOS_CLIENT_ID, WEB_CLIENT_ID } from "@env";


export const googleSignInConfig = {
    scopes: ['email'],
    iosClientId: IOS_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
    offlineAccess: true,
}

