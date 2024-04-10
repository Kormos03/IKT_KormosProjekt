import React, { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const SingleFileUploader = () => {
    const { token, user,error, setToken, setUser, setError } = useAuth();
    const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
    let thecorrectname = 0;

            //This a function to get the correct name for the image, because the image name is a number and we need to increment it by one
 
 
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
               const fileforsend = e.target.files[0];
                setFile(fileforsend);
        }
};

  const handleUpload = async () => {
    
        //This is the a post request for the backend to upload the image to the database and the server
        
                //const formData = new FormData();
                //formData.append(thecorrectname.toString() + '.jpeg', file);

                //console.log("formData:", formData.get(file?.name));
                if (file) {

                try {
                    const formData = new FormData();
                    formData.append('file', file);
                    console.log('formdata:',formData.get(file.name));
                  const result = await fetch("http://localhost:3000/images/fileupload", {
                    method: "POST",
                    headers: {
                        'Accept': '*/*',
                        'Authorization': `Bearer ${token}`,
                        //'content-type': 'multipart/form-data',
                    },
                    body: formData,
                  });
                    if (result.ok) {
                        console.log("Upload successful");
                        navigate(0);
                        setFile(null);
                    } else {
                        console.error("Upload failed");
                    }
                } catch (error) {
                  console.error(error);
                }
              }
                else
                {throw new Error('No file selected')}

  };

  return (
    <>
      <div>
        <label htmlFor="file" className="sr-only">
          Válasszon képet
        </label>
        <input id="file" type="file" onChange={handleFileChange} />
      </div>
      {file && (
        <section>
          Fájl adatok:
          <ul>
            <li>Név: {file.name}</li>
            <li>Típus: {file.type}</li>
            <li>Méret: {file.size} bytes</li>
          </ul>
        </section>
      )}

      {file && <button onClick={handleUpload}>Kép feltöltése</button>}
    </>
  );
};

export default SingleFileUploader;
