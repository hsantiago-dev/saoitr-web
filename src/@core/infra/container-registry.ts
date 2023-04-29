import { Container } from "inversify";
import { http } from "./http";
import { UserHttpGateway } from "./gateways/user-http.gateway";
import { SignInUseCase } from "../app/user/sign-in.usecase";
import { SignUpUseCase } from "../app/user/sign-up.usecase";

export const Registry = {
    AxiosAdapter: Symbol.for('AxiosAdapter'),
    UserGateway: Symbol.for('UserGateway'),
    SignInUseCase: Symbol.for('SignInUseCase'),
    SignUpUseCase: Symbol.for('SignUpUseCase'),
}

export const container = new Container();

container.bind(Registry.AxiosAdapter).toConstantValue(http);

container.bind(Registry.UserGateway).toDynamicValue((context) => {
    return new UserHttpGateway(context.container.get(Registry.AxiosAdapter));
});

container.bind(Registry.SignInUseCase).toDynamicValue((context) => {
    return new SignInUseCase(context.container.get(Registry.UserGateway));
});

container.bind(Registry.SignUpUseCase).toDynamicValue((context) => {
    return new SignUpUseCase(context.container.get(Registry.UserGateway));
});