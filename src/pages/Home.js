import LoginForm from "../components/LoginForm";
import CoursesIndex from '../pages/courses/Index';

const Home = ({ authenticated, onAuthenticated }) => {
  return (
    <>
      <h1>Hi, this is home</h1>
      {!authenticated ? (
        <LoginForm authenticated={authenticated} onAuthenticated={onAuthenticated} />
      ) : (
        <>
          <CoursesIndex />
          <p>You are authenticated</p>
        </>
      )}
    </>
  );
}

export default Home;
