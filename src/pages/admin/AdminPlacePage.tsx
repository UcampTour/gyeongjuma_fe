import { Box, Typography } from "@mui/material";
import { AdminPlaceSearchFilter } from "../../components/admin/place/AdminPlaceSearchFilter";
import { AdminPlaceTable } from "../../components/admin/place/AdminPlaceTable";
import { AdminPlaceDetailPanel } from "../../components/admin/place/AdminPlaceDetailPanel";
import { useAdminPlace } from "../../hooks/admin/useAdminPlace";

const AdminPlacePage = () => {
  const {
    keyword,
    categoryFilter,
    useFlag,
    page,
    rowsPerPage,
    selectedPlaceId,
    selectedPlace,
    currentDifficulty,
    currentLanguage,
    editIsActive,
    currentDescription,
    paginatedPlaces,
    filteredPlacesCount,
    supportedLanguages,
    setEditIsActive,
    handleSearchChange,
    handleCategoryChange,
    handleUsageChange,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSelectPlace,
    handleTabChange,
    handleDescriptionChange,
    handleSaveAll,
  } = useAdminPlace();

  return (
    <Box sx={{ p: 2, maxWidth: "1500px" }}>
      {/* 타이틀 영역 */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          관광지 및 해설 관리
        </Typography>
      </Box>

      {/* 좌우 2분할 레이아웃 컨테이너 */}
      <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
        
        {/* [왼쪽 영역] 검색 필터 및 테이블 */}
        <Box sx={{ flex: 7, minWidth: 0 }}>
          <AdminPlaceSearchFilter
            keyword={keyword}
            categoryFilter={categoryFilter}
            useFlag={useFlag}
            onKeywordChange={handleSearchChange}
            onCategoryChange={handleCategoryChange}
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
          currentLanguage={currentLanguage}
          currentDescription={currentDescription}
          supportedLanguages={supportedLanguages}
          onEditIsActiveChange={setEditIsActive}
          onTabChange={handleTabChange}
          onDescriptionChange={handleDescriptionChange}
          onSaveAll={handleSaveAll}
        />

      </Box>
    </Box>
  );
};

export default AdminPlacePage;