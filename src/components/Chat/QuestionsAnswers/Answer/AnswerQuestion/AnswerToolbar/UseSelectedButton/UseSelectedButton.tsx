import { useEffect, useRef } from 'react';
import { Button } from 'antd';

type UseSelectedButtonProps = {
  isDisabled: boolean;
  onClick?: () => void;
};

export const UseSelectedButton = ({
  isDisabled,
  onClick,
}: UseSelectedButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const callback = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        buttonRef.current?.click();
      }
    };

    if (!buttonRef || isDisabled) {
      document.removeEventListener('keypress', callback);

      return;
    }

    document.addEventListener('keypress', callback);

    return () => {
      document.removeEventListener('keypress', callback);
    };
  }, [isDisabled]);

  return (
    <Button
      ref={buttonRef}
      className="w-44"
      disabled={isDisabled}
      onClick={onClick}
    >
      Use the selected items
    </Button>
  );
};
