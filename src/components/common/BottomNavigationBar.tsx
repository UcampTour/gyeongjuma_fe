import React from 'react'; 
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import PlaceIcon from '@mui/icons-material/Place'; 
import MapIcon from '@mui/icons-material/Map'; 
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PersonIcon from '@mui/icons-material/Person'; 

function BottomNavigationBar() {
  const [value, setValue] = React.useState(0);

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: '50%', 
        transform: 'translateX(-50%)', 
        width: '100%',
        maxWidth: 'xs', 
        bgcolor: '#EFECE2', 
        pt: 1,
        pb: 1,
        zIndex: 1000,
        outline: '1px solid #EFECE2',
        boxShadow: '0 0 0 1px #EFECE2',
      }}
    >
      <BottomNavigation
        showLabels
        value={value} 
        onChange={(_, newValue) => setValue(newValue)} 
        sx={{ 
          bgcolor: 'transparent',
          height: '65px',
          '& .MuiBottomNavigationAction-root': {
            color: '#555555',
            minWidth: 'auto',
            padding: '6px 0',
            fontWeight: 500,
          },
          '& .Mui-selected': {
            color: '#333333 !important',
            fontWeight: 'bold',
            '& .icon-bg': {
              bgcolor: '#E4DDD0', 
              borderRadius: '20px',
              px: 2,
              py: 0.5,
              display: 'inline-flex', 
            }
          },
          '& .MuiBottomNavigationAction-label': {
            fontSize: '12px',
            marginTop: '4px',
            '&.Mui-selected': { fontSize: '12px' }
          }
        }}
      >
        <BottomNavigationAction 
          label="Explore" 
          icon={<span className="icon-bg"><PlaceIcon /></span>} 
        />
        <BottomNavigationAction 
          label="Course" 
          icon={<span className="icon-bg"><MapIcon /></span>} 
        />
        <BottomNavigationAction 
          label="Quiz" 
          icon={<span className="icon-bg"><AssignmentTurnedInIcon /></span>} 
        />
        <BottomNavigationAction 
          label="MyPage" 
          icon={<span className="icon-bg"><PersonIcon /></span>}
        />
      </BottomNavigation>
    </Paper>
  );
}

export default BottomNavigationBar;