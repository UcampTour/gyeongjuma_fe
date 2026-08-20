import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";

const initialQuizzes = [
  {
    place_quiz_info_id: 1,
    place_id: 101,
    place_name: "불국사",
    title: "불국사 다보탑의 비밀",
    difficulty: "HIGH",
    is_active: true,
  },
  {
    place_quiz_info_id: 2,
    place_id: 102,
    place_name: "석굴암",
    title: "석굴암 본존불의 방향",
    difficulty: "MEDIUM",
    is_active: true,
  },
  {
    place_quiz_info_id: 3,
    place_id: 103,
    place_name: "첨성대",
    title: "첨성대 구조 개수",
    difficulty: "LOW",
    is_active: false,
  },
  {
    place_quiz_info_id: 4,
    place_id: 104,
    place_name: "동궁과 월지",
    title: "동궁과 월지의 옛 이름",
    difficulty: "MEDIUM",
    is_active: true,
  },
];

const AdminQuizPage = () => {
  const [quizzes, setQuizzes] = useState(initialQuizzes);
  const [searchTerm, setSearchTerm] = useState("");
  const [usageStatus, setUsageStatus] = useState("all");
  const [difficulty, setDifficulty] = useState("all");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(1);

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((quiz) => {
      const matchesSearch =
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.place_name.toLowerCase().includes(searchTerm.toLowerCase());

      let matchesUsage = true;
      if (usageStatus === "active") matchesUsage = quiz.is_active === true;
      if (usageStatus === "inactive") matchesUsage = quiz.is_active === false;

      let matchesDifficulty = true;
      if (difficulty !== "all")
        matchesDifficulty = quiz.difficulty === difficulty;

      return matchesSearch && matchesUsage && matchesDifficulty;
    });
  }, [quizzes, searchTerm, usageStatus, difficulty]);

  const paginatedQuizzes = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredQuizzes.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredQuizzes, page, rowsPerPage]);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
    setPage(0);
  };

  const handleUsageChange = (e: any) => {
    setUsageStatus(e.target.value);
    setPage(0);
  };

  const handleDifficultyChange = (e: any) => {
    setDifficulty(e.target.value);
    setPage(0);
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* 타이틀 영역 (등록 버튼 제거됨) */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          퀴즈 관리
        </Typography>
      </Box>

      {/* 필터 및 검색 영역 */}
      <Box
        sx={{
          p: 2,
          bgcolor: "#FFFFFF",
          borderRadius: "12px",
          border: "1px solid #E0E0E0",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
          <TextField
            size="small"
            placeholder="관광지 및 퀴즈 제목 검색"
            value={searchTerm}
            onChange={handleSearchChange}
            slotProps={{
              input: {
                startAdornment: (
                  <SearchIcon sx={{ color: "gray", mr: 1, fontSize: 18 }} />
                ),
              },
            }}
            sx={{ width: "260px" }}
          />

          <FormControl size="small" sx={{ width: "130px" }}>
            <InputLabel id="usage-status-label">사용 여부</InputLabel>
            <Select
              labelId="usage-status-label"
              value={usageStatus}
              label="사용 여부"
              onChange={handleUsageChange}
            >
              <MenuItem value="all">전체</MenuItem>
              <MenuItem value="active">사용중 (Y)</MenuItem>
              <MenuItem value="inactive">미사용 (N)</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ width: "130px" }}>
            <InputLabel id="difficulty-label">난이도</InputLabel>
            <Select
              labelId="difficulty-label"
              value={difficulty}
              label="난이도"
              onChange={handleDifficultyChange}
            >
              <MenuItem value="all">전체</MenuItem>
              <MenuItem value="HIGH">상</MenuItem>
              <MenuItem value="MEDIUM">중</MenuItem>
              <MenuItem value="LOW">하</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* 퀴즈 목록 테이블 영역 */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "12px",
          border: "1px solid #E0E0E0",
          boxShadow: "none",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="quiz table">
          <TableHead sx={{ bgcolor: "#FAFAFA" }}>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 700, width: "60px" }}>
                No.
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700, width: "90px" }}>
                퀴즈ID
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700, width: "90px" }}>
                관광지ID
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: 700, width: "130px" }}
              >
                관광지명
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: 700, width: "300px" }}
              >
                퀴즈제목
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700, width: "90px" }}>
                난이도
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: 700, width: "100px" }}
              >
                사용여부
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700, width: "90px" }}>
                수정
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedQuizzes.length > 0 ? (
              paginatedQuizzes.map((quiz, index) => (
                <TableRow
                  key={quiz.place_quiz_info_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" sx={{ color: "text.secondary" }}>
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell align="center">
                    {quiz.place_quiz_info_id}
                  </TableCell>
                  <TableCell align="center">{quiz.place_id}</TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: 700, color: "#2C2A29" }}
                  >
                    {quiz.place_name}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: 700, color: "#2C2A29" }}
                  >
                    {quiz.title}
                  </TableCell>
                  <TableCell align="center">
                    {quiz.difficulty === "HIGH"
                      ? "상"
                      : quiz.difficulty === "MEDIUM"
                        ? "중"
                        : "하"}
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>
                    {quiz.is_active ? "Y" : "N"}
                  </TableCell>
                  <TableCell align="center">
                    <Button
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
                <TableCell
                  colSpan={8}
                  align="center"
                  sx={{ py: 4, color: "text.secondary" }}
                >
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
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
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
