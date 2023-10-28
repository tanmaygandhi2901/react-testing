import React from "react";
import Options from "./Options";

export default OrderEntry = () => {
    return (
        <div>
            <Options optionType="scoops" />
            <Options optionType="toppings" />
        </div>
    )
}