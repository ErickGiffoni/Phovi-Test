import React from "react";

import { DefaultButton, IconButton } from "./styles";

function Button({ type, ...rest }) {
  if (type === "icon") {
    return <DefaultButton {...rest} />;
  }
  if (type === "delete") {
    return <IconButton {...rest} />;
  }

  return <DefaultButton {...rest} />;
}

export default Button;
