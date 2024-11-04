import { Route, Routes } from "react-router-dom";
import AuthContainer from "../modules/auth/components/authContainer";
import Layout from "../pages/layout/layout";
import SampleContainer from "../modules/sample/components/sampleContainer";
import FileForm from "../modules/file/components/fileForm";
import HomeFileDoctor from "../modules/file/components/homeFileDoctor";
import HomeFileLabo from "../modules/file/components/homeFileLabo";
import ConsolidateReport from "../modules/report/components/consolidatedReport";
import { useSelector } from "react-redux";
import PrivateRoute from "./privateRoute";
import FileFormU from "../modules/file/get-update/fileFormU";
import PieGraph from "../modules/report/graphs/components/genderGraph";
import { UserContainer } from "../modules/user/components/userContainer";
import Profile from "../modules/user/components/profile";
import AuthForm from "../modules/auth/components/authForm";
import ChangePasswordForm from "../modules/auth/components/changePasswordForm";


export default function Routing() {

    const user = useSelector((state) => state.user.user);

    return (
        <Routes>
            <Route index element={<AuthContainer children={<AuthForm />} />} />
            <Route path="/changepassword/:username" element={<AuthContainer children={<ChangePasswordForm />} />} />

            <Route element={<PrivateRoute token={user} />}>
                <Route path='/samples' element={<Layout children={<SampleContainer />} />} />
                <Route path='/fileform' element={<Layout children={<FileForm />} />} />
                <Route path='/homefiledoctor' element={<Layout children={<HomeFileDoctor />} />} />
                <Route path='/homefilelabo' element={<Layout children={<HomeFileLabo />} />} />
                <Route path='/consolidatereport' element={<Layout children={<ConsolidateReport />} />} />
                <Route path='/pieGraph' element={<Layout children={<PieGraph />} />} />
                <Route path='/fileformu/:fileID' element={<Layout children={< FileFormU />} />} />
                <Route path='/users' element={<Layout children={<UserContainer />} />} />
                <Route path='/profile' element={<Layout children={<Profile />} />} />
            </Route>
        </Routes>
    )
}