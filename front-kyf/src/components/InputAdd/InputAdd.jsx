import React, { useState } from "react";
import './InputAdd.css'
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const InputAdd = ({placeholder}) => {
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

    const removeInput = (id) => {
        setInputs((prevInputs) => prevInputs.filter((input) => input.id !== id));
    }

    return (
        <div >
            {inputs.map((input, index) => (
                <div key={input.id} className="input-add">
                    <input
                        type="text"
                        placeholder={placeholder}
                        value={input.value}
                        onChange={(e) => handleChange(input.id, e.target.value)}
                    />
                    {inputs.length > 1 && 
                    <IconButton size="large" onClick={() => removeInput(input.id)}>
                        <DeleteIcon fontSize="inherit" sx={{ color: "white" }} />
                    </IconButton>
                    }
                    {index === inputs.length - 1 && 
                        <IconButton size="large" onClick={addInput}>
                            <AddIcon fontSize="inherit" sx={{ color: "white" }} />
                        </IconButton>
                    }
                </div>
            ))}
        </div>
    )
}

export default InputAdd