import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ilustration from '../assets/ilustration.svg';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';

export default () => {

  document.documentElement.scrollTop = 0;

  const navigate = useNavigate();
  const [activeSign, setActiveSign] = useState<string>("login");

  useEffect(() => {

    let local = localStorage.getItem("keyAcess");
    
    if(local){
      navigate("/app");
    }

  }, []);

  return(
    <div className="w-full min-h-screen py-10 px-5 md:p-10 bg-elipse bg-no-repeat bg-contain overflow-hidden">
      <div className="flex items-center justify-end">
        <div className="relative">
          <span className={classNames("w-20 h-10 bg-purple-500 absolute top-0 -z-10 transition-all", {
            "right-0 rounded-tr rounded-br": activeSign === "login",
            "right-20 rounded-tl rounded-bl": activeSign !== "login"
          })}>
          </span>

          <button
            onClick={() => setActiveSign("register")} 
            className={classNames("w-20 h-10 rounded-tl rounded-bl bg-purple-500/20 transition-colors duration-300", {
              "text-white": activeSign !== "login",
              "text-black": activeSign === "login"
            })}
          >
            Criar
          </button>

          <button
            onClick={() => setActiveSign("login")} 
            className={classNames("w-20 h-10 rounded-tr rounded-br bg-purple-500/20 transition-colors duration-300", {
              "text-white": activeSign === "login",
              "text-black": activeSign !== "login"
            })}
          >
            Entrar
          </button>
        </div>
      </div>

      <div className="mt-10 flex flex-col-reverse md:grid md:grid-cols-2 relative">
        <div className="sticky top-20">
          <img src={ilustration} />

          <div>
            <h1 className="text-purple-500 text-3xl">
              Organize as suas finanças de <br></br>
              forma <span className="text-4xl font-black">fácil e prática.</span>
            </h1>

            <p className="text-purple-500 mt-2">
              Crie sua conta e desfrute de todas as funcionalidades
              do gerenciador de finanças.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center">
            <h1 className="text-purple-500 text-2xl">
              Olá bem-vindo, <span className="font-black">amigo(a)!</span>
            </h1>
          </div>

          {
            activeSign === "login" ? <Login/>
            : <Register/>
          }
        </div>
      </div>
    </div>
  )
}