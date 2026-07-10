import { useState } from 'react';
import { Box, Typography, Button, Paper, LinearProgress, Fade } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import MedalIcon from '@mui/icons-material/MilitaryTech';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import { QuizStatus } from '../../models/QuizModel';

interface QuizDetail {
  placeId: number;
  title: string;
  description: string;
  imageUrl: string;
  totalQuestions: number;
  correctQuestions: number;
  progressRate: number;
  isCorrect: boolean;
  lastQuestionIndex?: number;
  quizStatus: QuizStatus;
  questions: QuizQuestion[];
}

interface QuizQuestion {
  quizId: number;
  question: string;
  options: QuizOption[];
}

interface QuizOption {
  answerId: number;
  content: string;
}

const quizDetailData: QuizDetail = {
  placeId: 1,
  title: "첨성대 탐험 퀴즈",
  description: "첨성대 관련 퀴즈입니다 첨성대에 대해서 맞춰보아요~",
  imageUrl: "https://picsum.photos/id/10/400",
  totalQuestions: 5,
  correctQuestions: 0,
  progressRate: 0,
  isCorrect: false,
  quizStatus: QuizStatus.AVAILABLE,
  questions: [
    { quizId: 101, question: "첨성대는 신라 시대 누구의 재위 기간에 만들어졌나요?", options: [{ answerId: 1, content: "선덕여왕" }, { answerId: 2, content: "진흥왕" }, { answerId: 3, content: "무열왕" }, { answerId: 4, content: "문무왕" }] },
    { quizId: 102, question: "첨성대의 몸통은 무엇을 사용하여 쌓았나요?", options: [{ answerId: 1, content: "화강암" }, { answerId: 2, content: "대리석" }, { answerId: 3, content: "현무암" }, { answerId: 4, content: "황토 벽돌" }] },
    { quizId: 103, question: "첨성대의 가장 높은 곳의 모양은 어떤 형태인가요?", options: [{ answerId: 1, content: "정사각형" }, { answerId: 2, content: "원형" }, { answerId: 3, content: "삼각형" }, { answerId: 4, content: "육각형" }] },
    { quizId: 104, question: "첨성대가 세워진 장소인 경주에 있는 왕궁 터는 어디인가요?", options: [{ answerId: 1, content: "월성" }, { answerId: 2, content: "대릉원" }, { answerId: 3, content: "불국사" }, { answerId: 4, content: "석굴암" }] },
    { quizId: 105, question: "첨성대의 주된 용도로 추정되는 것은?", options: [{ answerId: 1, content: "천문 관측" }, { answerId: 2, content: "곡물 저장" }, { answerId: 3, content: "망루" }, { answerId: 4, content: "불교 수행" }] }
  ]
}

const answerData = [1, 3, 4, 2, 1];

