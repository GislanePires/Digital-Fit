import React from "react";
import "./style.scss";
import zzB2B from "../../assets/imgs/zzB2B.jpg";
import zzbiomob from "../../assets/imgs/zzbiomob.png";
import zzfest from "../../assets/imgs/zzfest.jpg";
import zzilab from "../../assets/imgs/zzilab.jpg";
import zzinfo4 from "../../assets/imgs/zzinfo4.jpeg";
import zzmway from "../../assets/imgs/zzmway.jpg";
import zzneki from "../../assets/imgs/zzneki.png";
import zzorange from "../../assets/imgs/zzorange.png";
import zzpetropolis from "../../assets/imgs/zzpetropolis.png";
import zzt2m from "../../assets/imgs/zzt2m.png";
import zzteresopolis from "../../assets/imgs/zzteresopolis.png";
import zzuff from "../../assets/imgs/zzuff.png";
import zzufrj from "../../assets/imgs/zzufrj.png";

const CarrosselInfinito = () => {
  return (
    <section className="bodyCarrosselInfinito">
      <div className="slider">
        <div className="slide-track">
          <div className="slideCarrossel">
            <img src={zzB2B} height="40" width="130" alt="" />
          </div>
          <div className="slideCarrossel">
            <img src={zzbiomob} height="40" width="130" alt="" />
          </div>
          <div className="slideCarrossel">
            <img src={zzfest} height="40" width="130" alt="" />
          </div>
          <div className="slideCarrossel">
            <img src={zzilab} height="40" width="130" alt="" />
          </div>
          <div className="slideCarrossel">
            <img src={zzinfo4} height="40" width="130" alt="" />
          </div>
          <div className="slideCarrossel">
            <img src={zzmway} height="40" width="130" alt="" />
          </div>
          <div className="slideCarrossel">
            <img src={zzneki} height="40" width="130" alt="" />
          </div>
          <div className="slideCarrossel">
            <img src={zzorange} height="40" width="130" alt="" />
          </div>
          <div className="slideCarrossel">
            <img src={zzpetropolis} height="40" width="130" alt="" />
          </div>
          <div className="slideCarrossel">
            <img src={zzt2m} height="40" width="130" alt="" />
          </div>
          <div className="slideCarrossel">
            <img src={zzteresopolis} height="40 " width="130 " alt="" />
          </div>
          <div className="slideCarrossel">
            <img src={zzuff} height="40 " width="130" alt="" />
          </div>
          <div className="slideCarrossel">
            <img src={zzufrj} height="40" width="130" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarrosselInfinito;
