import "reflect-metadata";
import { Container } from "inversify";
import { http } from "./http";
import { UserHttpGateway } from "./gateways/user-http.gateway";
import { SignInUseCase } from "../app/user/sign-in.usecase";
import { SignUpUseCase } from "../app/user/sign-up.usecase";
import { SignOutUseCase } from "../app/user/sign-out.usecase";
import { TokenCookieStorage } from "./token-cookie-storage";
import { OccurrenceHttpGateway } from "./gateways/occurrence-http.gateway";
import { GetAllOccurrencesUseCase } from "../app/occurrence/get-all-occurrences.usecase";
import { EditUserUseCase } from "../app/user/edit-user.usecase";
import { CreateNewOccurrenceUseCase } from "../app/occurrence/create-new-occurrence.usecase";
import { GetAllOccurrencesByUserUseCase } from "../app/occurrence/get-all-occurrences-by-user.usecase";
import { EditOccurrenceUseCase } from "../app/occurrence/edit-occurrence.usecase";

export const Registry = {
    AxiosAdapter: Symbol.for('AxiosAdapter'),
    TokenStorageAdapter: Symbol.for('TokenStorageAdapter'),

    UserGateway: Symbol.for('UserGateway'),
    SignInUseCase: Symbol.for('SignInUseCase'),
    SignUpUseCase: Symbol.for('SignUpUseCase'),
    SignOutUseCase: Symbol.for('SignOutUseCase'),
    EditUserUseCase: Symbol.for('EditUserUseCase'),

    OccurrenceGateway: Symbol.for('OccurrenceGateway'),
    GetAllOccurrencesUseCase: Symbol.for('GetAllOccurrencesUseCase'),
    CreateNewOccurrenceUseCase: Symbol.for('CreateNewOccurrenceUseCase'),
    GetAllOccurrencesByUserUseCase: Symbol.for('GetAllOccurrencesByUserUseCase'),
    EditOccurrenceUseCase: Symbol.for('EditOccurrenceUseCase'),
}

export const container = new Container();

container.bind(Registry.AxiosAdapter).toConstantValue(http);

container.bind(Registry.TokenStorageAdapter).to(TokenCookieStorage);

container.bind(Registry.UserGateway).toDynamicValue((context) => {
    return new UserHttpGateway(context.container.get(Registry.AxiosAdapter), context.container.get(Registry.TokenStorageAdapter));
});

container.bind(Registry.SignInUseCase).toDynamicValue((context) => {
    return new SignInUseCase(context.container.get(Registry.UserGateway));
});

container.bind(Registry.SignUpUseCase).toDynamicValue((context) => {
    return new SignUpUseCase(context.container.get(Registry.UserGateway));
});

container.bind(Registry.SignOutUseCase).toDynamicValue((context) => {
    return new SignOutUseCase(context.container.get(Registry.UserGateway));
});

container.bind(Registry.EditUserUseCase).toDynamicValue((context) => {
    return new EditUserUseCase(context.container.get(Registry.UserGateway));
});

container.bind(Registry.OccurrenceGateway).toDynamicValue((context) => {
    return new OccurrenceHttpGateway(context.container.get(Registry.AxiosAdapter), context.container.get(Registry.TokenStorageAdapter));
});

container.bind(Registry.GetAllOccurrencesUseCase).toDynamicValue((context) => {
    return new GetAllOccurrencesUseCase(context.container.get(Registry.OccurrenceGateway));
});

container.bind(Registry.CreateNewOccurrenceUseCase).toDynamicValue((context) => {
    return new CreateNewOccurrenceUseCase(context.container.get(Registry.OccurrenceGateway));
});

container.bind(Registry.GetAllOccurrencesByUserUseCase).toDynamicValue((context) => {
    return new GetAllOccurrencesByUserUseCase(context.container.get(Registry.OccurrenceGateway));
});

container.bind(Registry.EditOccurrenceUseCase).toDynamicValue((context) => {
    return new EditOccurrenceUseCase(context.container.get(Registry.OccurrenceGateway));
});