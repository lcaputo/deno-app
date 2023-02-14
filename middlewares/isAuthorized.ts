import { Context, verify } from "../deps.ts";
import { key } from "../utils/apiKey.ts";

export const authourized = async (ctx: Context, next:any) => {
    try{   
    const headers: Headers = ctx.request.headers;
    const authorization = headers.get('Authorization');
    if(!authorization) {
        ctx.response.status = 401;
        return;
    }
    const jwt = authorization.split(' ')[1];

    if(!jwt) {
        ctx.response.status = 401;
        return;
    }
    const payload = await verify(jwt, key);

    if(!payload){
    throw new Error("!payload")
    }
     await next();
     
     } catch (error) {
        ctx.response.status = 401;
        ctx.response.body ={message: "You are not authorized to access this route"}
        return;
    }
};