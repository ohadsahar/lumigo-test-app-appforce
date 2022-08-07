import React from 'react';
import { AddWrapper, InputFieldWrapper, InputWrapper } from './styled';
import { FaPlus, FaCheck } from 'react-icons/fa';
import { Strings } from '@/constants/Strings';

interface InputFieldProps {
  onChange: (value: string) => void;
  onSubmit: (e?: React.MouseEvent) => void;
  value: string;
  isEditable: boolean;
  handleEditClick: () => void;
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
        data-testid="task-input-field"
        value={value}
        placeholder={
          isEditable
            ? Strings.InputFieldEditPlaceholder
            : Strings.InputFieldPlaceholder
        }
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChange(e.currentTarget.value);
        }}
      />
      <AddWrapper>
        {!isEditable ? (
          <FaPlus data-testid="create-task" onClick={onSubmit} />
        ) : (
          <FaCheck onClick={submitChanges} />
        )}
      </AddWrapper>
    </InputFieldWrapper>
  );
};

export default AppInputField;
