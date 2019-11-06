import withTheme from '@material-ui/core/styles/withTheme';
import styled from 'styled-components';

export const StyledPaper = withTheme(styled.div`
  margin-top: ${({ theme }) => theme.spacing(8)}px;
  display: flex;
  flex-direction: column;
  align-items: center;
`);
