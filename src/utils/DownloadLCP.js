import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const downloadLCP = async (fileData, zipFileName) => {
  const zip = new JSZip();

  fileData.forEach((item) => {
    const fileContent = item.content;
    // if we dont use deflate here the size is like 3 times bigger
    zip.file(
      `${item.name}`,
      new Blob([JSON.stringify(fileContent)], { type: 'text/plain' }),
      { compression: 'DEFLATE' },
    );
  });

  const zipFile = await zip.generateAsync({ type: 'blob' });
  saveAs(zipFile, `${zipFileName}.lcp`);
};

export default downloadLCP;
