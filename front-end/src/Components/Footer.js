import React from "react";
import "./Footer.css";
function Footer() {
  return (
    <footer class="bg-dark text-center text-white" role="contentinfo">
      <div class="container p-4 pb-0">
        <section class="mb-4">
          <a
            class="btn btn-outline-light btn-floating m-1"
            href="https://www.vw.com/en.html"
            role="button"
          >
            <i class="fab fa-facebook-f" />
          </a>

          <a
            class="btn btn-outline-light btn-floating m-1"
            href="https://www.vw.com/en.html"
            role="button"
          >
            <i class="fab fa-twitter" />
          </a>

          <a
            class="btn btn-outline-light btn-floating m-1"
            href="https://www.vw.com/en.html"
            role="button"
          >
            <i class="fab fa-google" />
          </a>

          <a
            class="btn btn-outline-light btn-floating m-1"
            href="https://www.vw.com/en.html"
            role="button"
          >
            <i class="fab fa-instagram" />
          </a>

          <a
            class="btn btn-outline-light btn-floating m-1"
            href="https://www.vw.com/en.html"
            role="button"
          >
            <i class="fab fa-linkedin-in" />
          </a>

          <a
            class="btn btn-outline-light btn-floating m-1"
            href="https://www.vw.com/en.html"
            role="button"
          >
            <i class="fab fa-github" />
          </a>
          <a class="text-reset btn-floating m-1" href="/home" role="button">
            <i class="fa-solid fa-house" />
          </a>
        </section>
      </div>

      <div class="text-center p-3" id="footer">
        © 2022 Copyright:
        <a class="text-white" href="https://www.vw.com/en.html">
          www.vw.com
        </a>
        <p class="float-end text-reset">
          <a className=" text-reset" href="#">
            Back to top
          </a>
        </p>
      </div>
    </footer>
  );
}
export default Footer;
