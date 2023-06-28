import { UserContext } from "@/context/user.provider";
import Link from "next/link";
import { useContext } from "react";
import { Registry, container } from "@/@core/infra/container-registry";
import { SignOutUseCase } from "@/@core/app/user/sign-out.usecase";
import { useRouter } from "next/router";

type HeaderProps = {
    page: string;
}

export default function Header({ page }: HeaderProps) {
    const userContext = useContext(UserContext);
    let button;
    const userLogged = userContext.user && userContext.user.name;
    const router = useRouter();

    const signOut = () => {

        try {

            const useCase = container.get<SignOutUseCase>(Registry.SignOutUseCase);

            useCase.execute(userContext.user?.id!);

            userContext.setUser(null);
            router.push('/');
        } catch (error) {
            console.error(error);
        }
    }
    
    if (userLogged) {
        button = <LogoutButton user={userContext.user} signOut={signOut} />
    } else {
        button = <LoginAndRegisterButtons />
    }

    return (
        <div className="w-full flex justify-between mb-4 select-none">
            <div className="flex space-x-3">
                <Link 
                    href={"/"}
                    className={"font-sans text-2xl font-bold" + (page === "/" ? " text-redLight" : " text-white/20")}
                >
                    Ocorrências
                </Link>
                <h1 className="font-sans text-2xl font-bold text-grey-700">|</h1>
                <Link 
                    href={userLogged ? "/my-occurrences" : {}}
                    className={"font-sans text-2xl font-bold" + (page === "/my-occurrences" ? " text-redLight" : " text-white/20")}
                >
                    <button onClick={(event) => !userLogged ? event.preventDefault() : null}>
                        Minhas ocorrências
                    </button>
                </Link>
            </div>
            {button}
        </div>
    );
}

function LoginAndRegisterButtons() {

    return (
        <div className="flex space-x-3">
            <Link
                href={"/register"}
                className="flex text-purple"
            >
                <h1 className="font-sans text-2xl mr-2 font-bold">Cadastre-se</h1>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                </svg>
            </Link>
            <h1 className="font-sans text-xl font-bold text-grey-700">|</h1>
            <Link
                href={"/login"}
                className="flex text-green"
            >
                <h1 className="font-sans text-2xl mr-2 font-bold">Entrar</h1>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                </svg>
            </Link>
        </div>
    );
}

function LogoutButton({ user, signOut }: any) {

    return (
        <div className="flex space-x-3">
            <Link
                href={"/user"}
                className="flex text-purple"
            >
                <h1 className="font-sans text-2xl mr-2 font-bold">{user.name}</h1>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mt-1">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                </svg>
            </Link>
            <h1 className="font-sans text-xl font-bold text-grey-700">|</h1>
            <button
                onClick={signOut}
                className="flex text-green items-center"
            >
                <h1 className="font-sans text-2xl mr-2 font-bold">Sair</h1>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    );
}