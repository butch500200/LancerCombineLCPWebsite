import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import Unzip from '../utils/Unzip.js';

function LoadFiles({ setFilesData }) {
  const [loading, setLoading] = useState(false);
  const fileInputRef = React.useRef(null);
  const handleFileUpload = (event) => {
    const { files } = event.target;
    setLoading(true);
    const minLoadingTime = 1000; // time for one full rotation
    const uploadStartTime = Date.now();
    Promise.all(
      Array.from(files).map(async (file) => {
        const data = await Unzip(file);
        // console.log(file, data);
        return { [file.name]: data };
      }),
    ).then((updatedFilesData) => {
      const uploadEndTime = Date.now();
      if (uploadEndTime - uploadStartTime < minLoadingTime) {
        setTimeout(
          () => {
            setLoading(false);
            setFilesData(Object.assign({}, ...updatedFilesData));
          },
          minLoadingTime - (uploadEndTime - uploadStartTime),
        );
      } else {
        setLoading(false);
        setFilesData(Object.assign({}, ...updatedFilesData));
      }
    });
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  return (
    <>
      <Button
        sx={{
          width: '500px',
        }}
        variant="contained"
        color="primary"
        onClick={handleButtonClick}
        component="span"
      >
        {loading ? (
          <CircularProgress color="inherit" size={24} />
        ) : (
          'Upload .lcp Files'
        )}
      </Button>
      <input
        type="file"
        accept=".lcp"
        multiple
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
    </>
  );
}

export default LoadFiles;
