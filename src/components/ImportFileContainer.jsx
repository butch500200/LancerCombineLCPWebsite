import React, { useState } from 'react';
import { Dialog, Grid } from '@mui/material';
import FileNameDisplay from './FileNameDisplay.jsx';
import LoadFiles from './LoadFiles.jsx';
import CreateManifest from './CreateManifest.jsx';

function ImportFileContainer() {
  const [filesData, setFilesData] = useState();

  const [open, setOpen] = useState(false);
  const [manifest, setManifest] = useState(false);

  const deleteFile = (fileNameToDelete) => {
    const newFilesData = Object.keys(filesData).reduce(
      (fileDataTemp, fileName) => {
        // add the data if the filename isnt the one to delete
        if (fileName !== fileNameToDelete) {
          // eslint-disable-next-line no-param-reassign
          fileDataTemp[fileName] = filesData[fileName];
        }
        return fileDataTemp;
      },
      {},
    );
    setFilesData(newFilesData);
  };

  const uploadFileData = (data) => {
    setFilesData(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFilesData(null);
    setManifest(false);
  };

  const handleConfirmFileUpload = (finalData) => {
    const combinedData = {};

    Object.keys(finalData).forEach((fileName) => {
      const fileDataTemp = finalData[fileName];

      Object.keys(fileDataTemp).forEach((property) => {
        // If property is not created in combinedData, create a new array with the property as key
        if (!combinedData[property]) {
          combinedData[property] = [];
        }

        // If the property's value is an array, concat it to the existing property
        // Otherwise, push it into the array
        if (Array.isArray(fileDataTemp[property])) {
          combinedData[property] = [
            ...combinedData[property],
            ...fileDataTemp[property],
          ];
        } else {
          combinedData[property].push(fileDataTemp[property]);
        }
      });
    });

    setFilesData(combinedData);
    setManifest(true);
  };
  const handleConfirmManifest = (manifestData) => {
    const newFilesData = { ...filesData, 'lcp_manifest.json': manifestData };
    setFilesData(newFilesData);
    console.log('file data', newFilesData);
  };

  return (
    <Grid
      item
      xs={7}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LoadFiles setFilesData={uploadFileData} />
      <Dialog open={open} onClose={handleClose}>
        {manifest ? (
          <CreateManifest handleConfirmManifest={handleConfirmManifest} />
        ) : (
          <FileNameDisplay
            filesData={filesData}
            deleteFile={deleteFile}
            handleConfirmFileUpload={handleConfirmFileUpload}
          />
        )}
      </Dialog>
    </Grid>
  );
}

export default ImportFileContainer;
