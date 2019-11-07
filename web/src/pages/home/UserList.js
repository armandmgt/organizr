import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { gql } from 'apollo-boost';
import React from 'react';
import { useQuery } from 'react-apollo';

import AddUser from '../../components/AddUser';
import StyledPaper from '../../components/StyledPaper';

export const GET_USERS = gql`
  query ListUsers {
    users {
      id
      username
    }
  }
`;

const UserList = () => {
  const { loading, data } = useQuery(GET_USERS);
  return (
    <StyledPaper>
      <Box position="relative">
        <Title>Users</Title>
        {loading ? (
          <div>loading...</div>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Username</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.users.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <AddUser />
      </Box>
    </StyledPaper>
  );
};

const Title = ({ children }) => (
  <Typography variant="h6" component="h5" color="primary" gutterBottom>
    {children}
  </Typography>
);

export default UserList;
