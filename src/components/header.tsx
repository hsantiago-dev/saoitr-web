import Link from "next/link";


export default function Header() {

    return (
        <div className="w-full flex justify-between mb-4">
            <div className="flex space-x-3">
                <h1 className="font-sans text-xl font-bold text-redLight">Ocorrências</h1>
                <h1 className="font-sans text-xl font-bold text-grey-700">|</h1>
                <h1 className="font-sans text-xl font-bold text-white/20">Minhas ocorrências</h1>
            </div>
            <div className="flex space-x-3">
                <Link
                    href={"/register"}
                    className="flex text-purple"
                >
                    <h1 className="font-sans text-xl mr-2 font-bold">Cadastre-se</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                    </svg>

                </Link>
                <h1 className="font-sans text-xl font-bold text-grey-700">|</h1>
                <Link
                    href={"/login"}
                    className="flex text-green"
                >
                    <h1 className="font-sans text-xl mr-2 font-bold">Entrar</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}