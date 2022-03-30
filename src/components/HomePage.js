
import "./css/HomePage.css";

const HomePage = ({user}) => {
  return (

    <main>
        <h1>Welcome to Fitness Track.kr {user?.username}!</h1>
    </main>
    
  );
};

export default HomePage;
