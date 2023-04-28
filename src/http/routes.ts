import { register } from "./controllers/register";
import { authenticate } from "./controllers/authenticate";
import { FastifyInstance } from "fastify";

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', register)
    
    app.post('/sessions', authenticate)
}