import type { ChangeEvent } from "react";
import { 
  Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination 
} from "@mui/material";
import type { UserItem } from "../../../pages/admin/AdminUserPage";

interface AdminUserTableProps {
  users: UserItem[];
  paginatedUsers: UserItem[];
  page: number;
  rowsPerPage: number;
  onPageChange: (_: unknown, newPage: number) => void;
  onRowsPerPageChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onOpenEditDialog: (user: UserItem) => void;
}

export const AdminUserTable = ({
  users,
  paginatedUsers,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onOpenEditDialog,
}: AdminUserTableProps) => {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: "12px", border: "1px solid #E0E0E0", boxShadow: "none" }}>
      <Table sx={{ minWidth: 650 }} aria-label="admin user table">
        <TableHead sx={{ bgcolor: "#FAFAFA" }}>
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: 700, width: "60px" }}>No.</TableCell>
            <TableCell align="center" sx={{ fontWeight: 700, width: "90px" }}>회원ID</TableCell>
            <TableCell align="center" sx={{ fontWeight: 700, width: "100px" }}>소셜(Provider)</TableCell>
            <TableCell align="center" sx={{ fontWeight: 700, width: "130px" }}>닉네임</TableCell>
            <TableCell align="center" sx={{ fontWeight: 700, width: "90px" }}>권한</TableCell>
            <TableCell align="center" sx={{ fontWeight: 700, width: "100px" }}>포인트</TableCell>
            <TableCell align="center" sx={{ fontWeight: 700, width: "100px" }}>상태</TableCell>
            <TableCell align="center" sx={{ fontWeight: 700, width: "120px" }}>가입일</TableCell>
            <TableCell align="center" sx={{ fontWeight: 700, width: "90px" }}>수정</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedUsers.length > 0 ? (
            paginatedUsers.map((user, index) => (
              <TableRow key={user.memberId} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell align="center" sx={{ color: "text.secondary" }}>
                  {page * rowsPerPage + index + 1}
                </TableCell>
                <TableCell align="center">{user.memberId}</TableCell>
                <TableCell align="center" sx={{ color: "text.secondary" }}>{user.provider}</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: "#2C2A29" }}>{user.nickname}</TableCell>
                <TableCell align="center">{user.role}</TableCell>
                <TableCell align="center">{user.point.toLocaleString()}P</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600, color: user.isActive ? "success.main" : "error.main" }}>
                  {user.isActive ? "활성 (Y)" : "비활성 (N)"}
                </TableCell>
                <TableCell align="center" sx={{ color: "text.secondary", fontSize: "0.85rem" }}>
                  {user.createdAt}
                </TableCell>
                <TableCell align="center">
                  <Button 
                    onClick={() => onOpenEditDialog(user)} 
                    size="small" 
                    variant="outlined" 
                    sx={{ color: "#2C2A29", borderColor: "#D1D5DB" }}
                  >
                    수정
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} align="center" sx={{ py: 4, color: "text.secondary" }}>
                검색된 회원이 없습니다.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={users.length}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[1, 5, 10, 25]}
        labelRowsPerPage="행 수:"
        sx={{
          display: "flex",
          justifyContent: "center",
          ".MuiTablePagination-toolbar": {
            justifyContent: "center",
            width: "100%",
          },
          ".MuiTablePagination-spacer": {
            display: "none",
          },
        }}
      />
    </TableContainer>
  );
};