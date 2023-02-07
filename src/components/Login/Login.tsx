import { EnvelopeSimple, Lock } from "phosphor-react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import Firebase from '../../libs/firebase';

export default () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = () => {
    
    if(email.length !== 0 && password.length !== 0){

      Firebase.login(email, password, navigate);

    } else{
      alert("Preencha todos os campos corretamente!");
    }

  }

  return(
    <div className="w-full max-w-[350px] mt-2 flex flex-col gap-5">
      <p className="text-light text-center text-gray-500"> 
        Faça seu login e acesse a sua conta
      </p>

      <div>
        <label className="text-purple-500 font-bold text-sm">Endereço de email</label>

        <div className="w-full mt-2 flex items-center relative">
          <input
            type="email"
            className="input" 
            placeholder="hello@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />

          <EnvelopeSimple
            size={23}
            className="text-purple-500 absolute right-2" />
        </div>
      </div>

      <div>
        <label className="text-purple-500 font-bold text-sm">Senha</label>

        <div className="w-full mt-2 flex items-center relative">
          <input
            type="password"
            className="input" 
            placeholder="Informe sua senha"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Lock
            size={23}
            className="text-purple-500 absolute right-2" />
        </div>
      </div>

      <div className="w-full flex justify-end">
        <a href="#" className="underline text-purple-500">
          Esqueceu a senha?
        </a>
      </div>

      <button 
        onClick={handleLogin}
        className="w-full py-3 text-white bg-purple-500 rounded hover:bg-purple-800 
        transition-colors"
      >
        Entrar
      </button>
    </div>
  );
}