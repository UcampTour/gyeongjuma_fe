import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAdminQuiz } from "../../../hooks/admin/useAminQuiz";
import AdminQuizFilter from "../../../components/admin/quiz/AdminQuizFilter";
import AdminQuizTable from "../../../components/admin/quiz/AdminQuizTable";


const AdminQuizPage = () => {
  
  const {
    keyword,
    useFlag,
    difficulty,
    page,
    rowsPerPage,
    filteredQuizzes,
    paginatedQuizzes,
    handleSearchChange,
    handleUsageChange,
    handleDifficultyChange,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useAdminQuiz();

  return (
    <Box sx={{ p: 2 }}>
      
      {/* 타이틀 영역 */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          퀴즈 관리
        </Typography>
      </Box>

      {/* 필터 및 검색 영역 */}
      <AdminQuizFilter 
        keyword={keyword}
        useFlag={useFlag}
        difficulty={difficulty}
        onSearchChange={handleSearchChange}
        onDifficultyChange={handleDifficultyChange}
        onUsageChange={handleUsageChange}
      />

      {/* 퀴즈 목록 테이블 영역 */}
      <AdminQuizTable 
        filteredQuizzes={filteredQuizzes}
        paginatedQuizzes={paginatedQuizzes}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          sx={{ bgcolor: "#AC8E61", "&:hover": { bgcolor: "#8f734a" } }}
        >
          퀴즈 등록
        </Button>
      </Box>
    </Box>
  );
};

export default AdminQuizPage;