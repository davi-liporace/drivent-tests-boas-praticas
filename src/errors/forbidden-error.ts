import { ApplicationError } from "@/protocols";

export  function forbiddenError(): ApplicationError {
  return{
    name: "ForbiddenError",
    message: "You dont't have permission to access on this server"
  };
}
