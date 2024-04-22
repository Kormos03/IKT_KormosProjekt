import { UserProfile } from "../Components/UserProfile";
import { AdminNavigationBar } from "../Components/AdminComponents/AdminNavigationBar";
import useAuthAdmin from "../Components/AdminComponents/useAuthAdmin";

export function AdminProfilePage(){
  const { user, error} = useAuthAdmin();

    return (
        <>
        <AdminNavigationBar />
        <div className="container  main-content">
            {
      user? <UserProfile/> : null
            }
            <p>{error}</p>


            </div>
        </>
    );
}