import React from "react";
import InputAdd from "../InputAdd/InputAdd";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomRadio = styled(Radio)({
  color: "#F6FF00",
  "&.Mui-checked": {
    color: "#F6FF00",
  },
});

const BlocoPergunta = ({ pergunta, name, resposta, setResposta, placeholder }) => {
  const handleChange = (e) => {
    setResposta(e.target.value);
  };

  return (
    <>
      <p>{pergunta}</p>
      <RadioGroup row name={name} value={resposta} onChange={handleChange} sx={{width: "100%"}}>
        <FormControlLabel
          value="sim"
          control={<CustomRadio />}
          label="Sim"
        />
        <FormControlLabel
          value="nao"
          control={<CustomRadio />}
          label="Não"
        />
      </RadioGroup>
      {resposta === "sim" && <InputAdd placeholder={placeholder} />}
    </>
  );
};

export default BlocoPergunta;
