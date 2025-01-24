import { RootState } from "@/store/store";
import { Download } from "lucide-react";
import { useSelector } from "react-redux";

export default function AppResumeButton() {
  const resumeLink = useSelector(
    (state: RootState) => state.content.data?.resumeLink
  );

  return (
    <div className="relative inline-flex group">
      <a
        href={resumeLink}
        target="_blank"
        rel="noopener noreferrer"
        className="relative inline-flex items-center justify-center px-6 py-3 text-sm font-semibold bg-background border border-borderColor rounded-lg text-foreground shadow-lg transition-all duration-300 group-hover:bg-opacity-90 group-hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-borderColor hover:text-fontColor"
      >
        {/* Download icon */}
        <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
        Resume
      </a>
    </div>
  );
}
