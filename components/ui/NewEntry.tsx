import { useState, ChangeEvent, useContext, FC } from "react";
import { Box, Button, TextField } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui';


export const NewEntry: FC = () => {

  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);

  const { addNewEntry } = useContext(EntriesContext);

  const{ setIsAddingaEntry, isAddingEntry } = useContext(UIContext);

  const onChangeEvent = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  }

  const onSave = () => {
    if(inputValue.length <= 0) return;
    addNewEntry(inputValue);
    setTouched(!touched);
    setIsAddingaEntry(!isAddingEntry);
    setInputValue('');
  }

  const handleCancel = () => {
    setTouched(!touched);
    setIsAddingaEntry(!isAddingEntry)
  }

  return (

    <Box sx={{ px: 1, mb: 2 }}>
      {isAddingEntry ? (
        <Box className='animate'>
          <TextField
            id='form'
            fullWidth
            sx={{ mt: 1, mb: 1 }}
            label="New entry"
            placeholder="New entry"
            autoFocus
            multiline
            helperText={ inputValue.length <= 0 && touched && 'Field required' }
            error={ inputValue.length <= 0 && touched }
            value={ inputValue }
            onChange={ (e)=> onChangeEvent(e) }
            onBlur={ () => setTouched(!touched) }
          />

          <Box display="flex" sx={{ mb: 1.5 }} justifyContent={"space-between"}>
            <Button
              variant="contained"
              // color="primary"
              endIcon={<CancelOutlinedIcon />}
              onClick={ handleCancel }
            >
              Cancel
            </Button>

            <Button
              sx={{ ml: 2 }}
              variant="contained"
              // color="secondary"
              endIcon={<SaveOutlinedIcon />}
              onClick={ onSave }
            >
              Save
            </Button>
          </Box>
        </Box>
      ) : (
        <Button
          fullWidth
          variant="contained"
          startIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={() => setIsAddingaEntry(!isAddingEntry)}
          className='animate'
        >
          Add task
        </Button>
      )}
    </Box>
  );
};
