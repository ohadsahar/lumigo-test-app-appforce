import { Strings } from '@/constants/Strings';
import AppInputField from '@/shared/InputField/InputField';
import ErrorText from '@/shared/typography/ErrorText';
import { TaskFormProps } from 'models/TaskFormProps.model';
import { useSubmitForm } from './hooks/useSubmitForm';
import { FormWrapper } from './styled';
import React from 'react';

const TaskForm = ({ id, taskName, status, handleEditClick }: TaskFormProps) => {
  const { onSubmit, taskValue, onChangeTaskname, isError, handlePressedEnter } =
    useSubmitForm({
      id,
      taskName,
      status,
      handleEditClick,
    });

  return (
    <FormWrapper
      onSubmit={(event: React.SyntheticEvent) => {
        handlePressedEnter({ handleEditClick, event });
      }}
    >
      <AppInputField
        isEditable={taskName?.length > 0}
        onChange={(data: string) => onChangeTaskname(data)}
        onSubmit={onSubmit}
        value={taskValue}
        handleEditClick={handleEditClick}
      />
      {isError && <ErrorText text={Strings.ValidationRequiredField} />}
    </FormWrapper>
  );
};

export default TaskForm;
