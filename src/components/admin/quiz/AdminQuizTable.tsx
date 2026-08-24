import { 
  Button, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, TablePagination 
} from "@mui/material";
import type { QuizItem } from "../../../hooks/admin/useAminQuiz";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

interface AdminQuizTableProps {
  paginatedQuizzes: QuizItem[];
  filteredQuizzes: QuizItem[];
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const AdminQuizTable = ({
  paginatedQuizzes,
  filteredQuizzes,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: AdminQuizTableProps) => {

  const navigate = useNavigate();

  return (
    <TableContainer component={Paper} sx={{ borderRadius: "12px", border: "1px solid #E0E0E0", boxShadow: "none" }}>
      <Table sx={{ minWidth: 650 }} aria-label="quiz table">
        <TableHead sx={{ bgcolor: "#FAFAFA" }}>
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: 700, width: "60px" }}>No.</TableCell>
            <TableCell align="center" sx={{ fontWeight: 700, width: "90px" }}>퀴즈ID</TableCell>
            <TableCell align="center" sx={{ fontWeight: 700, width: "90px" }}>관광지ID</TableCell>
            <TableCell align="center" sx={{ fontWeight: 700, width: "130px" }}>관광지명</TableCell>
            <TableCell align="center" sx={{ fontWeight: 700, width: "300px"}}>퀴즈제목</TableCell>
            <TableCell align="center" sx={{ fontWeight: 700, width: "90px" }}>난이도</TableCell>
            <TableCell align="center" sx={{ fontWeight: 700, width: "100px" }}>사용여부</TableCell>
            <TableCell align="center" sx={{ fontWeight: 700, width: "90px" }}>수정</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedQuizzes.length > 0 ? (
            paginatedQuizzes.map((quiz, index) => (
              <TableRow key={quiz.quizId} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell align="center" sx={{ color: "text.secondary" }}>
                  {page * rowsPerPage + index + 1}
                </TableCell>
                <TableCell align="center">{quiz.quizId}</TableCell>
                <TableCell align="center">{quiz.placeId}</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: "#2C2A29" }}>{quiz.placeName}</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: "#2C2A29" }}>{quiz.title}</TableCell>
                <TableCell align="center">
                  {quiz.difficulty === "HIGH" ? "상" : quiz.difficulty === "MEDIUM" ? "중" : "하"}
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  {quiz.isActive ? "Y" : "N"}
                </TableCell>
                <TableCell align="center">
                  <Button onClick={() => navigate(`/admin/quizzes/form/${quiz.quizId}`)} size="small" variant="outlined" sx={{ color: "#2C2A29", borderColor: "#D1D5DB" }}>
                    수정
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} align="center" sx={{ py: 4, color: "text.secondary" }}>
                검색 결과가 없습니다.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={filteredQuizzes.length}
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

export default AdminQuizTable;