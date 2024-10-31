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

export default function Routing() {

    const user = useSelector((state) => state.user.user);

    return (
        <Routes>
            <Route index element={<AuthContainer />} />

            <Route element={<PrivateRoute token={user} />}>
                <Route path="/samples" element={<Layout children={<SampleContainer />} />} />
                <Route path='/fileform' element={<Layout children={<FileForm />} />} />
                <Route path='/homefiledoctor' element={<Layout children={<HomeFileDoctor />} />} />
                <Route path='/homefilelabo' element={<Layout children={<HomeFileLabo />} />} />
                <Route path='/consolidatereport' element={<Layout children={<ConsolidateReport />} />} />
                <Route path='/fileformu/:fileID' element={<Layout children={< FileFormU />} />} />
            </Route>
        </Routes>
    )
}