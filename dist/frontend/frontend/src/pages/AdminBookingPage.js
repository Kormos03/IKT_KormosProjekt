"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminBookingPage = void 0;
const AdminNavigationBar_1 = require("../Components/AdminComponents/AdminNavigationBar");
const AdminBookingInsert_1 = require("../Components/AdminComponents/AdminBookingInsert");
const AdminBookingNotReserved_1 = require("../Components/AdminComponents/AdminBookingNotReserved");
const AdminBookingReserved_1 = require("../Components/AdminComponents/AdminBookingReserved");
const useAuthAdmin_1 = require("../Components/AdminComponents/useAuthAdmin");
function AdminBookingPage() {
    (0, useAuthAdmin_1.default)();
    return (<>
            <AdminNavigationBar_1.AdminNavigationBar />
            <div className="container main-content">
                <div className="row">
                    <div className="col">
                        <AdminBookingNotReserved_1.AdminBookingNotReserved />
                    </div>
                    <div className="col">
                        <AdminBookingInsert_1.AdminBookingInsert />
                    </div>
                    <div className="col">
                        <AdminBookingReserved_1.AdminBookingReserved />
                    </div>
                </div>
            </div>
        </>);
}
exports.AdminBookingPage = AdminBookingPage;
//# sourceMappingURL=AdminBookingPage.js.map