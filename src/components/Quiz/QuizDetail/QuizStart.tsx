import { Box, Button, Paper, Typography } from "@mui/material"
import QuizIcon from '@mui/icons-material/Quiz';
import MedalIcon from '@mui/icons-material/MilitaryTech';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { QuizStatus, type QuizItem } from "../../../models/QuizModel";

interface QuizStartProps {
  quiz: QuizItem;
  setStage: (stage:string) => void;
}

const QuizStart = ({ quiz, setStage }: QuizStartProps) => {

  const isCompleted = quiz.quizStatus === QuizStatus.COMPLETED;

  return (
    <>
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
          {quiz.title}
        </Typography>
        <Typography sx={{ color: "#7A7265", fontSize: '0.9rem', textAlign: 'center', px: 1, mb: 2.5, lineHeight: 1.5, wordBreak: 'keep-all' }}>
          {quiz.description}
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
            { icon: <QuizIcon fontSize="small"/>, label: "문항 수", val: `${quiz.totalQuestions}문` },
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
            {isCompleted ? "이미 완료한 퀴즈는 포인트가 지급되지 않습니다." : "각 문항당 50P씩 획득합니다."}
          </Typography>
        </Box>
        
        <Button onClick={() => setStage('playing')} variant="contained" fullWidth 
          sx={{ borderRadius: '20px', py: 2, bgcolor: "#A08E73", fontSize: '1rem', fontWeight: 700, boxShadow: 'none' }}>
          도전 시작하기
        </Button>
      </Paper>
    </>
  )
};

export default QuizStart;