import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import AddBook from "./pages/AddBook";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import "./assets/sass/from.scss";
import "./assets/sass/main.scss";
import BookDetail from "./pages/BookDetail";
import ListBook from "./pages/ListBook";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/about" element={<AboutUs></AboutUs>}></Route>
          <Route
            path="/bookdetails"
            element={<BookDetail></BookDetail>}
          ></Route>
          {/* dashboard */}
          <Route path="/dashboard">
            <Route index element={<Dashboard></Dashboard>}></Route>
            <Route path="addBook" element={<AddBook></AddBook>}></Route>
            <Route path="listBook" element={<ListBook></ListBook>}></Route>
          </Route>
          <Route path="*" element={<>Page not found</>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
