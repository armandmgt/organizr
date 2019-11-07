import Paper from '@material-ui/core/Paper';
import withTheme from '@material-ui/core/styles/withTheme';
import styled from 'styled-components';

const StyledPaper = withTheme(styled(Paper)`
  padding: ${({ theme }) => theme.spacing(2)}px;
  display: flex;
  overflow: auto;
  flex-direction: column;
`);

export default StyledPaper;
