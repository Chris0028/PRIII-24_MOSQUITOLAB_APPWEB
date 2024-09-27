import { Route, Routes } from "react-router-dom";
import AuthContainer from "../modules/auth/components/authContainer";
import FileForm from "../modules/file/components/fileform";
import Layout from "../pages/layout/layout";

export default function Routing() {
    return (
        <Routes>
            {/* <Route index element={<AuthContainer />} /> */}
            <Route index element={<Layout />} />
            <Route path='/fileform' element={<Layout children={<FileForm/>} />} />
        </Routes>
    )
}