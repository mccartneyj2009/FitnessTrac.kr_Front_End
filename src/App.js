import { Route, Routes } from "react-router-dom";
import Activities from "./components/Activities"

const App = () => {
    return <>

        <Routes>

            <Route path='activities' element = {<Activities/>}/>

        </Routes>
    
    </>;
};

export default App;
