import { Route, Routes } from "react-router-dom";
import AuthContainer from "../modules/auth/components/authContainer";
import FileForm from "../modules/file/components/fileform";
import Layout from "../pages/layout/layout";
import SampleContainer from "../modules/sample/components/sampleContainer";

export default function Routing() {
    return (
        <Routes>
            {/* <Route index element={<AuthContainer />} /> */}
            <Route index element={<Layout children={<SampleContainer />} />} />
        </Routes>
    )
}