import "reflect-metadata";
import { Container } from "inversify";
import { http } from "./http";
import { UserHttpGateway } from "./gateways/user-http.gateway";
import { SignInUseCase } from "../app/user/sign-in.usecase";
import { SignUpUseCase } from "../app/user/sign-up.usecase";
import { SignOutUseCase } from "../app/user/sign-out.usecase";
import { TokenCookieStorage } from "./token-cookie-storage";

export const Registry = {
    AxiosAdapter: Symbol.for('AxiosAdapter'),
    UserGateway: Symbol.for('UserGateway'),
    SignInUseCase: Symbol.for('SignInUseCase'),
    SignUpUseCase: Symbol.for('SignUpUseCase'),
    SignOutUseCase: Symbol.for('SignOutUseCase'),
    TokenStorageAdapter: Symbol.for('TokenStorageAdapter'),
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