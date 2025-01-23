import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import logo from "../../public/logo.png";

export default function AppLoader() {
  const loaderMessage = useSelector(
    (state: RootState) => state.content.data?.others.loaderMessage
  );

  return (
    <div className="bg-background z-10 h-screen w-screen absolute top-0 left-0 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <img
          className="animate-pulse max-w-[200px] md:max-w-xs"
          src={logo}
          alt="Loading"
        />
        <h1 className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-2xl md:text-5xl bg-gradient-to-r from-fontColor to-fontColor via-foreground bg-clip-text text-transparent font-bold">
          {loaderMessage}
        </h1>
      </div>
    </div>
  );
}
