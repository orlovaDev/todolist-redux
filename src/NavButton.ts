import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

type NavButtonPropsType ={
  background?: string
}

export const NavButton = styled(Button)<NavButtonPropsType> (({background, theme}) => ({
  minWidth: '90px',
  fontWeight: 'bold',
  borderRadius: '5px',
  margin: '0 10px',
  padding: '8px 24px',
  color: 'text.primary',
  background: background || theme.palette.secondary.main,
}))

