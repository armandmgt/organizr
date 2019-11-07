import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import withTheme from '@material-ui/core/styles/withTheme';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import React from 'react';
import styled from 'styled-components';

const ErrorSnackbar = ({ message }) => {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <StyledSnackbarContent
        message={
          <MessageWrapper>
            <StyledErrorIcon />
            {message}
          </MessageWrapper>
        }
        action={[
          <CloseButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon />
          </CloseButton>,
        ]}
      />
    </Snackbar>
  );
};

const StyledSnackbarContent = withTheme(styled(SnackbarContent)`
  background-color: ${({ theme }) => theme.palette.error.dark};
`);

const MessageWrapper = styled.span`
  display: flex;
  align-items: center;
`;

const StyledErrorIcon = withTheme(styled(ErrorIcon)`
  font-size: 20px;
  opacity: 0.9;
  margin-right: ${({ theme }) => theme.spacing(1)}px;
`);

const CloseButton = withTheme(styled(IconButton)`
  padding: ${({ theme }) => theme.spacing(0.5)}px;
`);

export default ErrorSnackbar;
