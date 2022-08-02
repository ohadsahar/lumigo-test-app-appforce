import React, { Dispatch, SetStateAction } from "react";
import { AddWrapper, InputFieldWrapper, InputWrapper } from "./styled";
import { FaPlus, FaCheck } from "react-icons/fa";
import { Strings } from "@/constants/strings";

interface InputFieldProps {
  onChange: Function;
  onSubmit: Function;
  value: string;
  isEditable: boolean;
  handleEditClick: Function;
}

const AppInputField = ({
  onChange,
  onSubmit,
  value,
  isEditable,
  handleEditClick,
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
          <FaCheck
            onClick={() => {
              onSubmit();
              handleEditClick();
            }}
          />
        )}
      </AddWrapper>
    </InputFieldWrapper>
  );
};

export default AppInputField;
