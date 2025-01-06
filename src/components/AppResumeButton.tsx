import { Button } from "./ui/button";

export default function AppResumeButton() {
  return (
    <Button className="hover:text-fontColor" asChild variant={"outline"}>
      <a
        href="https://drive.google.com/file/d/18M_mYWtrdCwetw9isrH8So5rZOAne-4u/view"
        target="blank"
      >
        Resume
      </a>
    </Button>
  );
}
