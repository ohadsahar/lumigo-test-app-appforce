import { Strings } from "@/constants/strings";
import React from "react";
import { FormWrapper, InputFieldWrapper, InputWrapper } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { search } from "@/store/actions/tasks.actions";
import AppTitle from "@/shared/typography/app_title";

const SearchBar = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: any) => state.taskState.tasks);
  const countSearchedTasks = tasks?.length;

  const onChange = (value: string) => {
    dispatch(search(value) as any);
  };
  return (
    <FormWrapper>
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
