import { createContext, useRef, useState } from "react";
import CommonDialog, {
  type DialogType,
} from "../components/common/CommonDialog";

interface DialogOption {
  type: DialogType;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

interface DialogContextType {
  alert: (message: string, title?: string) => Promise<void>;
  confirm: (option: {
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
  }) => Promise<boolean>;
}

export const DialogContext = createContext<DialogContextType | null>(null);

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState<DialogOption>({
    type: "alert",
    message: "",
  });

  const resolver = useRef<((value: boolean) => void) | null>(null);

  const alert = (message: string, title?: string) => {
    return new Promise<void>((resolve) => {
      resolver.current = () => {
        resolve();
      };

      setOption({
        type: "alert",
        title,
        message,
      });

      setOpen(true);
    });
  };

  const confirm = (option: {
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
  }) => {
    return new Promise<boolean>((resolve) => {
      resolver.current = resolve;

      setOption({
        ...option,
        type: "confirm",
      });

      setOpen(true);
    });
  };

  const handleConfirm = () => {
    setOpen(false);
    resolver.current?.(true);
  };

  const handleCancel = () => {
    setOpen(false);

    if (option.type === "confirm") {
      resolver.current?.(false);
    } else {
      resolver.current?.(true);
    }
  };

  return (
    <DialogContext.Provider
      value={{
        alert,
        confirm,
      }}
    >
      {children}

      <CommonDialog
        open={open}
        type={option.type}
        title={option.title}
        message={option.message}
        confirmText={option.confirmText}
        cancelText={option.cancelText}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </DialogContext.Provider>
  );
};
