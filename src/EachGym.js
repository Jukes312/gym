import React from "react";
import { useContext, useState } from "react";
import DataContext from "./context/DataContext";

const EachGym = ({ name, placeId, rating, address }) => {
  const { myRef, origin, setDirectionRespose } = useContext(DataContext);
  const [distance, setDistance] = useState();
  const [time, setTime] = useState();

  const handleRefarray = (el) => {
    if (el && !myRef.current.includes(el)) {
      myRef.current.push(el);
    }
  };

  const handleDirection = async (address) => {
    setDirectionRespose(null);
    const directionServices = new window.google.maps.DirectionsService();
    const resultss = await directionServices.route({
      origin: origin,
      destination: address,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });
    setDirectionRespose(resultss);
    setDistance(resultss.routes[0].legs[0].distance.text);
    setTime(resultss.routes[0].legs[0].duration.text);
  };
  return (
    <section
      key={placeId}
      className="gym-list__content"
      ref={handleRefarray}
      id={placeId}
    >
      <h1 className="gym-list__heading ">NAME:</h1>
      <p className="gym-list__name">{name}</p>
      <h1 className="gym-list__heading">RATING:</h1>
      <p className="gym-list__rating">{rating || "Not rated"}</p>
      <div className="direction">
        <button className="btn" onClick={() => handleDirection(address)}>
          Direction
        </button>
        <p className="direction__distance">{distance}</p>
        <p className="direction__time">{time}</p>
      </div>
    </section>
  );
};

export default EachGym;
