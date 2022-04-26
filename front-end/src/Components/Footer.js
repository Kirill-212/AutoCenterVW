import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="bg-dark text-center text-white" role="contentinfo">
      <div className="container p-4 pb-0">
        <section className="mb-4">
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://www.vw.com/en.html"
            role="button"
          >
            <i className="fab fa-facebook-f" />
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://www.vw.com/en.html"
            role="button"
          >
            <i className="fab fa-twitter" />
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://www.vw.com/en.html"
            role="button"
          >
            <i className="fab fa-google" />
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://www.vw.com/en.html"
            role="button"
          >
            <i className="fab fa-instagram" />
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://www.vw.com/en.html"
            role="button"
          >
            <i className="fab fa-linkedin-in" />
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://www.vw.com/en.html"
            role="button"
          >
            <i className="fab fa-github" />
          </a>
          <Link
            className="text-reset btn-floating m-1"
            to="/home"
            role="button"
          >
            <i className="fa-solid fa-house" />
          </Link>
        </section>
      </div>

      <div className="text-center p-3" id="footer">
        <a className="text-white" href="https://www.vw.com/en.html">
          Call center + 375 (29) 769-95-06
        </a>
        <p className="float-end text-reset">
          <a className=" text-reset" href="#">
            Back to top
          </a>
        </p>
      </div>
    </footer>
  );
}
export default Footer;
