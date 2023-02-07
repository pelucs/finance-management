import { Spinner } from "phosphor-react";

export default () => {

  return(
    <div className="w-screen h-screen flex items-center justify-center">
      <Spinner
        size={40}
        className="text-purple-500 animate-spin"
      />
    </div>
  );
}