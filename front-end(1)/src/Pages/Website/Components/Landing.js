import React, { useState } from "react";
import { Carousel, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./../HomePage.css";

export default function Landing() {
  const backgrounds = [
    require("./../images/Designer (2).jpeg"),
    require("./../images/Designer (4).jpeg"),
    require("./../images/Designer (5).jpeg"),
  ];

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <section className="main-banner">
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        interval={3000}
        pause={false}
        fade
      >
        {backgrounds.map((bg, idx) => (
          <Carousel.Item key={idx}>
            <img src={bg} className="d-block w-100" alt={`Slide ${idx + 1}`} />
            <Carousel.Caption>
              <h5>Title for Slide {idx + 1}</h5>
              <p>Some text describing the slide content.</p>
              <Button variant="outline-light" size="lg" as={Link} to="/categories">
                Shop Now
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* أزرار التبديل اليدوية */}
      <div className="button-group">
        <Button
          onClick={() =>
            setIndex(index === 0 ? backgrounds.length - 1 : index - 1)
          }
        >
          Previous
        </Button>
        <Button
          onClick={() =>
            setIndex(index === backgrounds.length - 1 ? 0 : index + 1)
          }
        >
          Next
        </Button>
      </div>
    </section>
  );
}
