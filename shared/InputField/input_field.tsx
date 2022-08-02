import { Strings } from "@/constants/strings";
import { FaCheck, FaPlus } from "react-icons/fa";
import { AddWrapper, InputFieldWrapper, InputWrapper } from "./styled";

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
  //Talk with amit about it, when using here useCallback it's not updaing item after edit
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
        onChange={(e) => onChange(e?.target?.value)}
      />
      <AddWrapper>
        {!isEditable ? (
          <FaPlus onClick={() => onSubmit} />
        ) : (
          <FaCheck onClick={submitChanges} />
        )}
      </AddWrapper>
    </InputFieldWrapper>
  );
};

export default AppInputField;
