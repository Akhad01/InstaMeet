import React from "react";

const Qualitie = ({ name, color }) => {
    return <span className={`badge bg-${color} m-1`}>{name}</span>;
};

export default Qualitie;
