import { Box, Button, FormControl, MenuItem, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";

import { ALL_PRODUCTS, ShoppingCartItem } from "../models";

const AddItemBox = styled(Box)(() => ({
    display: "flex",
    flex: 1,
    marginTop: "25px",
}));

const ItemSelectWrapper = styled(FormControl)(() => ({
    width: "200px",
    marginRight: "20px",
}));

const QuantityInputWrapper = styled(FormControl)(() => ({
    width: "80px",
    marginRight: "20px",
}));

type AddItemFormProps = {
    addItem(product: ShoppingCartItem): void;
};

const AddItemForm: React.FC<AddItemFormProps> = ({ addItem }) => {
    const [productId, setProductId] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(0);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductId(event?.target.value);
    };

    const handleQuantity = (event: any) => {
        if (event?.target.value < 0) {
            setQuantity(0);
        } else {
            setQuantity(event?.target.value);
        }
    };

    return (
        <AddItemBox>
            <ItemSelectWrapper>
                <TextField
                    select
                    value={productId}
                    label="Product"
                    onChange={handleChange}
                >
                    {ALL_PRODUCTS.map((product) => (
                        <MenuItem key={product.id} value={product.id}>
                            {product.label}
                        </MenuItem>
                    ))}
                </TextField>
            </ItemSelectWrapper>
            <QuantityInputWrapper>
                <TextField
                    label="Quantity"
                    type="number"
                    value={quantity}
                    onChange={handleQuantity}
                />
            </QuantityInputWrapper>
            <Button
                variant="contained"
                disabled={!quantity || !productId}
                onClick={() =>
                    addItem({ productId: productId, quantity: +quantity })
                }
            >
                Add
            </Button>
        </AddItemBox>
    );
};

export default AddItemForm;
