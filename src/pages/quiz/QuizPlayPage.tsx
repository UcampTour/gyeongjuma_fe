import { useState } from 'react';
import { Box, Typography, Button, Paper, LinearProgress, Fade, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import QuizIcon from '@mui/icons-material/Quiz';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';

const QuizPlayPage = () => {
  const [stage, setStage] = useState('start');
  const [difficulty, setDifficulty] = useState('일반 역사');
  const [progress] = useState(35);

  const quizInfo = {
    title: "첨성대 탐험",
    description: "7세기 신라 건축의 정수를 배우고 퀴즈를 풀어보세요.",
    totalQuestions: 10,
    solvedQuestions: 3,
    pointsPerQuestion: 50,
  };

  const Header = ({ title, onBack }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, pt: 1 }}>
      <IconButton onClick={onBack} sx={{ ml: -1 }}>
        <ArrowBackIosNewIcon sx={{ fontSize: 20, color: "#1F1F1F" }} />
      </IconButton>
      <Typography sx={{ fontWeight: 700, fontSize: '18px', ml: 1 }}>{title}</Typography>
    </Box>
  );

  return (
    <Box sx={{ 
      p: 2, 
      bgcolor: "#F7F5EE", 
      minHeight: 'calc(100dvh - 90px)',
      boxSizing: 'border-box',
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Box sx={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        
        {/* 1. 시작 화면 */}
        {stage === 'start' && (
          <Fade in={stage === 'start'}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <Header title="상식 퀴즈" onBack={() => window.history.back()} />
              
              <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
                <Box sx={{ width: '100%', aspectRatio: '1.2/1', borderRadius: '32px', overflow: 'hidden', mb: 4, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
                  <img src="https://picsum.photos/id/15/400/500" alt="첨성대" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 800, color: "#1F1F1F", mb: 1.5 }}>{quizInfo.title}</Typography>
                <Typography sx={{ color: "#7A7265", fontSize: '14px', textAlign: 'center', px: 2, mb: 4 }}>{quizInfo.description}</Typography>
                
                <Paper elevation={0} sx={{ p: 3, width: '100%', borderRadius: '28px', border: "1px solid rgba(160, 142, 115, 0.15)", bgcolor: "#FFFFFF", boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                  {/* 난이도 선택 버튼 그룹 */}
                  <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                    {['쉬운 모드', '일반 역사'].map((level) => (
                      <Button key={level} 
                        onClick={() => setDifficulty(level)}
                        sx={{ 
                          flex: 1, borderRadius: '12px', py: 1, fontSize: '13px', fontWeight: 700,
                          bgcolor: difficulty === level ? '#A08E73' : '#F2F0E9',
                          color: difficulty === level ? '#FFF' : '#7A7265',
                          '&:hover': { bgcolor: difficulty === level ? '#8A7A63' : '#EBE6D9' }
                        }}>
                        {level}
                      </Button>
                    ))}
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 3 }}>
                    {[
                      { icon: <QuizIcon sx={{ fontSize: 22 }} />, label: "문항", value: `${quizInfo.totalQuestions}문` },
                      { icon: <SchoolIcon sx={{ fontSize: 22 }} />, label: "난이도", value: difficulty },
                      { icon: <EmojiEventsIcon sx={{ fontSize: 22 }} />, label: "포인트", value: `${quizInfo.pointsPerQuestion}P` },
                    ].map((item, idx) => (
                      <Box key={idx} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                        <Box sx={{ color: "#A08E73" }}>{item.icon}</Box>
                        <Typography sx={{ fontSize: '11px', fontWeight: 700, color: "#A08E73" }}>{item.label}</Typography>
                        <Typography sx={{ fontSize: '13px', fontWeight: 800, color: "#1F1F1F" }}>{item.value}</Typography>
                      </Box>
                    ))}
                  </Box>
                  
                  <Button onClick={() => setStage('playing')} variant="contained" fullWidth 
                    sx={{ borderRadius: '16px', py: 2, bgcolor: "#A08E73", fontSize: '16px', fontWeight: 700, boxShadow: '0 8px 16px rgba(160, 142, 115, 0.3)' }}>
                    도전 시작하기
                  </Button>
                </Paper>
              </Box>
            </Box>
          </Fade>
        )}

        {/* 2. 퀴즈 풀이 화면 */}
        {stage === 'playing' && (
          <Fade in={stage === 'playing'}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <Header title={`${difficulty} 퀴즈`} onBack={() => setStage('start')} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, bgcolor: "#FFFFFF", borderRadius: '16px', mb: 3, border: "1px solid rgba(160, 142, 115, 0.2)" }}>
                {[
                  { label: "남은 개수", val: `${quizInfo.totalQuestions - quizInfo.solvedQuestions}개` },
                  { label: "맞은 개수", val: `${quizInfo.solvedQuestions}개` },
                  { label: "현재 점수", val: `${quizInfo.solvedQuestions * quizInfo.pointsPerQuestion}P` },
                ].map((item, i) => (
                  <Box key={i} sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontSize: '11px', color: "#7A7265" }}>{item.label}</Typography>
                    <Typography sx={{ fontWeight: 800, color: "#1F1F1F" }}>{item.val}</Typography>
                  </Box>
                ))}
              </Box>
              <LinearProgress variant="determinate" value={progress} sx={{ height: 6, borderRadius: 3, bgcolor: '#EBE6D9', mb: 5, "& .MuiLinearProgress-bar": { bgcolor: "#A08E73" } }} />
              
              <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography sx={{ fontSize: '22px', fontWeight: 700, textAlign: 'center' }}>첨성대가 만들어진<br/>시대는 언제일까요?</Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, pb: 2 }}>
                {['신라 선덕여왕', '통일신라 문무왕', '고려시대', '조선시대'].map((opt) => (
                  <Button key={opt} variant="contained" fullWidth onClick={() => setStage('result')} sx={{ py: 1.8, borderRadius: '12px', bgcolor: "#FFFFFF", color: "#1F1F1F", border: "1px solid rgba(160, 142, 115, 0.2)", boxShadow: 'none', fontSize: '16px', fontWeight: 600, '&:hover': { bgcolor: "#A08E73", color: '#fff' } }}>
                    {opt}
                  </Button>
                ))}
              </Box>
            </Box>
          </Fade>
        )}

        {/* 3. 완료 화면 */}
        {stage === 'result' && (
          <Fade in={stage === 'result'}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <Header title="탐험 완료" onBack={() => setStage('start')} />
              <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ fontSize: '80px', mb: 3 }}>🎉</Box>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>축하합니다!</Typography>
                <Typography sx={{ color: "#7A7265" }}>모든 퀴즈를 완료했습니다.</Typography>
              </Box>
              <Button variant="outlined" fullWidth onClick={() => setStage('start')} sx={{ mb: 2, borderRadius: '16px', py: 2, color: "#A08E73", borderColor: "#A08E73" }}>
                리스트로 돌아가기
              </Button>
            </Box>
          </Fade>
        )}
      </Box>
    </Box>
  );
};

export default QuizPlayPage;