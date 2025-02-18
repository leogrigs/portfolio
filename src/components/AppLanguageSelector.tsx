import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../store/slices/contentSlice";
import { setLocale } from "../store/slices/localeSlice";
import { AppDispatch, RootState } from "../store/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function AppLanguageSelector() {
  const dispatch: AppDispatch = useDispatch();
  const currentLocale = useSelector(
    (state: RootState) => state.locale.currentLocale
  );
  const translations = useSelector(
    (state: RootState) => state.contentV2.data.navbar.language
  );

  const handleLanguageChange = (locale: string) => {
    dispatch(setLocale(locale));
    dispatch(fetchData(locale));
  };

  return (
    <div className="relative inline-flex items-center group">
      {/* Language Selector */}
      <div className="relative z-10 flex items-center space-x-2 px-4 border-0 rounded-lg text-neutral-1 hover:scale-[1.03] transition-all duration-300 group-hover:bg-opacity-95 group-focus:ring-2 group-focus:ring-offset-2 group-focus:ring-borderColor">
        {/* Globe Icon */}
        <Select
          defaultValue={currentLocale}
          onValueChange={handleLanguageChange}
        >
          <SelectTrigger className="w-fit h-[38px] bg-background hover:text-primaryColor">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en-US">{translations.english}</SelectItem>
            <SelectItem value="pt-BR">{translations.portuguese}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
