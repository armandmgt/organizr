import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import { ThemeProvider } from '@material-ui/core/styles';
import withTheme from '@material-ui/core/styles/withTheme';
import DoneIcon from '@material-ui/icons/CheckCircle';
import update from 'immutability-helper';
import MaterialTable from 'material-table';
import React from 'react';
import { useMutation, useQuery } from 'react-apollo';
import styled from 'styled-components';

import StyledPaper from '../../components/StyledPaper';
import { successTheme } from '../../theme';
import { tableIcons } from '../../utils';
import { CREATE_TODO, DELETE_TODO, GET_TODOS, UPDATE_TODO } from './queries';

const Todos = () => {
  const { loading, error, data } = useQuery(GET_TODOS);

  const [createTodo] = useMutation(CREATE_TODO, {
    update(
      cache,
      {
        data: { createTodo },
      }
    ) {
      const data = cache.readQuery({ query: GET_TODOS });
      cache.writeQuery({
        query: GET_TODOS,
        data: update(data, {
          viewer: {
            todos: {
              $push: [createTodo],
            },
          },
        }),
      });
    },
  });

  const [deleteTodo] = useMutation(DELETE_TODO, {
    update(
      cache,
      {
        data: { deleteTodo },
      }
    ) {
      if (!deleteTodo.ok) return;
      const data = cache.readQuery({ query: GET_TODOS });
      cache.writeQuery({
        query: GET_TODOS,
        data: update(data, {
          viewer: {
            todos: {
              $splice: [
                [
                  data.viewer.todos.findIndex(t => t.id === deleteTodo.todo.id),
                  1,
                ],
              ],
            },
          },
        }),
      });
    },
  });

  const [updateTodo] = useMutation(UPDATE_TODO, {
    update(
      cache,
      {
        data: { updateTodo },
      }
    ) {
      if (!updateTodo.ok) return;
      const data = cache.readQuery({ query: GET_TODOS });
      cache.writeQuery({
        query: GET_TODOS,
        data: update(data, {
          viewer: {
            todos: {
              [data.viewer.findIndex(t => t.id === updateTodo.todo.id)]: {
                $merge: updateTodo.todo,
              },
            },
          },
        }),
      });
    },
  });

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          {loading || error ? (
            <StyledPaper>loading...</StyledPaper>
          ) : (
            <MaterialTable
              icons={tableIcons}
              title="Todos"
              columns={[
                { title: 'Title', field: 'title' },
                { title: 'Description', field: 'description' },
                { title: 'Due date', field: 'dueDate' },
                {
                  title: 'Done',
                  field: 'done',
                  render: todo =>
                    todo.done ? (
                      <ThemeProvider theme={successTheme}>
                        <DoneIcon color="secondary" />
                      </ThemeProvider>
                    ) : (
                      ''
                    ),
                },
                {
                  title: 'Labels',
                  field: 'labels',
                  render: todo =>
                    todo.labels.map(l => (
                      <StyledChip key={l} label={l} size="small" />
                    )),
                },
              ]}
              data={data.viewer.todos}
              editable={{
                onRowAdd: async newTodo => {
                  return createTodo({ variables: { ...newTodo } });
                },
                onRowDelete: async todo => {
                  return deleteTodo({ variables: { id: todo.id } });
                },
                onRowUpdate: async updatedTodo => {
                  return updateTodo({ variables: { ...updatedTodo } });
                },
              }}
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

const StyledChip = withTheme(styled(Chip)`
  margin: ${({ theme }) => theme.spacing(0.2)}px;
`);

export default Todos;
