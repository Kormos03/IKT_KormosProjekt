import { useEffect } from "react";
import { useDarkMode } from "./HandleDarkMode";

export function CardComponent({cards: cards}: {cards: {url: string}[]}) {
  const [isDarkMode] = useDarkMode();

  useEffect(() => {
    isDarkMode;
    console.log(isDarkMode);
  }, []);

    return <> 
      <div className="container">
        <div className="row">
          {cards!.map((card, index) => (
            <div className="col-md-4" key={index}>
              <div className={`card cardforgallery`} >
                  <img src={card.url} alt={card.url} className="gallery_img"/> <br />
          
              </div>
            </div>
          ))}
        </div>
      </div>
      </>
  }