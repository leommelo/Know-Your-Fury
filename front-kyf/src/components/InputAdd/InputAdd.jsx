import React, { useState } from "react";
import './InputAdd.css'
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

const InputAdd = () => {
    const [inputs, setInputs] = React.useState([
        { id: 1, value: '' },
    ])

    const handleChange = (id, newValue) => {
        setInputs((prevInputs) =>
            prevInputs.map((input) =>
                input.id === id ? { ...input, value: newValue } : input
            )
        );
    };

    const addInput = () => {
        setInputs((prevInputs) => [
            ...prevInputs,
            { id: prevInputs.length + 1, value: '' },
        ]);
    }

    return (
        <div >
            {inputs.map((input) => (
                <div key={input.id} className="input-add">
                    <input
                        type="text"
                        placeholder="Ex: Final CBLOL 2025/2"
                        value={input.value}
                        onChange={(e) => handleChange(input.id, e.target.value)}
                    />
                    {input.id === inputs.length &&
                    <IconButton size="large" onClick={addInput}>
                        <AddIcon fontSize="inherit" sx={{color: "white"}}/>
                    </IconButton>
                    }
                </div>
            ))}
        </div>
    )
}

export default InputAdd