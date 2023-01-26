import "./FeatureBox.scss";
import React from "react";

// Render the FeatureBox component
const FeatureBox = (props) => {
  return (
    <section className="FeatureBoxStyle">
      <img src={props.imgUrl} alt={props.Heading} />
      <div className="BoxContentStyle">
        <p>
          <strong>{props.Heading} </strong>
        </p>
        <p>{props.SubHeading}</p>
      </div>
    </section>
  );
};

export default FeatureBox;
