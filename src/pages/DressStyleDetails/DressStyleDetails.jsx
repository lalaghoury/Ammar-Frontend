import React from "react";
import { useParams } from "react-router-dom";
import CardShortHand from "../../components/ShortHand/CardShortHand/CardShortHand";

const DressStyleDetails = () => {
  const { DressStyleName } = useParams();

  return (
    <div>
      <CardShortHand
        apiUrl={`${process.env.API_URL}/dress-styles/details/${DressStyleName}`}
        text={DressStyleName}
      />
    </div>
  );
};

export default DressStyleDetails;
