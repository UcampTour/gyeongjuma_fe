import { 
  Box, Button, TextField, MenuItem, Select, FormControl, InputLabel,
  Dialog, DialogTitle, DialogContent, DialogActions 
} from "@mui/material";

interface FormState {
  nickname: string;
  point: number;
  isActive: boolean;
}

interface AdminUserEditDialogProps {
  open: boolean;
  formState: FormState;
  onClose: () => void;
  onFormChange: (field: string, value: any) => void;
  onSave: () => void;
}

export const AdminUserEditDialog = ({
  open,
  formState,
  onClose,
  onFormChange,
  onSave,
}: AdminUserEditDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>회원 정보 수정</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="닉네임"
            size="small"
            fullWidth
            value={formState.nickname}
            onChange={(e) => onFormChange("nickname", e.target.value)}
          />

          <TextField
            label="포인트 (P)"
            type="number"
            size="small"
            fullWidth
            value={formState.point}
            onChange={(e) => onFormChange("point", e.target.value)}
          />

          <FormControl size="small" fullWidth>
            <InputLabel id="dialog-status-label">계정 상태</InputLabel>
            <Select
              labelId="dialog-status-label"
              value={formState.isActive ? "active" : "inactive"}
              label="계정 상태"
              onChange={(e) => onFormChange("isActive", e.target.value === "active")}
            >
              <MenuItem value="active">활성</MenuItem>
              <MenuItem value="inactive">비활성</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined" color="inherit">
          취소
        </Button>
        <Button 
          onClick={onSave} 
          variant="contained" 
          sx={{ bgcolor: "#AC8E61", "&:hover": { bgcolor: "#8f734a" } }}
        >
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
};