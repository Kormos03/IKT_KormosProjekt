import { useDarkMode } from "./HandleDarkMode";

//El kell különíteni kategóriákra a képeket -> Majd a kategóriákra kattintva megjeleníteni a képeket, de ezt már csak a vizsga után fogom megcsinálni
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