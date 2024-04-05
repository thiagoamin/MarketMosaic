import React from 'react';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './layout/Navbar';
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AddStock from './stocks/AddStock';
import EditStock from './stocks/EditStock';
import ViewStock from './stocks/ViewStock';
import AddSector from "./stocks/AddSector";
import EditSector from "./stocks/EditSector";
import ViewSector from "./stocks/ViewSector";
import ViewAllSectors from "./pages/ViewAllSectors";
import FilterStocks from "./pages/FilterStocks";
import JoinStocks from './pages/JoinStocks';
import ViewAllCompanies from './pages/ViewAllCompanies';
import EditCompany from './stocks/EditCompany';
import ViewCompany from './stocks/ViewCompany';
import AddCompany from './stocks/AddCompany';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/viewallsectors" element={<ViewAllSectors />} />
          <Route exact path="/addstock" element={<AddStock />} />
          <Route exact path="editstock/:isin" element={<EditStock/>} />
          <Route exact path="viewstock/:isin" element={<ViewStock/>} />
          <Route exact path="/addsector" element={<AddSector />} />

          <Route exact path="editsector/:id" element={<EditSector/>} />
          <Route exact path="viewsector/:id" element={<ViewSector/>} />
          
          <Route exact path="/filterstocks" element={<FilterStocks/>} />
          <Route exact path="/companystocks" element = {<JoinStocks/>}/>

          <Route exact path="/viewallcompanies" element = {<ViewAllCompanies/>}/>
          <Route exact path="/addcompany" element = {<AddCompany/>}/>
          <Route exact path="/editcompany/:id" element = {<EditCompany/>}/>
          <Route exact path="/viewcompany/:id" element = {<ViewCompany/>}/>
          
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
