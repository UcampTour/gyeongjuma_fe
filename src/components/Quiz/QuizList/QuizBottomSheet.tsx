import { Sheet } from "react-modal-sheet";
import { Box, Button, Typography } from "@mui/material";
import QuizIcon from '@mui/icons-material/Quiz';
import MedalIcon from '@mui/icons-material/MilitaryTech';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useNavigate } from "react-router-dom";
import type { QuizListItem } from "../../../models/QuizModel";
import { QuizStatus } from "../../../models/QuizModel";

interface QuizBottomSheetProps {
  quiz: QuizListItem;
  drawerOpen: boolean;
  drawerClose: () => void;
}

const QuizBottomSheet = ({ quiz, drawerOpen, drawerClose }: QuizBottomSheetProps) => {
  const navigate = useNavigate();

  if (!quiz) return null;

  const isCompleted = quiz.quizStatus === QuizStatus.COMPLETED;
  const isProgress = quiz.quizStatus === QuizStatus.PROGRESS;

  const label = isCompleted ? "다시 도전하기" : (isProgress ? "이어 도전하기" : "도전 시작하기");
  const bgColor = isCompleted ? "#5F7464" : (isProgress ? "#D4A373" : "#A08E73");

  return (
    <Sheet
      isOpen={drawerOpen}
      onClose={drawerClose}
      snapPoints={[0, 0.6]} 
      initialSnap={1}
      disableDrag={false} 
    >
      <Sheet.Container
        style={{
          borderTopLeftRadius: "32px",
          borderTopRightRadius: "32px",
          backgroundColor: "#FFFFFF",
          touchAction: 'none' 
        }}
      >
        <Sheet.Content>
          <Box sx={{ maxWidth: '500px', mx: 'auto', width: '100%', px: 3, pb: 3, pt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ width: '100%', height: '160px', borderRadius: '24px', overflow: 'hidden' }}>
              <img 
                src={quiz.image} 
                alt={quiz.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#1F1F1F' }}>
                {quiz.title}
              </Typography>
              <Typography sx={{ color: '#7A7265', fontSize: '0.9rem', mt: 1.5 }}>
                {quiz.description}
              </Typography>
            </Box>

            <Box sx={{ mt:4, display: 'flex', justifyContent: 'space-between', bgcolor: '#F9F7F2', p: 1.5, borderRadius: '20px' }}>
              {[
                { icon: <QuizIcon fontSize="small" />, label: "문항", val: `${quiz.totalQuestions}문항` },
                { icon: <MedalIcon fontSize="small" />, label: "난이도", val: "일반" },
                { icon: <EmojiEventsIcon fontSize="small" />, label: "포인트", val: "50p" }
              ].map((item, i) => (
                <Box key={i} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.2, flex: 1 }}>
                  <Box sx={{ color: '#A08E73', display: 'flex', alignItems: 'center' }}>{item.icon}</Box>
                  <Typography sx={{ fontSize: '0.7rem', color: '#888', fontWeight: 700 }}>{item.label}</Typography>
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 800, color: '#1F1F1F' }}>{item.val}</Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {isCompleted && (
                <Typography sx={{ fontSize: '0.75rem', color: '#888', fontWeight: 500 }}>
                  * 이미 완료한 퀴즈는 포인트가 지급되지 않습니다.
                </Typography>
              )}
            </Box>

            <Button 
              variant="contained" 
              fullWidth 
              onClick={() => navigate(`/quiz/${quiz.id}`)} 
              sx={{ 
                py: 1.5, 
                borderRadius: '16px', 
                fontWeight: 800, 
                fontSize: '1rem',
                bgcolor: bgColor, 
                boxShadow: 'none',
                '&:hover': { bgcolor: bgColor, opacity: 0.9 }
              }}
            >
              {label}
            </Button>
          </Box>
        </Sheet.Content>
      </Sheet.Container>
      
      <Sheet.Backdrop onTap={drawerClose} />
    </Sheet>
  );
};

export default QuizBottomSheet;