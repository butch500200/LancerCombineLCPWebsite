import React from 'react';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import useField from '../hooks/useField.js';

function CreateManifest({ handleConfirmManifest }) {
  const author = useField('text');
  const description = useField('text');
  const name = useField('text');
  const version = useField('text');
  const submitRef = React.useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const manifest = {
      author: author.value,
      description: description.value,
      name: name.value,
      version: version.value,
    };
    // console.log(manifest);
    handleConfirmManifest(manifest);
  };
  const handleButtonClick = () => {
    submitRef.current.click();
  };

  return (
    <>
      <DialogTitle>Create Manifest</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Box sx={{ m: 2 }}>
            <TextField label="Author" variant="outlined" {...author} required />
          </Box>
          <Box sx={{ m: 2 }}>
            <TextField
              label="Description"
              variant="outlined"
              {...description}
              required
            />
          </Box>
          <Box sx={{ m: 2 }}>
            <TextField label="Name" variant="outlined" {...name} required />
          </Box>
          <Box sx={{ m: 2 }}>
            <TextField
              label="Version"
              variant="outlined"
              {...version}
              required
            />
          </Box>
          <button type="submit" ref={submitRef} style={{ display: 'none' }} />
        </form>
      </DialogContent>
      <DialogActions>
        <Button type="submit" color="primary" onClick={handleButtonClick}>
          Confirm
        </Button>
      </DialogActions>
    </>
  );
}

export default CreateManifest;
