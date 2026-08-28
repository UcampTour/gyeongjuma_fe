import { useState } from "react";
import type { SelectChangeEvent } from "@mui/material";
import type { ChangeEvent } from "react";
import { useAdminUserListQuery } from "../../queries/admin/useAdminUserQuery";

export interface UserItem {
  memberId: number;
  provider: string;
  nickname: string;
  role: "USER" | "ADMIN";
  point: number;
  isActive: boolean;
  createdAt: string;
}

const initialUsers: UserItem[] = [
  {
    memberId: 1,
    provider: "kakao",
    nickname: "여행러버",
    role: "USER",
    point: 1250,
    isActive: true,
    createdAt: "2026-06-01",
  },
  {
    memberId: 2,
    provider: "naver",
    nickname: "관리자계정",
    role: "ADMIN",
    point: 5000,
    isActive: true,
    createdAt: "2026-01-15",
  },
  {
    memberId: 3,
    provider: "google",
    nickname: "경주도둑",
    role: "USER",
    point: 320,
    isActive: false,
    createdAt: "2026-05-20",
  },
];

export const useAdminUser = () => {

  const { data, isLoading } = useAdminUserListQuery();
  console.log(data);

  const [users] = useState<UserItem[]>(initialUsers);
  const [keyword, setKeyword] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [useFlag, setUseFlag] = useState("all");
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);
  
  const [formState, setFormState] = useState({
    nickname: "",
    point: 0,
    isActive: true,
  });

  const filteredUsers = users.filter((user) => {
    const matchesKeyword = user.nickname.toLowerCase().includes(keyword.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesUsage =
      useFlag === "all" ||
      (useFlag === "active" && user.isActive) ||
      (useFlag === "inactive" && !user.isActive);

    return matchesKeyword && matchesRole && matchesUsage;
  });

  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setKeyword(e.target.value);
    setPage(0);
  };

  const handleRoleFilterChange = (e: SelectChangeEvent) => {
    setRoleFilter(e.target.value);
    setPage(0);
  };

  const handleUsageChange = (e: SelectChangeEvent) => {
    setUseFlag(e.target.value);
    setPage(0);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleOpenEditDialog = (user: UserItem) => {
    setEditingUser(user);
    setFormState({
      nickname: user.nickname,
      point: user.point,
      isActive: user.isActive,
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingUser(null);
  };

  const handleFormChange = (field: string, value: any) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveUser = () => {
    if (!editingUser) return;
    if (!formState.nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    console.log("회원 정보 수정 API Payload (ID:", editingUser.memberId, "):", {
      nickname: formState.nickname,
      point: Number(formState.point),
      isActive: formState.isActive,
    });

    alert("회원 정보 수정 API 호출 (구현 예정)");
    handleCloseDialog();
  };

  return {
    keyword,
    roleFilter,
    useFlag,
    page,
    rowsPerPage,
    openDialog,
    formState,
    filteredUsers,
    paginatedUsers,
    handleSearchChange,
    handleRoleFilterChange,
    handleUsageChange,
    handleChangePage,
    handleChangeRowsPerPage,
    handleOpenEditDialog,
    handleCloseDialog,
    handleFormChange,
    handleSaveUser,
  };
};