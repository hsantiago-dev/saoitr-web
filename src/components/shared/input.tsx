interface InputProps {
    title: string;
    type: string;
    register: any;
    error?: string;
}

export default function Input({title, type, register, error}: InputProps) {
    return (
        <div className="flex flex-col space-y-2">
            <label className="font-sans text-lg text-white">
                {title}
            </label>
            <input
                type={type}
                
                {...register}
                className="rounded-lg bg-grey-900 px-4 py-2 font-sans font-medium shadow hover:bg-grey-800"
            />
            {error && <p className="text-red ml-1">{error as string}</p>}
        </div>
    );
}