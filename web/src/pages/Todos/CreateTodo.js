import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import { DateTimePicker } from '@material-ui/pickers';
import React from 'react';
import { useMutation } from 'react-apollo';

import { MultiSelectChips } from '../../components/MultiSelectChips';
import { CREATE_TODO, GET_TODOS } from './queries';

export const CreateTodo = () => {
  const [todo, updateTodo] = React.useState({ description: '', labels: [] });
  const updateText = field => ({ target: { value } }) =>
    updateTodo({ ...todo, [field]: value });
  const updateDueDate = dueDate => updateTodo({ ...todo, dueDate });
  const updateLabels = labels => {
    console.log(labels)
    return updateTodo({...todo, labels});
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    updateTodo({ description: '', labels: [] });
    return setOpen(false);
  };

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
        data: {
          ...data,
          viewer: {
            ...data.viewer,
            todos: data.viewer.todos.concat([createTodo]),
          },
        },
      });
    },
  });
  const handleSubmit = e => {
    e.preventDefault();
    createTodo({ variables: { ...todo } }).then(() => handleClose());
  };

  return (
    <>
      <IconButton size="small" onClick={handleOpen}>
        <AddIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="create-todo-modal-title"
      >
        <DialogTitle id="create-todo-modal-title">
          Create a new todo task
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              id="title"
              label="Title"
              value={todo.title || ''}
              required
              onChange={updateText('title')}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              margin="normal"
              variant="outlined"
              id="description"
              label="Description"
              value={todo.description || ''}
              onChange={updateText('description')}
            />
            <DateTimePicker
              fullWidth
              margin="normal"
              id="dueDate"
              label="Due date"
              clearable
              value={todo.dueDate || null}
              onChange={updateDueDate}
            />
            <MultiSelectChips
              fullWidth
              id="labels"
              label="Labels"
              value={todo.labels}
              onChange={updateLabels}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" color="secondary" variant="contained">
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
