import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";

export default function AppResumeButton() {
  const resumeLink = useSelector(
    (state: RootState) => state.content.data?.resumeLink
  );

  return (
    <Button className="hover:text-fontColor" asChild variant={"outline"}>
      <a href={resumeLink} target="blank">
        Resume
      </a>
    </Button>
  );
}
