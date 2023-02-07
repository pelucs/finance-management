import { useContext, useEffect, useState } from 'react';
import { CountsContext, CountsType } from '../../contexts/CountsContext';
import { newFormat } from '../Date';
import Footer from '../Footer';

import Header from "../Header";
import Loading from '../Loading';
import Cards from "./Cards";
import Counts from "./Counts";
import Summary from "./Summary";
import Table from "./Table";

export default () => {

  const counts = useContext<CountsType[]>(CountsContext);
  const [earnings, setEarnings] = useState<number>(0);
  const [exits, setExits] = useState<number>(0);
  const [ocultTable, setOcultTable] = useState<boolean>(true);
  const [activeForm, setActiveForm] = useState<boolean>(false);

  useEffect(() => {
    let filteringEarnings = counts.filter(count => count.type === "entrada"),
        earningsF = filteringEarnings.map(value => Number(value.value));
        
    let filteringExits = counts.filter(counts => counts.type === "saida"),
        exitsF = filteringExits.map(value => Number(value.value));

    adding(earningsF, exitsF);
        
  }, [counts]);

  const adding = (earningsF: Array<number>, exitsF: Array<number>) => {
    if(earningsF.length !== 0){
      let a = earningsF.reduce((a, b) => a + b);

      setEarnings(a);
    }

    if(exitsF.length !== 0){
      let b = exitsF.reduce((a, b) => a + b);

      setExits(b);
    }
  }

  if(!counts){
    return <Loading/>
  }

  return(
    <div className="w-full">
      <Header/>
      
      <div className="py-5 px-3 sm:px-5">
        <div>
          <h1 className="text-lg font-bold">
            Visão geral
          </h1>

          <h1 className="text-gray-400 text-sm">
            {newFormat}
          </h1>
        </div>

        <div className="mt-5">
          <Cards earnings={earnings} exits={exits}/>
        </div>

        <div className="mt-5">
          <Counts activeForm={activeForm} setActiveForm={setActiveForm}/>
        </div>

        <div className="mt-5">
          <Table 
            ocultTable={ocultTable} 
            setOcultTable={setOcultTable} 
            setActiveForm={setActiveForm}
          />
        </div>

        <div className="mt-5">
          <Summary earnings={earnings} exits={exits}/>
        </div>
      </div>

      <Footer/>
    </div>
  );
}