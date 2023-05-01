import React from "react";
// import { RiProductHuntLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./Home.scss";
// import heroImg from "../../assets/inv-img.png";
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLink";
import Card from "../../components/card/Card";

const Home = () => {
  return (
    <div className="home --flex-center">
       <Card>        
      <section className="container hero homeaction">
        <ul className="home-links">
          <ShowOnLogout>
            <li>
            <button className="--btn --btn-primary">
              <Link to="/register">Register</Link>
            </button>
            </li>
          </ShowOnLogout>
          <ShowOnLogout>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/login">Login</Link>
              </button>
            </li>
          </ShowOnLogout>
          <ShowOnLogin>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/dashboard">Dashboard</Link>
              </button>
            </li>
          </ShowOnLogin>
        </ul>
      </section>
       </Card>
    </div>
  );
};

// const NumberText = ({ num, text }) => {
//   return (
//     <div className="--mr">
//       <h3 className="--color-white">{num}</h3>
//       <p className="--color-white">{text}</p>
//     </div>
//   );
// };

export default Home;
