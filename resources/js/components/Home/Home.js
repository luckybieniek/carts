import React, { useState, useContext } from "react";
import Menu from "../Menu/Menu";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

// import UserContext from "../Shared/Context/UserContext";

import "./Home.css";

const Home = () => {
    const [selectedMain, setSelectedMain] = useState("showWelcome");

    const linkSetShowMain = (link) => setSelectedMain(link);

    // const loggedUser = useContext(UserContext);

    return (
        <div className="home">
            <Header />
            <div className="home_main">
                <Menu setSelectedMain={setSelectedMain} />
                <Main
                    showMain={selectedMain}
                    linkSetShowMain={linkSetShowMain}
                />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
