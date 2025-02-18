import { RootState } from "@/store/store";
import { File } from "lucide-react";
import { useSelector } from "react-redux";

export default function AppResumeButton() {
  const [resumeLabel, resumeLink] = useSelector((state: RootState) => [
    state.contentV2.data.navbar.resume,
    state.contentV2.data.links.resume,
  ]);

  return (
    <div className="relative inline-flex group">
      <a
        href={resumeLink}
        target="_blank"
        rel="noopener noreferrer"
        className="relative inline-flex items-center justify-center px-6 py-2 text-sm bg-background text-neutral-1 transition-all duration-300 group-hover:bg-opacity-90 group-hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-borderColor hover:text-fontColor"
      >
        <File className="w-4 h-4 mr-2 group-hover:animate-bounce" />
        {resumeLabel}
      </a>
    </div>
  );
}
