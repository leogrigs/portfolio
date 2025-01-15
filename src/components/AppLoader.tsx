import logo from "../../public/logo.png";

export default function AppLoader() {
  return (
    <div className="bg-background z-10 h-screen w-screen absolute top-0 left-0 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <img className="animate-pulse max-w-xs" src={logo} alt="Loading" />
        <h1 className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-5xl bg-gradient-to-r from-fontColor to-fontColor via-foreground bg-clip-text text-transparent font-bold">
          Welcome to my Portfolio!
        </h1>
      </div>
    </div>
  );
}
