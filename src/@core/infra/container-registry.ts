import { Container } from "inversify";
import { http } from "./http";
import { UserHttpGateway } from "./gateways/user-http.gateway";
import { SignInUseCase } from "../app/sign-in.usecase";

export const Registry = {
    AxiosAdapter: Symbol.for('AxiosAdapter'),
    UserGateway: Symbol.for('UserGateway'),
    SignInUseCase: Symbol.for('SignInUseCase'),
}

export const container = new Container();

container.bind(Registry.AxiosAdapter).toConstantValue(http);

container.bind(Registry.UserGateway).toDynamicValue((context) => {
    return new UserHttpGateway(context.container.get(Registry.AxiosAdapter));
});

container.bind(Registry.SignInUseCase).toDynamicValue((context) => {
    return new SignInUseCase(context.container.get(Registry.UserGateway));
});