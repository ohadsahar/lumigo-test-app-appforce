import { Strings } from "@/constants/strings";
import AppTitle from "@/shared/typography/app_title";
import React from "react";
import { useSearchBar } from "./hooks/useSearchBar";
import { FormWrapper, InputFieldWrapper, InputWrapper } from "./styled";

const SearchBar = () => {
  const { countSearchedTasks, onChange } = useSearchBar();

  return (
    <FormWrapper
      onSubmit={(event: React.SyntheticEvent) => event.preventDefault()}
      data-testid="searchbar-box"
    >
      <InputFieldWrapper>
        <InputWrapper
          placeholder={Strings.SearchBarPlaceHolder}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            onChange(e.currentTarget.value)
          }
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