const QuizPlayPage = () => {
  const navigate = useNavigate();

  const [stage, setStage] = useState('start');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [correctCnt, setCorrectCnt] = useState(0);

  const isAvailable = quizDetailData.quizStatus === QuizStatus.AVAILABLE;
  const isProgressing = quizDetailData.quizStatus === QuizStatus.PROGRESS;
  const isCompleted = quizDetailData.quizStatus === QuizStatus.COMPLETED;

  const currentQuestion = quizDetailData.questions[currentIdx];

  const handleAnswer = (answerId: number) => {

    if(answerId === answerData[currentIdx]) {
      setCorrectCnt((prev) => prev + 1);
    }    

    if (currentIdx === quizDetailData.totalQuestions - 1) {
      setStage("result");
      return;
    }

    setCurrentIdx((prev) => prev + 1);
  }

  const handleComplete = (callback: () => void) => {
    setCurrentIdx(0);
    setCorrectCnt(0);
    callback();
  }

  return (
    <Box sx={{ 
      bgcolor: "#F7F5EE", 
      minHeight: '100vh', 
      pb: 14, 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Box sx={{ 
        width: '100%', 
        maxWidth: '500px', 
        display: 'flex', 
        flexDirection: 'column',
        flexGrow: 1, 
        boxSizing: 'border-box',
        px: 2
      }}>
        
        {/* 1. 시작 화면 */}
        {stage === 'start' && (
          <Fade in={stage === 'start'}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <PageHeader title="퀴즈 시작하기" />

              {/* 이미지 카드 (상단 마진을 줄여 헤더와 미세하게 밀착) */}
              <Box sx={{
                mt: 1.5,
                mb: 2,
                bgcolor: 'rgba(255, 255, 255, 0.5)',
                border: '1px solid rgba(160, 142, 115, 0.15)',
                borderRadius: '32px',
                p: 2.5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 4px 20px rgba(160, 142, 115, 0.03)'
              }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: "#1F1F1F", mb: 1, textAlign: 'center', fontSize: '1.4rem' }}>
                  {quizDetailData.title}
                </Typography>
                <Typography sx={{ color: "#7A7265", fontSize: '0.9rem', textAlign: 'center', px: 1, mb: 2.5, lineHeight: 1.5, wordBreak: 'keep-all' }}>
                  {quizDetailData.description}
                </Typography>

                <Box sx={{ 
                  width: '100%', 
                  height: '190px', 
                  borderRadius: '22px', 
                  overflow: 'hidden', 
                  boxShadow: '0 8px 20px rgba(160, 142, 115, 0.1)',
                  border: '4px solid #FFFFFF'
                }}>
                  <img src="https://picsum.photos/id/15/800/400" alt="첨성대" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Box>
              </Box>

              {/* 하단 퀴즈 설정 영역 */}
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  borderRadius: '32px', 
                  border: "1px solid rgba(160, 142, 115, 0.25)", 
                  bgcolor: "rgba(255, 255, 255, 0.8)", 
                  backdropFilter: 'blur(12px)', 
                  boxShadow: '0 10px 30px rgba(160, 142, 115, 0.1)',
                  mt: 'auto'
                }}
              >
                {/* 대시보드 스펙 */}
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-around', 
                  alignItems: 'center', 
                  mb: 2.5,
                  bgcolor: 'rgba(242, 240, 233, 0.5)',
                  borderRadius: '24px',
                  p: 2,
                  border: '1px solid rgba(160, 142, 115, 0.1)'
                }}>
                  {[
                    { icon: <QuizIcon fontSize="small"/>, label: "문항 수", val: `${quizDetailData.totalQuestions}문` },
                    { icon: <MedalIcon fontSize="small"/>, label: "난이도", val: "일반" },
                    { icon: <EmojiEventsIcon fontSize="small"/>, label: "포인트", val: "50p" }
                  ].map((item, i) => (
                    <Box key={i} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                      <Box sx={{ color: "#A08E73", mb: 0.5, display: 'flex', alignItems: 'center', height: '24px' }}>
                        {item.icon}
                      </Box>
                      <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: "#A08E73" }}>{item.label}</Typography>
                      <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: "#1F1F1F", mt: 0.5 }}>{item.val}</Typography>
                    </Box>
                  ))}
                </Box>

                {/* 안내 문구 */}
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  gap: 0.5, 
                  color: isCompleted ? '#A08E73' : '#7A7265',
                  mb: 2.5,
                  minHeight: '20px'
                }}>
                  <InfoOutlinedIcon sx={{ fontSize: '0.85rem', flexShrink: 0 }} />
                  <Typography sx={{ fontSize: '0.72rem', fontWeight: 600, wordBreak: 'keep-all', textAlign: 'center' }}>
                    {isCompleted 
                      ? "이미 완료한 퀴즈는 포인트가 지급되지 않습니다." 
                      : "각 문항당 50P씩 획득합니다."
                    }
                  </Typography>
                </Box>
                
                <Button onClick={() => setStage('playing')} variant="contained" fullWidth 
                  sx={{ borderRadius: '20px', py: 2, bgcolor: "#A08E73", fontSize: '1rem', fontWeight: 700, boxShadow: 'none' }}>
                  도전 시작하기
                </Button>
              </Paper>
            </Box>
          </Fade>
        )}

        {/* 2. 퀴즈 풀이 화면 */}
        {stage === 'playing' && (
          <Fade in={stage === 'playing'}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <PageHeader title={quizDetailData.title} customBack={() => setStage('start')} />
              
              {/* 스코어보드 */}
              <Box sx={{ display: 'flex', justifyContent: 'space-around', p: 2, bgcolor: "#FFFFFF", borderRadius: '20px', mt: 1.5, mb: 3, border: "1px solid rgba(160, 142, 115, 0.2)" }}>
                {[
                  { label: "남은 문항", val: `${quizDetailData.totalQuestions - currentIdx}문항` },
                  { label: "맞은 문항", val: `${correctCnt}문항` },
                  { label: "현재 포인트", val: `${correctCnt * 50}p` },
                ].map((item, i) => (
                  <Box key={i} sx={{ textAlign: 'center', flex: 1 }}>
                    <Typography sx={{ fontSize: '0.75rem', color: "#7A7265" }}>{item.label}</Typography>
                    <Typography sx={{ fontWeight: 800, fontSize: '1rem' }}>{item.val}</Typography>
                  </Box>
                ))}
              </Box>
              
              <LinearProgress variant="determinate" value={currentIdx / quizDetailData.totalQuestions * 100} sx={{ height: 8, borderRadius: 5, bgcolor: '#EBE6D9', "& .MuiLinearProgress-bar": { bgcolor: "#A08E73" } }} />

              {/* 문제 텍스트 */}
              <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4 }}>
                <Typography sx={{ fontSize: '1.4rem', fontWeight: 700, textAlign: 'center', lineHeight: 1.5, wordBreak: 'keep-all' }}>
                  {currentQuestion.question}
                </Typography>
              </Box>

              {/* 4지선다 선택지 */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.8, mb: 1 }}>
                {currentQuestion.options.map((option, index) => (
                  <Button 
                    key={option.answerId} 
                    variant="contained" 
                    fullWidth 
                    onClick={() => handleAnswer(option.answerId)} 
                    sx={{ 
                      display: 'flex',
                      justifyContent: 'flex-start',
                      py: 2, 
                      px: 2.5,
                      borderRadius: '20px', 
                      bgcolor: "#FFFFFF", 
                      color: "#1F1F1F", 
                      border: "1px solid rgba(160, 142, 115, 0.15)", 
                      boxShadow: '0 4px 10px rgba(160, 142, 115, 0.05)', 
                      fontSize: '1rem', 
                      fontWeight: 600, 
                      textTransform: 'none',
                      '&:hover': { bgcolor: "#FFFFFF", borderColor: "#A08E73" }
                    }}
                  >
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      bgcolor: '#F2F0E9',
                      color: '#7A7265',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      mr: 2,
                      flexShrink: 0
                    }}>
                      {index + 1}
                    </Box>
                    <Box component="span">{option.content}</Box>
                  </Button>
                ))}
              </Box>
            </Box>
          </Fade>
        )}

        {/* 3. 완료 화면 */}
        {stage === 'result' && (
          <Fade in={stage === 'result'}>
            <Box sx={{ display: 'flex', flexDirection: 'column', pt: 12, alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={{ fontSize: '80px', mb: 2 }}>🎉</Box>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: '#1F1F1F', fontSize: '1.8rem' }}>축하합니다!</Typography>
              <Typography sx={{ color: "#7A7265", fontSize: '1rem', mb: 6, textAlign: 'center' }}>
                맞은 개수: {correctCnt}
              </Typography>
              <Button 
                variant="contained" 
                fullWidth 
                onClick={() => handleComplete(() => setStage('start'))} 
                sx={{ borderRadius: '20px', py: 2, bgcolor: "#A08E73", fontWeight: 700, fontSize: '1rem', boxShadow: 'none', mb: 2 }}
              >
                다시 도전하기
              </Button>
              <Button 
                variant="outlined" 
                fullWidth 
                onClick={() => handleComplete(() => navigate('/quiz'))} 
                sx={{ borderRadius: '20px', py: 2, color: "#A08E73", borderColor: "#A08E73", fontWeight: 700, fontSize: '1rem' }}
              >
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