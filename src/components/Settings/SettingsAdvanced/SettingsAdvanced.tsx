import { ArrowLeft } from "phosphor-react";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import DeleteUser from "./DeleteUser";
import RedefinePassword from "./RedefinePassword";
import SendEmailVerification from "./SendEmailVerification";

interface SettingsAdvancedProps{
  setActiveLayer: (newLayer: string) => void;
}

export default ({ setActiveLayer }: SettingsAdvancedProps) => {

  const user = useContext(AuthContext);

  return(
    <div>
      {
        user && (
          <>
            <div className="p-5">
              <button 
                onClick={() => setActiveLayer("")} 
                className="flex mb-5 md:mb-0 md:hidden items-center gap-2"
              >
                <ArrowLeft
                  size={20}
                  weight="bold"
                />

                Voltar
              </button>

              <h1 className="text-lg font-bold">
                Configurações avançadas
              </h1>

              <h2 className="mt-2 text-gray-300 font-light text-sm">
                Redefinição de senha e/ou email, exclusão de conta
              </h2>
            </div>

            <div>
              <RedefinePassword email={user.email}/>
              <SendEmailVerification email={user.email}/>
              <DeleteUser/>
            </div>
          </>
        )
      }
    </div>
  );
}