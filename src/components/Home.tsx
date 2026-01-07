import logo from "../assets/Logo.png";
import Dashboard from "./Dashboard";
const Home = () => {
  return (
    <main className="mt-4 ">
      <header>
        <img className="w-60" src={logo} alt="Logo" />
        <div className="w-full bg-gray-300 h-0.5"/>
      </header>
      <Dashboard/>
    </main>
  );
};

export default Home;
