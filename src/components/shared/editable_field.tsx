import { EditUserUseCase } from "@/@core/app/user/edit-user.usecase";
import { Registry, container } from "@/@core/infra/container-registry";
import { showToastNotification } from "@/@core/infra/toast-notification";
import { UserContext } from "@/context/user.provider";
import { useContext, useState } from "react";

interface InputProps {
  title: string;
  type: string;
  value: any;
}

export default function EditableField({title, type, value}: InputProps) {
  const [editing, setEditing] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(value);
  const userContext = useContext(UserContext);

  const input = () => {
    return (
      <input
        type={type}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="rounded-lg text-lg bg-grey-900 px-4 py-2 font-sans font-medium shadow hover:bg-grey-800 grow"
      />
    )
  }

  const updateUser = async () => {
      
    const useCase = container.get<EditUserUseCase>(Registry.EditUserUseCase);
  
    try {

      const updateParams: any = {
        name: (title == 'Nome') ? inputValue : userContext.user?.name,
        email: (title == 'E-mail') ? inputValue : userContext.user?.email,
        password: null
      };
  
      const result = await useCase.execute(userContext.user?.id!, updateParams);
      
      userContext.setUser(result);

      showToastNotification('Atualização realizada!', 'success');
    } catch (error: any) {
        
      if (error.response.status == 400)
        showToastNotification('Campo não é valido.', 'warning');
      else 
        showToastNotification(error.message, 'error');
    }
  }

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex">
        {
          editing ? input() 
          : <p className="rounded-lg text-lg px-4 py-2 font-sans font-medium grow">
              {inputValue}
          </p>
        }
        <button 
          onClick={() => {
            if (editing) {
              updateUser();
            }
            setEditing(!editing)
          }}
          className="bg-grey-900 rounded-full ml-2 px-4 py-2 font-sans font-medium shadow hover:bg-grey-800"
        >
          { editing ? 
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
            </svg>                      
          : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
          </svg> }
        </button>
      </div>
    </div>
  );
}