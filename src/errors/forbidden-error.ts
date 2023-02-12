import { ApplicationError } from "../protocols"


export async function forbiddenError(): Promise<ApplicationError>{
    return({
        name:"ForbiddenError",
        message:"You dont't have permission to access on this server"
    })
}