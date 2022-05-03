import React from "react";
import Footer from "./Footer";

function Home() {
 
  return (
    <div className="d-flex justify-content-between   flex-column text-white">
      <div className=" container marketing bg-dark pl-5 pr-5">
        <div
          id="carouselExampleCaptions"
          className="carousel slide mt-5"
          data-mdb-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-mdb-target="#carouselExampleCaptions"
              data-mdb-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            />
            <button
              type="button"
              data-mdb-target="#carouselExampleCaptions"
              data-mdb-slide-to="1"
              aria-label="Slide 2"
            />
            <button
              type="button"
              data-mdb-target="#carouselExampleCaptions"
              data-mdb-slide-to="2"
              aria-label="Slide 3"
            />
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://res.cloudinary.com/courseaspcore/image/upload/v1651574976/pexels-kam-pratt-5354464_twbbzu.jpg"

                className="d-block w-100 h-50"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>vw golf 7 gti</h5>
                <p>
                Volkswagen has unveiled the new Golf GTI at the Geneva Motor Show. The Volkswagen GTI is equipped with a 220 hp TSI turbocharged petrol engine. The Golf GTI will be available for the first time in a GTI Performance version, with maximum power increased to 230 hp. Both cars have an impressive torque of 350 Nm. The model is available in three color options: Black (black), Tornado Red (red) and Pure White (white).
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="https://res.cloudinary.com/courseaspcore/image/upload/v1651574976/pexels-nihat-ka%C5%9F%C4%B1k%C3%A7%C4%B1-6647720_ktitee.jpg"
                className="d-block w-100 h-50"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>vw beetle</h5>
                <p>
                passenger car produced by the German company Volkswagen from 1946 to 2003. It is the most massive car in history produced without revising the basic design. A total of 21,529,464 vehicles were manufactured. One of the best selling cars.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="https://res.cloudinary.com/courseaspcore/image/upload/v1651574977/pexels-oskar-hoke-7559337_i4zz7h.jpg"
                className="d-block w-100 h-50"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block">
              <h5>vw golf 7 r</h5>
                <p>
                Volkswagen Golf R (Volkswagen Golf R) - 3 or 5-door hatchback class "C" with permanent all-wheel drive. Sports version of the seventh generation of the Volkswagen Golf. The car premiered at the Los Angeles Auto Show in November 2016.
                </p>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-mdb-target="#carouselExampleCaptions"
            data-mdb-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-mdb-target="#carouselExampleCaptions"
            data-mdb-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <hr className="featurette-divider" />
        <div className="row">
          <div className="col-lg-4">
            <img
              src="https://res.cloudinary.com/courseaspcore/image/upload/v1651573870/pngegg_7_vykeuo.png"
              width={200}
              height={200}
            />

            <h2>Škoda Auto</h2>
            <p>
              Skoda a. s. is the largest car manufacturer in the Czech Republic,
              headquartered in Mladá Boleslav. In fact, it is the successor of
              the Laurin & Klement company, which was founded in 1895 and became
              part of the Akciová společnost, dříve Škodovy závody industrial
              conglomerate in 1925.
            </p>
          </div>
          <div className="col-lg-4">
            <img
              src="https://res.cloudinary.com/courseaspcore/image/upload/v1649621874/pngegg_6_guktxz.png"
              width={200}
              height={200}
            />

            <h2>SEAT</h2>
            <p>
              SEAT S.A. - Spanish automotive company; part of the Volkswagen
              Group. The headquarters is located in Barcelona, Spain.
            </p>
          </div>
          <div className="col-lg-4">
            <img
              src="https://res.cloudinary.com/courseaspcore/image/upload/v1649621875/pngegg_5_vr56pl.png"
              width={200}
              height={200}
            />

            <h2>Bugatti Automobiles</h2>
            <p>
              Bugatti Automobiles S.A.S. is a French automotive company
              specializing in the production of luxury cars under the Bugatti
              brand. The headquarters - the family estate of Chateau Saint-Jean
              - and production are located in the Alsatian city of Molsem
            </p>
          </div>
        </div>

        <hr className="featurette-divider" />

        <div className="row featurette">
          <div className="col-md-7">
            <h2 className="featurette-heading">Lamborghini</h2>
            <p className="lead">
              Automobili Lamborghini S.p.A. - Italian company, manufacturer of
              expensive sports cars under the Lamborghini brand. Located in the
              commune of Sant'Agata Bolognese, near Bologna. The company was
              founded in 1963 by Ferruccio Lamborghini, at that time he was
              already the founder of a large tractor manufacturing company.
            </p>
          </div>
          <div className="col-md-5">
            <img
              width={500}
              height={500}
              src="https://res.cloudinary.com/courseaspcore/image/upload/v1649453834/pngegg_xlh7gt.png"
            />
          </div>
        </div>

        <hr className="featurette-divider" />

        <div className="row featurette">
          <div className="col-md-7 order-md-2">
            <h2 className="featurette-heading">Porshe</h2>
            <p className="lead">
              Porsche AG is a German manufacturer of cars and sunglasses founded
              by designer Ferdinand Porsche in 1931. The headquarters and main
              plant are located in Stuttgart, Germany.
            </p>
          </div>
          <div className="col-md-5 order-md-1">
            <img
              width={500}
              height={500}
              src="https://res.cloudinary.com/courseaspcore/image/upload/v1651578790/pngegg_8_lkc3hv.png"
            />
          </div>
        </div>

        <hr className="featurette-divider" />

        <div className="row featurette">
          <div className="col-md-7">
            <h2 className="featurette-heading">Audi</h2>
            <p className="lead">
              Audi AG is a German automotive company within the Volkswagen
              Group, specializing in the production of cars under the Audi
              brand. The headquarters is located in the city of Ingolstadt. The
              motto is Vorsprung durch Technik. The volume of production in 2016
              amounted to about 1,903,259 vehicles.
            </p>
          </div>
          <div className="col-md-5">
            <img
              width={500}
              height={500}
              src="https://res.cloudinary.com/courseaspcore/image/upload/v1649453833/pngegg_1_h4xryw.png"
            />
          </div>
        </div>
        <hr className="featurette-divider" />
      </div>
      <Footer />
    </div>
  );
}
export default Home;
