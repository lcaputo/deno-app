import { key } from '../utils/apiKey.ts';
import { Request, Response, create } from "../deps.ts"

export const getAll = ({response}: {response: Response}) => {
    return response.body = key
}

interface Params {
    id: string
}

export const logId = ({response, params}: {response: Response, request: Request, params: Params}) => {
    return response.body = params.id
}


export const jwt = async ({response}: {response:Response}) => {
    const token = await create({ alg: "HS512", typ: "JWT" }, { foo: "bar" }, key)
    return response.body = token
}

