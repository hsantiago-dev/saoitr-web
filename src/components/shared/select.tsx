type Option = {
    value: number;
    label: string;
}

interface SelectProps {
    title: string;
    options: Option[];
    register: any;
    error?: string;
}

export default function Select({title, options, register, error}: SelectProps) {
    return (
        <div className="flex flex-col space-y-2">
            <label className="font-sans text-lg text-white">
                {title}
            </label>
            <select 
                {...register}
                className="rounded-lg bg-grey-900 py-2 px-4 font-sans font-medium shadow hover:bg-grey-800"
            >
                <option value=""></option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                ))}
            </select>
            {error && <p className="text-red ml-1">{error as string}</p>}
        </div>
    );
}