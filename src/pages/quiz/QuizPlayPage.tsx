import { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, LinearProgress, Fade, Divider } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import MedalIcon from '@mui/icons-material/MilitaryTech';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ReplayIcon from '@mui/icons-material/Replay';
import ListIcon from '@mui/icons-material/List';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import { QuizStatus } from '../../models/QuizModel';
import { quizDetailData } from '../../data/quiz/QuizData';
import QuizStart from '../../components/Quiz/QuizDetail/QuizStart';

const answerData = [1, 3, 4, 2, 1];

const useAnimatedNumber = (targetNumber: number, duration: number = 500) => {
  const [currentNumber, setCurrentNumber] = useState(targetNumber);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const startNumber = currentNumber;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      setCurrentNumber(Math.floor(progress * (targetNumber - startNumber) + startNumber));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [targetNumber]);

  return currentNumber;
};

const QuizPlayPage = () => {
  const navigate = useNavigate();

  const [stage, setStage] = useState('start'); 
  const [currentIdx, setCurrentIdx] = useState(0);
  const [correctCnt, setCorrectCnt] = useState(0);
  
  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);
  const [progressIdx, setProgressIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const animatedPoint = useAnimatedNumber(correctCnt * 50, 400);
  const isCompleted = quizDetailData.quizStatus === QuizStatus.COMPLETED;

  const currentQuestion = quizDetailData.questions[currentIdx];
  const correctAnswerId = answerData[currentIdx];

  const handleAnswer = (answerId: number) => {
    if (selectedAnswerId !== null) return; 

    setSelectedAnswerId(answerId);
    setUserAnswers((prev) => [...prev, answerId]);

    if (answerId === correctAnswerId) {
      setCorrectCnt((prev) => prev + 1);
    }    

    setProgressIdx((prev) => prev + 1);

    setTimeout(() => {
      if (currentIdx === quizDetailData.totalQuestions - 1) {
        setStage("result");
      } else {
        setCurrentIdx((prev) => prev + 1);
      }
      setSelectedAnswerId(null); 
    }, 1000);
  };

  const handleComplete = (callback: () => void) => {
    setCurrentIdx(0);
    setCorrectCnt(0);
    setProgressIdx(0);
    setSelectedAnswerId(null);
    setUserAnswers([]); 
    callback();
  };

  const getHeaderProps = () => {
    switch (stage) {
      case 'start':
        return { title: "퀴즈 시작하기" };
      case 'playing':
        return { title: quizDetailData.title, customBack: () => setStage('start') };
      case 'result':
        return { title: "퀴즈 완료", customBack: () => handleComplete(() => setStage('start')) };
      case 'review':
        return { title: "퀴즈 결과 상세보기", customBack: () => setStage('result') };
      default:
        return { title: "" };
    }
  };

  return (
    <Box sx={{ bgcolor: "#F7F5EE", height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center',overflow: 'hidden'}}>
      <Box sx={{ width: '100%', maxWidth: '500px' }}>
        <PageHeader {...getHeaderProps()} />
      </Box>

      <Box sx={{ width: '100%', maxWidth: '500px', height: '100%', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', px: 2, pb: 3, overflow: 'hidden'}}>
        
        {/* 1. 시작 화면 */}
        {stage === 'start' && (
          <Fade in={stage === 'start'}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, height: '100%', pb: 11 }}>
              <QuizStart quiz={quizDetailData} setStage={setStage} />
            </Box>
          </Fade>
        )}

        {/* 2. 퀴즈 풀이 화면 */}
        {stage === 'playing' && (
          <Fade in={stage === 'playing'}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, height: '100%', pb: 11 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-around', p: 2, bgcolor: "#FFFFFF", borderRadius: '20px', mt: 1.5, mb: 3, border: "1px solid rgba(160, 142, 115, 0.2)" }}>
                {[
                  { label: "남은 문항", val: `${quizDetailData.totalQuestions - currentIdx}문항` },
                  { label: "맞은 문항", val: `${correctCnt}문항` },
                  { label: "현재 포인트", val: `${animatedPoint}p` },
                ].map((item, i) => (
                  <Box key={i} sx={{ textAlign: 'center', flex: 1 }}>
                    <Typography sx={{ fontSize: '0.75rem', color: "#7A7265" }}>{item.label}</Typography>
                    <Typography sx={{ fontWeight: 800, fontSize: '1rem' }}>{item.val}</Typography>
                  </Box>
                ))}
              </Box>
              
              <LinearProgress 
                variant="determinate" 
                value={(progressIdx / quizDetailData.totalQuestions) * 100} 
                sx={{ height: 8, borderRadius: 5, bgcolor: '#EBE6D9', "& .MuiLinearProgress-bar": { bgcolor: "#A08E73", transition: 'transform 0.4s ease' } }} 
              />

              <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4 }}>
                <Typography sx={{ fontSize: '1.4rem', fontWeight: 700, textAlign: 'center', lineHeight: 1.5, wordBreak: 'keep-all' }}>
                  {currentQuestion?.question}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.8, mb: 1 }}>
                {currentQuestion?.options.map((option, index) => {
                  const isSelected = selectedAnswerId === option.answerId;
                  const isCorrectOption = option.answerId === correctAnswerId;
                  const hasAnswered = selectedAnswerId !== null;

                  let borderColor = "rgba(160, 142, 115, 0.15)";
                  let badgeBgColor = "#F2F0E9";
                  let badgeColor = "#7A7265";
                  let badgeContent: React.ReactNode = index + 1;

                  if (hasAnswered) {
                    if (isCorrectOption) {
                      borderColor = "#2E7D32";
                      badgeBgColor = "#E8F5E9";
                      badgeColor = "#2E7D32";
                      badgeContent = <CheckIcon sx={{ fontSize: '1.1rem' }} />;
                    } else if (isSelected) {
                      borderColor = "#D32F2F";
                      badgeBgColor = "#FFEBEE";
                      badgeColor = "#D32F2F";
                      badgeContent = <CloseIcon sx={{ fontSize: '1.1rem' }} />;
                    }
                  }

                  return (
                    <Button 
                      key={`${currentIdx}-${option.answerId}`}
                      variant="contained" 
                      fullWidth 
                      disabled={hasAnswered}
                      onClick={() => handleAnswer(option.answerId)} 
                      sx={{ 
                        display: 'flex', justifyContent: 'flex-start', py: 2, px: 2.5, borderRadius: '20px', 
                        bgcolor: "#FFFFFF", color: "#1F1F1F", border: `2px solid ${borderColor}`,
                        boxShadow: '0 4px 10px rgba(160, 142, 115, 0.05)', fontSize: '1rem', fontWeight: 600, 
                        textTransform: 'none', transition: 'all 0.2s ease',
                        "&.Mui-disabled": { bgcolor: "#FFFFFF", color: "#1F1F1F" }
                      }}
                    >
                      <Box sx={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px',
                        borderRadius: '50%', bgcolor: badgeBgColor, color: badgeColor, fontSize: '0.85rem', fontWeight: 700,
                        mr: 2, flexShrink: 0, transition: 'all 0.2s ease',
                      }}>
                        {badgeContent}
                      </Box>
                      <Box component="span">{option.content}</Box>
                    </Button>
                  );
                })}
              </Box>
            </Box>
          </Fade>
        )}

        {/* 3. 점수 확인 결과 화면 */}
        {stage === 'result' && (
          <Fade in={stage === 'result'}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, height: '100%', pb: 11 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', pt: 6, alignItems: 'center', flexGrow: 1 }}>
                <Box sx={{ fontSize: '80px', mb: 2 }}>🎉</Box>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: '#1F1F1F', fontSize: '1.8rem' }}>축하합니다!</Typography>
                <Typography sx={{ color: "#7A7265", fontSize: '1.05rem', mb: 1, textAlign: 'center' }}>
                  총 {quizDetailData.totalQuestions}문제 중 <b>{correctCnt}문제</b>를 맞혔습니다.
                </Typography>
                
                <Paper elevation={0} sx={{ 
                  bgcolor: '#FFFFFF', border: '1px solid rgba(160, 142, 115, 0.15)', 
                  borderRadius: '24px', px: 4, py: 2, mb: 6, display: 'flex', alignItems: 'center', gap: 1
                }}>
                  <EmojiEventsIcon sx={{ color: '#A08E73' }} />
                  <Typography sx={{ fontWeight: 800, color: '#1F1F1F', fontSize: '1.2rem' }}>
                    +{correctCnt * 50} Point
                  </Typography>
                </Paper>

                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1.5, mt: 'auto' }}>
                  <Button 
                    variant="contained" 
                    fullWidth 
                    startIcon={<AssignmentTurnedInIcon />}
                    onClick={() => setStage('review')} 
                    sx={{ borderRadius: '20px', py: 2, bgcolor: "#A08E73", fontWeight: 700, fontSize: '1rem', boxShadow: 'none' }}
                  >
                    퀴즈 결과 상세보기
                  </Button>
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    startIcon={<ListIcon />}
                    onClick={() => handleComplete(() => navigate('/quiz'))} 
                    sx={{ borderRadius: '20px', py: 2, color: "#A08E73", borderColor: "#A08E73", fontWeight: 700, fontSize: '1rem' }}
                  >
                    리스트로 돌아가기
                  </Button>
                </Box>
              </Box>
            </Box>
          </Fade>
        )}

        {/* 4. 모든 문제 요약 (Review) 화면 */}
        {stage === 'review' && (
          <Fade in={stage === 'review'}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, height: '100%', pb: 11 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, mt: 1, px: 0.5 }}>
                <Typography variant="subtitle2" sx={{ color: '#A08E73', fontWeight: 700 }}>
                  정오답 리뷰 카드로 확인하기
                </Typography>
                <Typography sx={{ fontSize: '0.8rem', color: '#7A7265', fontWeight: 600 }}>
                  정답률 {Math.round((correctCnt / quizDetailData.totalQuestions) * 100)}%
                </Typography>
              </Box>
              
              <Box sx={{ 
                width: '100%', display: 'flex', flexDirection: 'column', gap: 2, mb: 2, flexGrow: 1,
                overflowY: 'auto', pr: 0.5,
                '&::-webkit-scrollbar': { width: '4px' },
                '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(160, 142, 115, 0.2)', borderRadius: '4px' }
              }}>
                {quizDetailData.questions.map((q, idx) => {
                  const uAnsId = userAnswers[idx];
                  const cAnsId = answerData[idx];
                  const isCorrect = uAnsId === cAnsId;

                  return (
                    <Box key={q.quizId} sx={{
                      bgcolor: '#FFFFFF', borderRadius: '18px', p: 2,
                      border: `1px solid ${isCorrect ? 'rgba(46, 125, 50, 0.2)' : 'rgba(211, 47, 47, 0.2)'}`,
                      boxShadow: '0 4px 12px rgba(160, 142, 115, 0.03)'
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1.5 }}>
                        <Box sx={{ 
                          fontSize: '0.75rem', fontWeight: 800, px: 1, py: 0.3, borderRadius: '6px', flexShrink: 0,
                          bgcolor: isCorrect ? '#E8F5E9' : '#FFEBEE', color: isCorrect ? '#2E7D32' : '#D32F2F' 
                        }}>
                          Q {idx + 1}
                        </Box>
                        <Typography sx={{ fontSize: '0.92rem', fontWeight: 700, color: '#1F1F1F', lineHeight: 1.45, wordBreak: 'keep-all' }}>
                          {q.question}
                        </Typography>
                      </Box>
                      
                      <Divider sx={{ my: 1, borderColor: '#F2F0E9' }} />
                      
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8, pt: 0.5 }}>
                        {q.options.map((option, oIdx) => {
                          const isUserPicked = option.answerId === uAnsId;
                          const isRightAnswer = option.answerId === cAnsId;

                          let optionColor = '#4F4F4F';
                          let optionWeight = 500;
                          let checkIconElement: React.ReactNode = null;

                          if (isRightAnswer) {
                            optionColor = '#2E7D32';
                            optionWeight = 700;
                            checkIconElement = <CheckIcon sx={{ fontSize: '0.95rem', color: '#2E7D32', mr: 0.5 }} />;
                          } else if (isUserPicked && !isCorrect) {
                            optionColor = '#D32F2F';
                            optionWeight = 700;
                            checkIconElement = <CloseIcon sx={{ fontSize: '0.95rem', color: '#D32F2F', mr: 0.5 }} />;
                          }

                          return (
                            <Box key={option.answerId} sx={{ 
                              display: 'flex', alignItems: 'center', px: 1, py: 0.5, borderRadius: '8px',
                              bgcolor: isRightAnswer ? 'rgba(46, 125, 50, 0.04)' : (isUserPicked ? 'rgba(211, 47, 47, 0.04)' : 'transparent')
                            }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', width: '22px', flexShrink: 0 }}>{checkIconElement}</Box>
                              <Typography sx={{ fontSize: '0.85rem', color: optionColor, fontWeight: optionWeight, wordBreak: 'keep-all' }}>
                                {oIdx + 1}. {option.content}
                              </Typography>
                            </Box>
                          );
                        })}
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box sx={{ display: 'flex', gap: 1.5, mt: 'auto', pt: 1 }}>
                <Button variant="outlined" fullWidth startIcon={<ReplayIcon />} onClick={() => handleComplete(() => setStage('start'))} 
                  sx={{ borderRadius: '20px', py: 2, color: "#A08E73", borderColor: "#A08E73", fontWeight: 700, fontSize: '0.95rem' }}>
                  다시 도전하기
                </Button>
                <Button variant="contained" fullWidth startIcon={<ListIcon />} onClick={() => handleComplete(() => setStage('result'))} 
                  sx={{ borderRadius: '20px', py: 2, bgcolor: "#A08E73", fontWeight: 700, fontSize: '0.95rem', boxShadow: 'none' }}
                >
                  결과 화면
                </Button>
              </Box>
            </Box>
          </Fade>
        )}
      </Box>
    </Box>
  );
};

export default QuizPlayPage;