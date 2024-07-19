"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminProfilePage = void 0;
const UserProfile_1 = require("../Components/UserProfile");
const AdminNavigationBar_1 = require("../Components/AdminComponents/AdminNavigationBar");
const useAuthAdmin_1 = require("../Components/AdminComponents/useAuthAdmin");
function AdminProfilePage() {
    const { user, error } = (0, useAuthAdmin_1.default)();
    return (<>
        <AdminNavigationBar_1.AdminNavigationBar />
        <div className="container  main-content">
            {user ? <UserProfile_1.UserProfile /> : null}
            <p>{error}</p>


            </div>
        </>);
}
exports.AdminProfilePage = AdminProfilePage;
//# sourceMappingURL=AdminProfilePage.js.map