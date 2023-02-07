import React, { useEffect, useState } from "react";

interface ImageProfileProps{
  image: string | null;
  displayName: string | null;
  img: any;
  setImg: (state: any) => void;
}

export default ({ image, displayName, setImg }: ImageProfileProps) => {

  const [imgPreview, setImgPreview] = useState<any>();

  const imagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files){

      let fileInput = e.target.files[0]
      
      setImg(fileInput);

      let reader = new FileReader();

      reader.readAsDataURL(fileInput);
      reader.onload = file => {
        if(file.target){
          setImgPreview(file.target.result);
        }
      }
    }
  }

  return(
    <div>
      {
        image ? 
          <div className="w-40 h-40 rounded-full overflow-hidden">
            {
              imgPreview ? 
                <img src={imgPreview} className="w-full"/> 
              : 
                <img src={image} className="w-full"/> 
            } 
          </div>
        : 
          <div className="w-40 h-40 rounded-full overflow-hidden">
            {
              imgPreview ? 
                <img src={imgPreview} className="w-full"/>
              :
              <div className="w-40 h-40 rounded-full bg-purple-500 flex items-center justify-center">
                <h1 className="text-5xl uppercase text-white">
                  {displayName?.split("")[0]}
                </h1>
              </div>
            }            
          </div>
      }

      <input type="file" onChange={imagePreview} id="file" className="hidden"/>
      
      <label 
        htmlFor="file" 
        className="w-40 mt-5 py-2 flex items-center justify-center text-sm text-white 
        bg-purple-500 rounded hover:bg-purple-800 transition-colors cursor-pointer"
      >
        Carregar imagem
      </label>
    </div>
  );
}