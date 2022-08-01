import React from "react";
import { AddWrapper, InputFieldWrapper, InputWrapper } from "./styled";
import { FaPlus, FaCheck } from "react-icons/fa";
import { Strings } from "@/constants/strings";

interface InputFieldProps {
  onChange: Function;
  onSubmit: Function;
  value: string;
  isEditable: boolean;
}

const AppInputField = ({
  onChange,
  onSubmit,
  value,
  isEditable,
}: InputFieldProps) => {
  return (
    <InputFieldWrapper>
      <InputWrapper
        value={value}
        placeholder={
          isEditable
            ? Strings.InputFieldEditPlaceholder
            : Strings.InputFieldPlaceholder
        }
        onChange={(e) => onChange(e?.target?.value)}
      />
      <AddWrapper>
        {!isEditable ? (
          <FaPlus onClick={() => onSubmit()} />
        ) : (
          <FaCheck onClick={() => onSubmit()} />
        )}
      </AddWrapper>
    </InputFieldWrapper>
  );
};

export default AppInputField;
