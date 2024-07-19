"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardComponent = void 0;
const react_1 = require("react");
const HandleDarkMode_1 = require("./HandleDarkMode");
function CardComponent({ cards: cards }) {
    const [isDarkMode] = (0, HandleDarkMode_1.useDarkMode)();
    (0, react_1.useEffect)(() => {
        isDarkMode;
        console.log(isDarkMode);
    }, []);
    return <> 
      <div className="container">
        <div className="row">
          {cards.map((card, index) => (<div className="col-md-4" key={index}>
              <div className={`card cardforgallery`}>
                  <img src={card.url} alt={card.url} className="gallery_img"/> <br />
          
              </div>
            </div>))}
        </div>
      </div>
      </>;
}
exports.CardComponent = CardComponent;
//# sourceMappingURL=CardComponent.js.map