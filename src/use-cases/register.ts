import { hash } from "bcryptjs"
import { UserRepository } from "@/repositories/user-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface RegisterUseCaseRequest {
    name: string;
    email: string;
    password: string;
}

// SOLID
// S - Single Responsiblity Principle (Princípio da Responsabilidade Única)
// O - Open-Closed Principle (Princípio Aberto-Fechado)
// L - Liskov Substitution Principle (Princípio da Substituição de Liskov)
// I - Interface Segregation Principle (Princípio da Segregação da Interface)
// D - Dependency Inversion Principle (Príncipio da Inversão da Dependência)

export class RegisterUseCase {
    constructor(private usersRepository: UserRepository) {}

    async execute({ name, email, password }: RegisterUseCaseRequest) {
        const password_hash = await hash(password, 6)

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError()
        }

        await this.usersRepository.create({
            name,
            email,
            password_hash
        })
    }
}