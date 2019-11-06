import Avatar from '@material-ui/core/Avatar';
import withTheme from '@material-ui/core/styles/withTheme';
import styled from 'styled-components';

export const StyledAvatar = withTheme(styled(Avatar)`
  margin: ${({ theme }) => theme.spacing(1)}px;
  background-color: ${({ theme }) => theme.palette.secondary.main};
`);
