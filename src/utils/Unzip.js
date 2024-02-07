import JSZip from 'jszip';

const Unzip = async (file) => {
  // create a new instance of JSZip
  const jszip = new JSZip();

  // load the .lcp file and an object to store the json data
  const jsonData = {};

  try {
    const zip = await jszip.loadAsync(file);

    // used to keep track of all promises from async() calls
    const promises = [];

    Object.keys(zip.files).forEach((filename) => {
      if (filename.endsWith('.json')) {
        const promise = zip.files[filename].async('string').then((fileData) => {
          jsonData[filename] = JSON.parse(fileData);
        });
        promises.push(promise);
      }
    });

    // wait for all promises to finish
    await Promise.all(promises);

    return jsonData;
  } catch (e) {
    console.error('Error reading .lcp file: ', e);
    return null;
  }
};

export default Unzip;
