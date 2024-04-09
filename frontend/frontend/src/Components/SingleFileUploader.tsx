import React, { useState } from "react";
import useAuth from "./useAuth";

const SingleFileUploader = () => {
    const { token, user,error, setToken, setUser, setError } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [imageNames, setImageNames] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    const response = await fetch("http://localhost:3000/images", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        });
        const data = await response.json();
        setImageNames(data);


        //This a function to get the correct name for the image, because the image name is a number and we need to increment it by one
        let thecorrectname = 0;
       imageNames.forEach(async (imageName: string) => {
            thecorrectname = parseInt(imageName.name);
            thecorrectname++;
          return thecorrectname;
        });

        console.log(thecorrectname);
        //This is the post request to upload the image into the database to the images table
        const responseforPost = await fetch("http://localhost:3000/images", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              filename: thecorrectname,
              url: "http://localhost:3000/images/" + thecorrectname + ".jpeg",
            }),
            });
            const dataforPost = await responseforPost.json();
            console.log(dataforPost);
            if (dataforPost.ok) {
                alert("Sikeres képfeltöltés");
              } else {
                alert("Sikertelen képfeltöltés");
              }
              
              if (file) {
                console.log("Uploading file...");
            
                const formData = new FormData();
                formData.append("file", file);
            
                try {
                  const result = await fetch("http://localhost:3000/images/fileupload", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: formData,
                  });
                  const data = await result.json();
            
                  console.log(data);
                } catch (error) {
                  console.error(error);
                }
              }
                const responsefordb = await fetch("http://localhost:3000/images", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      'Accept': 'application/json',
                      'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                      name: thecorrectname,
                      url: "http://localhost:3000/images/" + thecorrectname + ".jpeg",
                    }),
                    });
                    const datafordb = await responsefordb.json();
                    console.log("datafordb:", datafordb);

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
