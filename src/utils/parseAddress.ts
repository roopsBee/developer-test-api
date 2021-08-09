const parseAddress = (address: string): { address1: string; address2: string } => {
  const addressArr = address.split(" ");

  if (addressArr[0].toLowerCase() === "flat") {
    const address1 = addressArr.slice(0, 2).join(" ");
    const address2 = addressArr.slice(2).join(" ");
    return { address1, address2 };
  } else {
    return { address1: address, address2: "" };
  }
};

export default parseAddress;
