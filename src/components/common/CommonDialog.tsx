import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export type DialogType = "alert" | "confirm";

interface CommonDialogProps {
  open: boolean;
  type: DialogType;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const CommonDialog = ({
  open,
  type,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: CommonDialogProps) => {
  const { t } = useTranslation();
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      slotProps={{
        paper: {
          sx: {
            borderRadius: "15px",
            width: "70%",
            maxWidth: "400px",
            minHeight: "20%",
            px: 1.5,
            pb: 2,
            pt: 3,
          },
        },
      }}
    >
      {title && <DialogTitle sx={{ fontWeight: 700 }}>{title}</DialogTitle>}

      {message && (
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
      )}

      <DialogActions>
        {type === "confirm" && (
          <Button
            onClick={onCancel}
            sx={{
              color: "#BC9A5D",
            }}
          >
            {cancelText ? cancelText : t("common:button.cancel")}
          </Button>
        )}
        <Button
          variant="contained"
          onClick={onConfirm}
          sx={{
            backgroundColor: "#BC9A5D",
            borderRadius: "15px",
          }}
        >
          {confirmText ? confirmText : t("common:button.confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommonDialog;
