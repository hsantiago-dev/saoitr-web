interface InputProps {
    title: string;
    type: string;
    register: any;
    error?: string;
}

export default function Input({title, type, register, error}: InputProps) {
    return (
        <div className="flex flex-col space-y-3">
            <label htmlFor="email" className="font-mono text-white ml-1">
                {title}
            </label>
            <input
                type={type}
                {...register}
                className="rounded-xl bg-teal-800 px-4 py-2 font-sans font-semibold shadow hover:bg-emerald-500"
            />
            {error && <p className="text-red-400 ml-1">{error as string}</p>}
        </div>
    );
}