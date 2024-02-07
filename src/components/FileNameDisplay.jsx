import React from 'react';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';

function FileNameDisplay({ filesData, deleteFile, handleConfirmFileUpload }) {
  if (filesData === null || filesData === undefined) {
    return <></>;
  }
  const handleDelete = (filename) => {
    deleteFile(filename);
  };

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  }));

  return (
    <>
      <DialogTitle>Uploaded Files</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }}>
            <TableBody>
              {Object.keys(filesData).map((fileName) => (
                <StyledTableRow key={fileName}>
                  <TableCell component="th" scope="row">
                    {fileName}
                  </TableCell>
                  <TableCell align="left">
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(fileName)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleConfirmFileUpload(filesData)}
          color="primary"
        >
          Confirm
        </Button>
      </DialogActions>
    </>
  );
}

export default FileNameDisplay;
