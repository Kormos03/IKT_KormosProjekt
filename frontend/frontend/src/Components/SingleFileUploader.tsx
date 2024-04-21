import React, { useState } from "react";
import useAuth from "./useAuth";

const API_URL = 'http://localhost:3000/images/fileupload';

const SingleFileUploader = () => {
    const { token } = useAuth();
    const [file, setFile] = useState<File | null>(null); 

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const fileforsend = e.target.files[0];
            setFile(fileforsend);
        }
    };

    const handleUpload = async () => {
        if (file) {
            try {
                const formData = new FormData();
                formData.append('file', file);
                console.log('formdata:',formData.get(file.name));
                const result = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        'Accept': '*/*',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: formData,
                });
                if(!result.ok){
                    alert('SiKERTELEN FELTÖLTÉS');
                }
            } catch (error) {
                throw new Error('Hiba történt a kép feltöltése során');
            }
        }
    };

  return (
    <>
          <div>
    <h2>
        Kép feltöltése
    </h2>

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
