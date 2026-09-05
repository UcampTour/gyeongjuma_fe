import { Box, Typography } from "@mui/material";
import { AdminPlaceSearchFilter } from "../../components/admin/place/AdminPlaceSearchFilter";
import { AdminPlaceTable } from "../../components/admin/place/AdminPlaceTable";
import { AdminPlaceDetailPanel } from "../../components/admin/place/AdminPlaceDetailPanel";
import { useAdminPlace } from "../../hooks/admin/useAdminPlace";

const AdminPlacePage = () => {
  const {
    keyword,
    languageFilter,
    useFlag,
    page,
    rowsPerPage,
    selectedPlaceId,
    selectedPlace,
    currentDifficulty,
    editIsActive,
    currentDescription,
    paginatedPlaces,
    filteredPlacesCount,
    setEditIsActive,
    handleSearchChange,
    handleLanguageChange,
    handleUsageChange,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSelectPlace,
    handleDifficultyChange,
    handleDescriptionChange,
    handleSaveAll,
  } = useAdminPlace();

  return (
    <Box sx={{ p: 2, maxWidth: "1500px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          관광지 및 해설 관리
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
        
        {/* [왼쪽 영역] 검색 필터 및 테이블 */}
        <Box sx={{ flex: 7, minWidth: 0 }}>
          <AdminPlaceSearchFilter
            keyword={keyword}
            languageFilter={languageFilter}
            useFlag={useFlag}
            onKeywordChange={handleSearchChange}
            onLanguageChange={handleLanguageChange}
            onUsageChange={handleUsageChange}
          />

          <AdminPlaceTable
            paginatedPlaces={paginatedPlaces}
            selectedPlaceId={selectedPlaceId}
            totalCount={filteredPlacesCount}
            page={page}
            rowsPerPage={rowsPerPage}
            onSelectPlace={handleSelectPlace}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Box>

        {/* [오른쪽 영역] 상세 패널 */}
        <AdminPlaceDetailPanel
          selectedPlace={selectedPlace}
          editIsActive={editIsActive}
          currentDifficulty={currentDifficulty}
          currentDescription={currentDescription}
          onEditIsActiveChange={setEditIsActive}
          onDifficultyChange={handleDifficultyChange}
          onDescriptionChange={handleDescriptionChange}
          onSaveAll={handleSaveAll}
        />

      </Box>
    </Box>
  );
};

export default AdminPlacePage;