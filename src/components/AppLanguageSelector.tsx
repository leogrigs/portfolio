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

  const handleLanguageChange = (locale: string) => {
    dispatch(setLocale(locale));
    dispatch(fetchData(locale));
  };

  return (
    <div className="flex items-center space-x-2">
      <Select defaultValue={currentLocale} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-[120px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en-US">English</SelectItem>
          <SelectItem value="pt-BR">Português</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
