import React from "react";
import "../anunturi/anunturi.css";

import { Carousel } from "antd";


function Anunturi() {
  return (
    <div className="page__wrapper">
      <Carousel autoplay>
        <div>
          <h3 className="slider">
            <div className="image unu"></div>
          </h3>
        </div>
        <div>
          <h3 className="slider">
            <div className="image doi"></div>
          </h3>
        </div>
        <div>
          <h3 className="slider">
            <div className="image trei"></div>
          </h3>
        </div>
        <div>
          <h3 className="slider">
            <div className="image patru"></div>
          </h3>
        </div>
      </Carousel>
    </div>
  );
}

export default Anunturi;
