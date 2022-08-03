import React, { Dispatch, SetStateAction } from "react";
import { AddWrapper, InputFieldWrapper, InputWrapper } from "./styled";
import { FaPlus, FaCheck } from "react-icons/fa";
import { Strings } from "@/constants/strings";

interface InputFieldProps {
  onChange: Function;
  onSubmit: (e?: React.MouseEvent) => void;
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
  const submitChanges = () => {
    onSubmit();
    handleEditClick();
  };

  return (
    <InputFieldWrapper>
      <InputWrapper
        value={value}
        placeholder={
          isEditable
            ? Strings.InputFieldEditPlaceholder
            : Strings.InputFieldPlaceholder
        }
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          onChange(e.currentTarget.value);
        }}
      />
      <AddWrapper>
        {!isEditable ? (
          <FaPlus onClick={onSubmit} />
        ) : (
          <FaCheck onClick={submitChanges} />
        )}
      </AddWrapper>
    </InputFieldWrapper>
  );
};

export default AppInputField;
