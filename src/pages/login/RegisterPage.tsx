import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkNickname, registerExtraInfo } from "../../api/authService";

const RegisterPage = () => {
  console.log("RegisterPage 렌더링됨!");
  const [nickname, setNickname] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const handleCheckNickname = async () => {
    try {
      const response = await checkNickname({nickname});
      const available = response.available;

      setIsAvailable(available);
      alert(available ? "사용가능" : "사용불가");
    } catch (error) {
      console.error("중복 확인 실패", error);
    }
  };

  const handleRegister = async () => {
    if (isAvailable === false || isAvailable === null) {
      alert("닉네임 중복 확인을 먼저 해주세요.");
      return;
    }

    try {
      await registerExtraInfo({ nickname, difficulty });
      alert("등록 완료");
      navigate("/");
    } catch (error) {
      alert("등록 실패");
      console.error("등록 실패:", error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px' }}>
      <h1>추가 정보 등록</h1>
      
      <div>
        <input
          value={nickname}
          onChange={(e) => { setNickname(e.target.value); setIsAvailable(null); }} 
          placeholder="닉네임 입력 (2~12자)"
        />
        <button onClick={handleCheckNickname}>중복 확인</button>
      </div>

      <div>
        <label>난이도 선택: </label>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="EASY">EASY</option>
          <option value="NORMAL">NORMAL</option>
          <option value="HARD">HARD</option>
        </select>
      </div>

      <button onClick={handleRegister}>회원가입 완료</button>
    </div>
  );
}

export default RegisterPage;