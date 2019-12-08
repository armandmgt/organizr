import Chip from '@material-ui/core/Chip';
import InputAdornment from '@material-ui/core/InputAdornment';
import withTheme from '@material-ui/core/styles/withTheme';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import styled from 'styled-components';

const KEY_CODES = {
  backspace: 8,
  tab: 9,
  enter: 13,
};

export const MultiSelectChips = ({
  value = [],
  onChange = () => {},
  ...other
}) => {
  const [items, setItems] = React.useState(value);
  const [newItem, setNewItem] = React.useState('');

  const handleUpdateNewItem = ({ target: { value } }) => {
    const trimmed = value.trim();
    if (trimmed.length) onChange([...items, trimmed]);
    else if (newItem.length) onChange([...items]);
    setNewItem(value);
  };

  const handleAddItem = () => {
    const trimmed = newItem.trim();
    if (trimmed.length && !items.includes(trimmed)) {
      const newItems = [...items, trimmed];
      setItems(newItems);
      onChange(newItems);
    }
    setNewItem('');
  };
  const handleDeleteItem = index => () => {
    const newItems = [...items];
    newItems.splice(index, 1);
    onChange(newItems);
    setItems(newItems);
  };

  const handleKeyDown = e => {
    const { which: keyPressed } = e;
    if (
      keyPressed === KEY_CODES.enter ||
      (keyPressed === KEY_CODES.tab && newItem)
    ) {
      e.preventDefault();
      handleAddItem();
    } else if (keyPressed === KEY_CODES.backspace) {
      if (!newItem && items.length) {
        handleDeleteItem(items.length - 1)();
      }
    }
  };

  return (
    <TextField
      {...other}
      value={newItem}
      onChange={handleUpdateNewItem}
      onKeyDown={handleKeyDown}
      InputProps={{
        startAdornment: items.length ? (
          <StyledAdornment position="start">
            {items.map((item, index) => (
              <Chip
                key={item}
                label={item}
                size="small"
                onDelete={handleDeleteItem(index)}
              />
            ))}
          </StyledAdornment>
        ) : null,
      }}
    />
  );
};

const StyledAdornment = withTheme(styled(InputAdornment)`
  display: flex;
  flex-wrap: wrap;
  height: unset;
  max-height: unset;
  max-width: 60%;
  & > * {
    margin: ${({ theme }) => theme.spacing(0.2)}px;
  }
`);
