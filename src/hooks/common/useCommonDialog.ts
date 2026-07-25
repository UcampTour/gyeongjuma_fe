import { useContext } from "react";
import { DialogContext } from "../../providers/DialogProvider";

export const useCommonDialog = () => {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error("DialogProvider 바깥에서 호출 됨");
  }

  return context;
};
