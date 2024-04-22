import { useDarkMode } from "./HandleDarkMode";

export function CardComponent({cards: cards}: {cards: {url: string}[]}) {
  const [isDarkMode] = useDarkMode();

    return <> 
      <div className="container">
        <div className="row">
          {cards!.map((card, index) => (
            <div className="col-md-4" key={index}>
              <div className={`card ${isDarkMode ? 'bg-dark ' : ''} cardforgallery `}>
                  <img src={card.url} alt="" className="gallery_img"/> <br />
          
              </div>
            </div>
          ))}
        </div>
      </div>
      </>
  }