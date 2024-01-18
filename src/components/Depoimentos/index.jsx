import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import PropTypes from "prop-types";
import "./style.css";

const Depoimentos = ({ testimonials }) => {
  return (

    
    <section className="testimonial text-center">
      <div className="containerDepo">
     
        <Carousel>
          {testimonials.map((testimonial, index) => (
            <Carousel.Item key={index}>
              <div className="testimonial4_slide">
                <img
                  src={testimonial.image}
                  className="img-circle img-responsive"
                  alt={`Client ${index + 1}`}
                />
                <p className="pDepo">{testimonial.text}</p>
                <h4 className="h4Depo">{testimonial.client}</h4>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

Depoimentos.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      client: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Depoimentos;
