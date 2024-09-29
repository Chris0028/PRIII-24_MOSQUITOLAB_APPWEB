import { Route, Routes } from "react-router-dom";
import AuthContainer from "../modules/auth/components/authContainer";
import Layout from "../pages/layout/layout";
import FileForm from "../modules/file/components/fileForm";
import HomeFileDoctor from "../modules/file/components/homeFileDoctor";
import HomeFileLabo from "../modules/file/components/homeFileLabo";

export default function Routing() {
    return (
        <Routes>
            {/* <Route index element={<AuthContainer />} /> */}
            <Route index element={<Layout />} />
            <Route path='/fileform' element={<Layout children={<FileForm/>} />} />
            <Route path='/homefiledoctor' element={<Layout children={<HomeFileDoctor/>} />} />
            <Route path='/homefilelabo' element={<Layout children={<HomeFileLabo/>} />} />
        </Routes>
    )
}