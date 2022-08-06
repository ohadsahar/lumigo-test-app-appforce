import { Strings } from '@/constants/Strings';
import React from 'react';

import { FaPause, FaCheck, FaTimes } from 'react-icons/fa';
import { ActionsWrapper } from './styled';

interface ActionsProps {
  handleAction: (action: string) => void;
  showPause: boolean;
  showCheck: boolean;
}

const Actions = ({ handleAction, showPause, showCheck }: ActionsProps) => {
  return (
    <ActionsWrapper data-testid="actions-box">
      <FaTimes
        color="red"
        onClick={() => handleAction(Strings.TaskActionRemove)}
      />
      {showPause ? (
        <FaPause
          color="#f9f957"
          onClick={() => handleAction(Strings.TaskActionPause)}
        />
      ) : (
        <></>
      )}
      {showCheck ? (
        <FaCheck
          color="#67c967"
          onClick={() => handleAction(Strings.TaskActionDone)}
        />
      ) : (
        <></>
      )}
    </ActionsWrapper>
  );
};

export default Actions;
