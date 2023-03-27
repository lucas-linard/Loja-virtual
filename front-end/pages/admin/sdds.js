import React, { useEffect, useState } from "react";
import { uniqueId } from "lodash";
import filesize from "filesize";


import Upload from "../../components/Upload";
import FileList from "../../components/FileList";

function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  function handleUpload(files) {
    const newFiles = files.map((file) => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));

    setUploadedFiles([...uploadedFiles, ...newFiles]);

    newFiles.forEach(processUpload);
  }

  function updateFile(id, data) {
    setUploadedFiles((prevState) =>
      prevState.map((uploadedFile) =>
        id === uploadedFile.id ? { ...uploadedFile, ...data } : uploadedFile
      )
    );
  }

  function processUpload(uploadedFile) {
    const data = new FormData();

    data.append("file", uploadedFile.file, uploadedFile.name);

    // api
    //   .post("posts", data, {
    //     onUploadProgress: (e) => {
    //       const progress = parseInt(Math.round((e.loaded * 100) / e.total));

    //       updateFile(uploadedFile.id, {
    //         progress,
    //       });
    //     },
    //   })
    //   .then((response) => {
    //     updateFile(uploadedFile.id, {
    //       uploaded: true,
    //       id: response.data._id,
    //       url: response.data.url,
    //     });
    //   })
    //   .catch(() => {
    //     updateFile(uploadedFile.id, {
    //       error: true,
    //     });
    //   });
  }

  async function handleDelete(id) {
    //await api.delete(`posts/${id}`);

    setUploadedFiles((prevState) =>
      prevState.filter((file) => file.id !== id)
    );
  }

  useEffect(() => {
    return () => {
      uploadedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [uploadedFiles]);

  return (
    <>
    <Upload onUpload={handleUpload} />
    {!!uploadedFiles.length && (
      <FileList files={uploadedFiles} 
      //onDelete={handleDelete} 
      />
    )}   
    </>
  );
}

export default App;