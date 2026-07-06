import React, { memo, useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Card,
  CardMedia,
  Button,
  LinearProgress,
  IconButton,
  Drawer, // react-modal-sheet 대신 무조건 작동하는 MUI Drawer 임포트
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import QuizIcon from '@mui/icons-material/Quiz'; 
import GroupIcon from '@mui/icons-material/Group'; 
import CloseIcon from '@mui/icons-material/Close';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';

const QuizListPage = () => {
  // 바텀시트 오픈 상태 및 선택된 퀴즈 데이터 관리
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null);

  // 사용자가 선택할 퀴즈 설정 상태
  const [difficulty, setDifficulty] = useState('NORMAL'); // EASY, NORMAL, HARD
  const [questionCount, setQuestionCount] = useState(5); // 3, 5, 6 등

  // 카드 클릭 시 바텀시트 열기 함수
  const handleCardClick = (quizData: any) => {
    if (quizData.isLocked) return; // 잠긴 상태는 클릭 방지
    
    // 상태 세팅 순서 동기화
    setDifficulty('NORMAL'); 
    setQuestionCount(quizData.totalQuestions); 
    setSelectedQuiz(quizData);
    setIsSheetOpen(true);
  };

  // 바텀시트 닫기 함수
  const handleClose = () => {
    setIsSheetOpen(false);
    // 닫히는 애니메이션 도중에 데이터가 사라져서 깨지는 걸 방지하기 위해 약간의 딜레이 후 null 처리
    setTimeout(() => setSelectedQuiz(null), 200);
  };

  return (
    <Box sx={{ p: 2, bgcolor: '#F7F5EE', minHeight: '100vh', pb: 12 }}>
      
      {/* 1. 상단 타이틀 & 정렬 셀렉트 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, mt: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, fontSize: '22px', color: '#111111' }}>
          경주의 탐험 퀴즈 풀기
        </Typography>
        
        <FormControl size="small" sx={{ minWidth: 85 }}>
          <Select
            value="DEFAULT"
            displayEmpty
            sx={{
              bgcolor: '#FFFFFF',
              borderRadius: '8px',
              height: '36px',
              fontSize: '13px',
              color: '#555555',
              '& .MuiOutlinedInput-notchedOutline': { border: '1px solid #E3DCCE' },
              fontWeight: 500,
            }}
          >
            <MenuItem value="DEFAULT">기본순</MenuItem>
            <MenuItem value="LIKES">인기순</MenuItem>
            <MenuItem value="REWARD">보상순</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* 2. 카테고리 필터 (가로 스크롤) */}
      <Box 
        sx={{ 
          display: 'flex', 
          gap: 1, 
          overflowX: 'auto', 
          whiteSpace: 'nowrap',
          mb: 3,
          pb: 1,
          '::-webkit-scrollbar': { display: 'none' } 
        }}
      >
        <Box sx={{ px: 2.2, py: 0.8, borderRadius: '20px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', border: '1px solid', borderColor: '#8E7249', bgcolor: '#8E7249', color: '#FFFFFF', boxShadow: '0 2px 8px rgba(142,114,73,0.25)' }}>
          전체
        </Box>
        <Box sx={{ px: 2.2, py: 0.8, borderRadius: '20px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', border: '1px solid', borderColor: '#E3DCCE', bgcolor: '#FFFFFF', color: '#7A7265' }}>
          가능
        </Box>
        <Box sx={{ px: 2.2, py: 0.8, borderRadius: '20px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', border: '1px solid', borderColor: '#E3DCCE', bgcolor: '#FFFFFF', color: '#7A7265' }}>
          잠금
        </Box>
      </Box>

      {/* 3. 나의 탐험 진척도 영역 */}
      <Card elevation={0} sx={{ bgcolor: '#FFFFFF', borderRadius: '16px', p: 1.5, mb: 3, boxShadow: '0 4px 12px rgba(142,114,73,0.04)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, px: 0.5 }}>
          <Typography sx={{ fontSize: '12.5px', color: '#7A7265', fontWeight: 700 }}>나의 퀴즈 진척도</Typography>
          <Typography sx={{ fontSize: '13px', fontWeight: 800, color: '#8E7249' }}>45% 완료</Typography>
        </Box>
        <LinearProgress variant="determinate" value={45} sx={{ height: 6, borderRadius: '10px', bgcolor: '#F5F2EB', '& .MuiLinearProgress-bar': { bgcolor: '#8E7249', borderRadius: '10px' } }} />
      </Card>

      {/* 4. 퀴즈 리스트 영역 */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        
        {/* CASE 1: 도전 가능 상태 */}
        <Card 
          elevation={0} 
          onClick={() => handleCardClick({
            title: '경주 불국사 탐험 퀴즈',
            description: '청운교와 백운교에 얽힌 신라의 숨겨진 수수께끼를 풀어보세요.',
            image: 'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?w=400',
            totalQuestions: 5,
            participants: '1.2천명',
            reward: '150 XP',
            isLocked: false
          })}
          sx={{ display: 'flex', bgcolor: '#FFFFFF', borderRadius: '16px', p: 0, cursor: 'pointer', boxShadow: '0 4px 12px rgba(142,114,73,0.04)', transition: 'transform 0.2s, box-shadow 0.2s', position: 'relative', overflow: 'hidden', '&:hover': { transform: 'translateY(-2px)' } }}
        >
          <Box sx={{ position: 'relative', width: 110, minHeight: 115, flexShrink: 0 }}>
            <CardMedia component="img" image="https://images.unsplash.com/photo-1542224566-6e85f2e6772f?w=400" alt="경주 불국사 탐험 퀴즈" loading="lazy" sx={{ width: '100%', height: '100%', objectFit: 'cover', bgcolor: '#F5F2EB' }} />
          </Box>
          <Box sx={{ position: 'relative', borderRight: '1.5px dashed #E3DCCE', mx: 0.5, '&::before, &::after': { content: '""', position: 'absolute', width: '12px', height: '12px', borderRadius: '50%', bgcolor: '#F7F5EE', left: '-6.5px' }, '&::before': { top: '-6px' }, '&::after': { bottom: '-6px' } }} />
          <Box sx={{ flex: 1, p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
            <Box>
              <Box sx={{ display: 'flex', mb: 0.8 }}><Box sx={{ bgcolor: '#F0E7D8', color: '#735020', fontSize: '11px', fontWeight: 800, px: 1.2, py: 0.3, borderRadius: '4px' }}>도전가능</Box></Box>
              <Typography sx={{ fontWeight: 800, fontSize: '17px', color: '#111111', mb: 0.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>경주 불국사 탐험 퀴즈</Typography>
              <Typography sx={{ color: '#958D80', fontSize: '12.5px', lineHeight: 1.35, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>청운교와 백운교에 얽힌 신라의 숨겨진 수수께끼를 풀어보세요.</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1.5 }}>
              <Box sx={{ display: 'flex', gap: 0.8 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#F5F2EB', px: 0.8, py: 0.4, borderRadius: '6px' }}><QuizIcon sx={{ fontSize: '13px', color: '#8E7249', mr: 0.3 }} /><Typography sx={{ color: '#7A7265', fontSize: '11px', fontWeight: 700 }}>5 문항</Typography></Box>
                <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#F5F2EB', px: 0.8, py: 0.4, borderRadius: '6px' }}><GroupIcon sx={{ fontSize: '13px', color: '#8E7249', mr: 0.3 }} /><Typography sx={{ color: '#7A7265', fontSize: '11px', fontWeight: 700 }}>1.2천명</Typography></Box>
              </Box>
              {/* 버튼이 클릭 이벤트를 먹는 현상 방지 */}
              <Button size="small" variant="contained" sx={{ height: '28px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, px: 1.8, boxShadow: 'none', textTransform: 'none', bgcolor: '#BA9663', color: '#FFFFFF', pointerEvents: 'none' }}>도전하기</Button>
            </Box>
          </Box>
        </Card>

        {/* CASE 2: 진행 중 상태 */}
        <Card 
          elevation={0} 
          onClick={() => handleCardClick({
            title: '동궁과 월지 야경 퀴즈',
            description: '안압지 별궁의 건축학적 비밀 상식들과 숨은 이야기들',
            image: 'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?w=400',
            totalQuestions: 5,
            participants: '850명',
            reward: '200 XP',
            isLocked: false
          })}
          sx={{ display: 'flex', bgcolor: '#FFFFFF', borderRadius: '16px', p: 0, cursor: 'pointer', boxShadow: '0 4px 12px rgba(142,114,73,0.04)', transition: 'transform 0.2s, box-shadow 0.2s', position: 'relative', overflow: 'hidden', '&:hover': { transform: 'translateY(-2px)' } }}
        >
          <Box sx={{ position: 'relative', width: 110, minHeight: 115, flexShrink: 0 }}>
            <CardMedia component="img" image="https://images.unsplash.com/photo-1542224566-6e85f2e6772f?w=400" alt="동궁과 월지 야경 퀴즈" loading="lazy" sx={{ width: '100%', height: '100%', objectFit: 'cover', bgcolor: '#F5F2EB' }} />
          </Box>
          <Box sx={{ position: 'relative', borderRight: '1.5px dashed #E3DCCE', mx: 0.5, '&::before, &::after': { content: '""', position: 'absolute', width: '12px', height: '12px', borderRadius: '50%', bgcolor: '#F7F5EE', left: '-6.5px' }, '&::before': { top: '-6px' }, '&::after': { bottom: '-6px' } }} />
          <Box sx={{ flex: 1, p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
            <Box>
              <Box sx={{ display: 'flex', mb: 0.8 }}><Box sx={{ bgcolor: '#EAF2EE', color: '#2E5A44', fontSize: '11px', fontWeight: 800, px: 1.2, py: 0.3, borderRadius: '4px' }}>진행중</Box></Box>
              <Typography sx={{ fontWeight: 800, fontSize: '17px', color: '#111111', mb: 0.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>동궁과 월지 야경 퀴즈</Typography>
              <Typography sx={{ color: '#958D80', fontSize: '12.5px', lineHeight: 1.35, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>안압지 별궁의 건축학적 비밀 상식들과 숨은 이야기들 (이전 도전 기록: 2/5 문제)</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1.5 }}>
              <Box sx={{ display: 'flex', gap: 0.8 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#F5F2EB', px: 0.8, py: 0.4, borderRadius: '6px' }}><QuizIcon sx={{ fontSize: '13px', color: '#8E7249', mr: 0.3 }} /><Typography sx={{ color: '#7A7265', fontSize: '11px', fontWeight: 700 }}>5 문항</Typography></Box>
                <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#F5F2EB', px: 0.8, py: 0.4, borderRadius: '6px' }}><GroupIcon sx={{ fontSize: '13px', color: '#8E7249', mr: 0.3 }} /><Typography sx={{ color: '#7A7265', fontSize: '11px', fontWeight: 700 }}>850명</Typography></Box>
              </Box>
              <Button size="small" variant="contained" sx={{ height: '28px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, px: 1.8, boxShadow: 'none', textTransform: 'none', bgcolor: '#3E6D55', color: '#FFFFFF', pointerEvents: 'none' }}>이어 풀기</Button>
            </Box>
          </Box>
        </Card>

        {/* CASE 3: 완료 상태 */}
        <Card 
          elevation={0} 
          onClick={() => handleCardClick({
            title: '첨성대 별자리 퀴즈',
            description: '동양에서 가장 오래된 신라 시대의 천문대 역사 이야기',
            image: 'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?w=400',
            totalQuestions: 5,
            participants: '2.3천명',
            reward: '100 XP',
            isLocked: false
          })}
          sx={{ display: 'flex', bgcolor: '#FFFFFF', borderRadius: '16px', p: 0, cursor: 'pointer', boxShadow: '0 4px 12px rgba(142,114,73,0.04)', transition: 'transform 0.2s, box-shadow 0.2s', position: 'relative', overflow: 'hidden', '&:hover': { transform: 'translateY(-2px)' } }}
        >
          <Box sx={{ position: 'relative', width: 110, minHeight: 115, flexShrink: 0 }}>
            <CardMedia component="img" image="https://images.unsplash.com/photo-1542224566-6e85f2e6772f?w=400" alt="첨성대 별자리 퀴즈" loading="lazy" sx={{ width: '100%', height: '100%', objectFit: 'cover', bgcolor: '#F5F2EB' }} />
          </Box>
          <Box sx={{ position: 'relative', borderRight: '1.5px dashed #E3DCCE', mx: 0.5, '&::before, &::after': { content: '""', position: 'absolute', width: '12px', height: '12px', borderRadius: '50%', bgcolor: '#F7F5EE', left: '-6.5px' }, '&::before': { top: '-6px' }, '&::after': { bottom: '-6px' } }} />
          <Box sx={{ flex: 1, p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
            <Box>
              <Box sx={{ display: 'flex', mb: 0.8 }}><Box sx={{ bgcolor: '#EFECE5', color: '#55524E', fontSize: '11px', fontWeight: 800, px: 1.2, py: 0.3, borderRadius: '4px' }}>완료</Box></Box>
              <Typography sx={{ fontWeight: 800, fontSize: '17px', color: '#111111', mb: 0.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>첨성대 별자리 퀴즈</Typography>
              <Typography sx={{ color: '#958D80', fontSize: '12.5px', lineHeight: 1.35, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>동양에서 가장 오래된 신라 시대의 천문대 역사 이야기</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1.5 }}>
              <Box sx={{ display: 'flex', gap: 0.8 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#F5F2EB', px: 0.8, py: 0.4, borderRadius: '6px' }}><QuizIcon sx={{ fontSize: '13px', color: '#8E7249', mr: 0.3 }} /><Typography sx={{ color: '#7A7265', fontSize: '11px', fontWeight: 700 }}>5 문항</Typography></Box>
                <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#F5F2EB', px: 0.8, py: 0.4, borderRadius: '6px' }}><GroupIcon sx={{ fontSize: '13px', color: '#8E7249', mr: 0.3 }} /><Typography sx={{ color: '#7A7265', fontSize: '11px', fontWeight: 700 }}>2.3천명</Typography></Box>
              </Box>
              <Button size="small" variant="outlined" sx={{ height: '28px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, px: 1.8, boxShadow: 'none', textTransform: 'none', borderColor: '#E3DCCE', color: '#7A7265', pointerEvents: 'none' }}>다시 풀기</Button>
            </Box>
          </Box>
        </Card>

        {/* CASE 4: 잠김 상태 */}
        <Card 
          elevation={0} 
          sx={{ display: 'flex', bgcolor: '#FFFFFF', borderRadius: '16px', p: 0, cursor: 'default', boxShadow: '0 4px 12px rgba(142,114,73,0.04)', position: 'relative', overflow: 'hidden', opacity: 0.65, filter: 'grayscale(30%)' }}
        >
          <Box sx={{ position: 'relative', width: 110, minHeight: 115, flexShrink: 0 }}>
            <CardMedia component="img" image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400" alt="석굴암 상식 미션" loading="lazy" sx={{ width: '100%', height: '100%', objectFit: 'cover', bgcolor: '#F5F2EB', filter: 'brightness(0.6)' }} />
            <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.15)' }}><LockIcon sx={{ color: '#FFFFFF', fontSize: 22 }} /></Box>
          </Box>
          <Box sx={{ position: 'relative', borderRight: '1.5px dashed #E3DCCE', mx: 0.5, '&::before, &::after': { content: '""', position: 'absolute', width: '12px', height: '12px', borderRadius: '50%', bgcolor: '#F7F5EE', left: '-6.5px' }, '&::before': { top: '-6px' }, '&::after': { bottom: '-6px' } }} />
          <Box sx={{ flex: 1, p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
            <Box>
              <Box sx={{ display: 'flex', mb: 0.8 }}><Box sx={{ bgcolor: '#F2EFE9', color: '#A49E95', fontSize: '11px', fontWeight: 800, px: 1.2, py: 0.3, borderRadius: '4px' }}>잠김</Box></Box>
              <Typography sx={{ fontWeight: 800, fontSize: '17px', color: '#111111', mb: 0.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>석굴암 상식 미션</Typography>
              <Typography sx={{ color: '#958D80', fontSize: '12.5px', lineHeight: 1.35, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>해당 관광지에 직접 방문하시면 퀴즈가 활성화됩니다.</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1.5 }}>
              <Box sx={{ display: 'flex', gap: 0.8 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#F5F2EB', px: 0.8, py: 0.4, borderRadius: '6px' }}><QuizIcon sx={{ fontSize: '13px', color: '#A49E95', mr: 0.3 }} /><Typography sx={{ color: '#A49E95', fontSize: '11px', fontWeight: 700 }}>6문항</Typography></Box>
                <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#F5F2EB', px: 0.8, py: 0.4, borderRadius: '6px' }}><GroupIcon sx={{ fontSize: '13px', color: '#A49E95', mr: 0.3 }} /><Typography sx={{ color: '#A49E95', fontSize: '11px', fontWeight: 700 }}>410명</Typography></Box>
              </Box>
              <Button disabled size="small" variant="contained" sx={{ height: '28px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, px: 1.8, boxShadow: 'none', textTransform: 'none', bgcolor: '#EFECE5', color: '#A49E95' }}>잠김</Button>
            </Box>
          </Box>
        </Card>

      </Box>

      {/* =======================================================
          5. 하단 바텀시트 영역 (MUI 내장 Drawer로 무조건 뜨게 적용)
         ======================================================= */}
      <Drawer
        anchor="bottom"
        open={isSheetOpen}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            backgroundColor: '#FFFFFF',
            maxHeight: '85vh', // 모바일 화면의 최대 85% 높이 보장
            zIndex: 9999,      // Z-index 충돌 완전 방지
          }
        }}
      >
        {/* 상단 드래그 핸들 디자인 우회 구현 */}
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1.8, pb: 0.8 }}>
          <Box sx={{ width: 42, height: 5, borderRadius: 999, bgcolor: '#D8CFB5' }} />
        </Box>

        {/* 내부 컨텐츠 */}
        {selectedQuiz && (
          <Box sx={{ px: 2.5, pb: 4, pt: 1, position: 'relative' }}>
            
            {/* 우측 상단 닫기 버튼 */}
            <IconButton 
              onClick={handleClose} 
              size="small" 
              sx={{ position: 'absolute', right: 20, top: 0, bgcolor: '#F5F2EB', color: '#7A7265', '&:hover': { bgcolor: '#E3DCCE' } }}
            >
              <CloseIcon sx={{ fontSize: '16px' }} />
            </IconButton>

            {/* 퀴즈 메인 이미지 및 타이틀 */}
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <CardMedia
                component="img"
                image={selectedQuiz.image}
                sx={{ width: '100%', height: '140px', borderRadius: '12px', objectFit: 'cover', mb: 2 }}
              />
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#111111', fontSize: '19px', mb: 0.5 }}>
                {selectedQuiz.title}
              </Typography>
              <Typography sx={{ color: '#7A7265', fontSize: '13px', px: 1, lineHeight: 1.4 }}>
                {selectedQuiz.description}
              </Typography>
            </Box>

            {/* 미니 보상 및 문항 정보 표시 바 */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, bgcolor: '#F7F5EE', py: 1.2, borderRadius: '10px', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <QuizIcon sx={{ fontSize: '15px', color: '#8E7249', mr: 0.5 }} />
                <Typography sx={{ fontSize: '12.5px', color: '#555555', fontWeight: 700 }}>총 {selectedQuiz.totalQuestions}문항</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <MilitaryTechIcon sx={{ fontSize: '16px', color: '#BA9663', mr: 0.3 }} />
                <Typography sx={{ fontSize: '12.5px', color: '#8E7249', fontWeight: 800 }}>{selectedQuiz.reward}</Typography>
              </Box>
            </Box>

            {/* 옵션 1: 난이도 설정 */}
            <Typography sx={{ fontSize: '14px', fontWeight: 800, color: '#111111', mb: 1, pl: 0.5 }}>
              난이도 선택
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2.5 }}>
              {[
                { label: '쉬움', value: 'EASY' },
                { label: '보통', value: 'NORMAL' },
                { label: '어려움', value: 'HARD' }
              ].map((item) => {
                const isSelected = difficulty === item.value;
                return (
                  <Box
                    key={item.value}
                    onClick={() => setDifficulty(item.value)}
                    sx={{
                      flex: 1,
                      py: 1.2, 
                      textAlign: 'center',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      border: '1px solid',
                      borderColor: isSelected ? '#8E7249' : '#E3DCCE',
                      bgcolor: isSelected ? '#8E7249' : '#FFFFFF',
                      color: isSelected ? '#FFFFFF' : '#7A7265',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {item.label}
                  </Box>
                );
              })}
            </Box>

            {/* 옵션 2: 문항 수 설정 */}
            <Typography sx={{ fontSize: '14px', fontWeight: 800, color: '#111111', mb: 1, pl: 0.5 }}>
              도전할 문항 수
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 4 }}>
              {[
                { label: `기본 (${selectedQuiz.totalQuestions}문항)`, value: selectedQuiz.totalQuestions },
                { label: '하프 챌린지 (3문항)', value: 3 }
              ].map((item) => {
                const isSelected = questionCount === item.value;
                return (
                  <Box
                    key={item.value}
                    onClick={() => setQuestionCount(item.value)}
                    sx={{
                      flex: 1,
                      py: 1.2,
                      textAlign: 'center',
                      borderRadius: '8px',
                      fontSize: '12.5px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      border: '1px solid',
                      borderColor: isSelected ? '#8E7249' : '#E3DCCE',
                      bgcolor: isSelected ? '#8E7249' : '#FFFFFF',
                      color: isSelected ? '#FFFFFF' : '#7A7265',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {item.label}
                  </Box>
                );
              })}
            </Box>

            {/* 최종 탐험 시작하기 버튼 */}
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                alert(`[퀴즈 시작] 장소: ${selectedQuiz.title} \n난이도: ${difficulty} \n문항수: ${questionCount}개 로 설정이 완료되었습니다.`);
                handleClose();
              }}
              sx={{
                height: '48px',
                borderRadius: '8px',
                fontSize: '14.5px',
                fontWeight: 800,
                bgcolor: '#8E7249',
                color: '#FFFFFF',
                boxShadow: 'none',
                '&:hover': { bgcolor: '#735B37', boxShadow: 'none' }
              }}
            >
              탐험 시작하기
            </Button>
          </Box>
        )}
      </Drawer>

    </Box>
  );
};

export default memo(QuizListPage);