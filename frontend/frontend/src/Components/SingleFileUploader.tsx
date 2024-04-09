import React, { useEffect, useState } from "react";
import useAuth from "./useAuth";

const SingleFileUploader = () => {
    const { token, user,error, setToken, setUser, setError } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [imageNames, setImageNames] = useState<string[]>([]);
    let thecorrectname = 0;

            //This a function to get the correct name for the image, because the image name is a number and we need to increment it by one
  function getCorrectName() {
   async function getImages() {
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
        console.log("data",data);
        await data.forEach(async (imageName: any) => {
            thecorrectname = parseInt(imageName.name);
            return thecorrectname;
        });

        thecorrectname = thecorrectname + 1;
        console.log('The correct name for the file:', thecorrectname);
    }
    getImages();
  }
 
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
               const file = e.target.files[0];
                setFile(file);
        }
};

  const handleUpload = async () => {
        getCorrectName();
        //This is the post request to upload the image into the database to the images table
        const responseforPost = await fetch("http://localhost:3000/images", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              filename: file?.name + ".jpeg",
              url: "http://localhost:3000/images/" + file?.name + ".jpeg",
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
                console.log("Kép feltöltése...");
            
                const formData = new FormData();
                formData.append(thecorrectname.toString() + '.jpeg', file);

                console.log("formData:", formData.get(file?.name));
                try {0
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
