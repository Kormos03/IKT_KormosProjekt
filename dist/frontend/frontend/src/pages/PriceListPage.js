"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceListPage = void 0;
const NavigationBar_1 = require("../Components/NavigationBar");
const PriceListComp_1 = require("../Components/PriceListComp");
function PriceListPage() {
    return (<>
            <NavigationBar_1.NavigationBar />
            <div className="container main-content">
                <div className="card shadow-lg">
                    <div className="card-header bg-primary text-white">
                        <h2 className="text-center">Árlista</h2>
                    </div>
                    <div className="card-body">
                        <PriceListComp_1.default />
                    </div>
                </div>
            </div>
        </>);
}
exports.PriceListPage = PriceListPage;
//# sourceMappingURL=PriceListPage.js.map