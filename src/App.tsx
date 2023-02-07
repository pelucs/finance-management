import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';

export default () => {
  
  useEffect(() => {
    let slug = window.location.pathname;

    if(slug === "/app"){
      document.title = "Gerenciador de finanças"
    } else if(slug === "/profile"){
      document.title = "Perfil"
    } else if(slug === "/settings"){
      document.title = "Configurações"
    }
  }, []);

  return(
    <div>
      <BrowserRouter basename="/">
        <Routes/>
      </BrowserRouter>
    </div>
  );
}