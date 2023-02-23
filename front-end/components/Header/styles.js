import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';

export const StyledSearch = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '90%', // Alteração na largura
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '50%',
    },

}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `10px`,
      transition: theme.transitions.create('width'),
      width: '100%',
    },
}));