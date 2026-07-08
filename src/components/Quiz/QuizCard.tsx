import { memo } from "react"
import { QuizStatus, type QuizListItem } from "../../models/QuizModel";
import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import QuizIcon from '@mui/icons-material/Quiz';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';

interface QuizCardProps {
  quiz: QuizListItem;
}

export const QuizCard = ({ quiz }: QuizCardProps) => {

  const isLocked = quiz.quizStatus === QuizStatus.LOCKED;
  const isAvailable = quiz.quizStatus === QuizStatus.AVAILABLE;
  const isProgressing = quiz.quizStatus === QuizStatus.PROGRESS;
  const isCompleted = quiz.quizStatus === QuizStatus.COMPLETED;
  
  return (
    <Card
      key={quiz.id}
      elevation={0}
      sx={{
        display: "flex",
        bgcolor: "#FFFFFF",
        borderRadius: "16px", 
        p: 1.5,                
        cursor: isLocked ? "default" : "pointer",
        boxShadow: "0 4px 12px rgba(142,114,73,0.04)", 
        position: "relative", 
        overflow: "visible", 
        borderLeft: isCompleted ? "4px solid #4E7055" : "none",
        border: isAvailable ? "1px solid rgba(142, 114, 73, 0.15)" : "none", 
        opacity: isLocked ? 0.6 : 1,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": { transform: "translateY(-2px)" },
        
        "&::before, &::after": {
          content: '""',
          position: "absolute",
          width: "16px",
          height: "16px",
          backgroundColor: "#F7F5EE",
          borderRadius: "50%",
          left: "112px", 
          zIndex: 2,
        },
        "&::before": { top: "-8px" },
        "&::after": { bottom: "-8px" }
      }}
    >
      <Box sx={{ position: "relative", width: 100, height: 100, flexShrink: 0 }}>
        <CardMedia 
          component="img" 
          image={quiz.image} 
          sx={{ width: "100%", height: "100%", borderRadius: "12px", objectFit: "cover", bgcolor: "#F5F2EB" }} 
        />
        {isLocked && (
          <Box sx={{ position: "absolute", inset: 0, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.35)" }}>
            <LockIcon sx={{ color: "#FFFFFF", fontSize: 20 }} />
          </Box>
        )}
      </Box>

      <Box 
        sx={{ 
          width: "1px", 
          borderLeft: "2px dashed #E5E0D8", 
          mx: 1.5, 
          my: 0.5,
          position: "relative" 
        }} 
      />

      <Box sx={{ flex: 1, pr: 0.5, display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 0, overflow: "hidden" }}>
        <Box>
          <Typography sx={{ fontWeight: 800, fontSize: "17px", color: "#111111", mb: 0.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", pr: (isCompleted || isProgressing) ? 3 : 0 }}>
            {quiz.title}
          </Typography>
          <Typography sx={{ color: "#958D80", fontSize: "12.5px", lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {quiz.description}
          </Typography>
        </Box>
        
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1, mt: 0.8, flexWrap: "nowrap" }}>
          <Box sx={{ display: "flex", alignItems: "center", bgcolor: "#F5F2EB", px: 0.8, py: 0.4, borderRadius: "4px", minWidth: 0, flexShrink: 1 }}>
            <QuizIcon sx={{ fontSize: "11px", color: "#8E7249", mr: 0.4, flexShrink: 0 }} />
            <Typography sx={{ color: "#7A7265", fontSize: "10.5px", fontWeight: 800, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {`총 ${quiz.totalQuestions}문항`}
            </Typography>
          </Box>

          <Button
            size="small" 
            variant={isProgressing ? "outlined" : "contained"}
            disabled={isLocked} 
            sx={{ 
              height: "26px", 
              borderRadius: "6px", 
              fontSize: "11px", 
              fontWeight: 800, 
              px: 1.2, 
              minWidth: "68px",
              whiteSpace: "nowrap", 
              flexShrink: 0,        
              boxShadow: "none", 
              borderColor: isProgressing ? "#BA9663" : "transparent",
              bgcolor: isCompleted ? "#EFECE5" : isProgressing ? "transparent" : "#8E7249", 
              color: isCompleted ? "#A49E95" : isProgressing ? "#BA9663" : "#FFFFFF", 
              pointerEvents: isLocked ? "none" : "auto",
              "& :hover": { bgcolor: isProgressing ? "rgba(186, 150, 99, 0.1)" : isCompleted ? "#EFECE5" : "#765E3C" }
            }}
          >
            {isCompleted ? '다시 풀기' : isProgressing ? '이어 풀기' : '도전하기'}
          </Button>
        </Box>
      </Box>

      {isCompleted && (
        <Box sx={{ position: "absolute", right: 8, top: 8, display: "flex", alignItems: "center", color: "#2E7D32" }}>
          <CheckCircleIcon sx={{ fontSize: "18px" }} />
        </Box>
      )}
      {isProgressing && (
        <Box sx={{ position: "absolute", right: 8, top: 8, display: "flex", alignItems: "center", color: "#C27D38" }}>
          <PendingIcon sx={{ fontSize: "18px" }} />
        </Box>
      )}
    </Card>
  );
}

export default memo(QuizCard);