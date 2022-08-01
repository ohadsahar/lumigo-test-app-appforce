import { Strings } from "@/constants/strings";
import AppTitle from "@/shared/typography/app_title";
import { useSearchBar } from "./hooks/useSearchBar";
import { FormWrapper, InputFieldWrapper, InputWrapper } from "./styled";

const SearchBar = () => {
  const { countSearchedTasks, onChange } = useSearchBar();

  return (
    <FormWrapper onSubmit={() => event?.preventDefault()}>
      <InputFieldWrapper>
        <InputWrapper
          placeholder={Strings.SearchBarPlaceHolder}
          onChange={(e) => onChange(e?.target?.value)}
        />
      </InputFieldWrapper>
      <AppTitle
        title={`Total ${countSearchedTasks} results`}
        fontWeight={"bold"}
        fontSize={"1vw"}
      />
    </FormWrapper>
  );
};

export default SearchBar;
