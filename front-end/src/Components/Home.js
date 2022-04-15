import React from "react";
import Footer from "./Footer";
function Home() {
  return (
    <div className="d-flex justify-content-between  flex-column bg-dark text-white ">
      <div className=" container marketing ">
        <div className="row">
          <div className="col-lg-4">
            <img
              src="https://res.cloudinary.com/courseaspcore/image/upload/v1649621875/pngegg_4_meireb.png"
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
              src="https://res.cloudinary.com/courseaspcore/image/upload/v1649454002/pngegg_2_qpef96.png"
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
