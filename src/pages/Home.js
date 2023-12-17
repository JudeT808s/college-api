import React from "react";
import LoginForm from "../components/LoginForm";
import CoursesIndex from "../pages/courses/Index";

const Home = ({ authenticated, onAuthenticated }) => {
  return (
    <>
      {/* <h1>Hi, this is home</h1> */}
      {!authenticated ? (
        <LoginForm
          authenticated={authenticated}
          onAuthenticated={onAuthenticated}
        />
      ) : (
        <div className="container mx-auto ">
          <div className="card w-auto bg-white-500 opacity-100 image-full  items-center justify-center text-center">
            <figure>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Classroom"
              />
            </figure>
            <div className="card-body flex flex-col items-center justify-center text-center">
              <h2 className="card-title">Find a course suited for you today</h2>
              <div className="card-actions justify-center">
                <button className="btn btn-primary">View Courses</button>
              </div>
            </div>
          </div>
          <CoursesIndex />
          <p>You are authenticated</p>
        </div>
      )}
    </>
  );
};

export default Home;
