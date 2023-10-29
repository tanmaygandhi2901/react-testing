import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import { Row } from "react-bootstrap";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants";
import { formatCurrency } from "../../utilities";
import { useOrderDetails } from "../../contexts/OrderDetails";

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [isError, setIsError] = useState(false);
  const { totals } = useOrderDetails();

  useEffect(() => {
    //creates a abort controller and attach it with network request.
    const controller = new AbortController();

    axios
      .get(`http://localhost:3030/${optionType}`, { signal: controller.signal })
      .then((response) => {
        setItems(response.data);
      })
      .catch((err) => {
        if (err.name !== "CanceledError") {
          setIsError(true);
        }
      });

    //unmounting func. to abort network request.
    return () => {
      controller.abort();
    };
  }, [optionType]);

  if (isError) {
    return <AlertBanner />;
  }

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();
  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} Total: {formatCurrency(totals[optionType])}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
};

export default Options;
