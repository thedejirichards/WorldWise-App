import { NavLink } from "react-router-dom";
import PageNav from "../components/PageNav";

function HomePage() {
  return (
    <div>
      <PageNav />
      <h1>Worldwise</h1>
      <NavLink to="app">Go to the App</NavLink>
    </div>
  );
}

export default HomePage;
