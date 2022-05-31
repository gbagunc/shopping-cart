import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

import { ShoppingCartItem } from "../models";

import AddItemForm from "./AddItemForm";
import ItemsList from "./ItemsList";
import Total from "./Total";

const ShoppingCardWrapper = styled(Paper)(() => ({
    width: 600,
    margin: "auto",
    padding: 50,
    minHeight: 500,
}));

const ShoppingCartHeader = styled(Typography)(() => ({
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 24,
}));

const ShoppingCart = () => {
    const [items, setItems] = useState<ShoppingCartItem[]>([]);

    const addItem = (product: ShoppingCartItem) => {
        const itemsData = items.find(
            (data) => product.productId === data.productId
        );

        if (itemsData) {
            const newItems = items?.map((item) =>
                item.productId === itemsData.productId
                    ? { ...item, quantity: item.quantity + product.quantity }
                    : item
            );
            setItems(newItems);
        } else {
            setItems([...items, product]);
        }
    };

    const incrementItem = (product: ShoppingCartItem) => {
        const newData = items.map((item) =>
            item.productId === product.productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );

        setItems(newData);
    };

    const decrementItem = (product: ShoppingCartItem) => {
        const newData = items.map((item) =>
            item.productId === product.productId && item.quantity > 0
                ? { ...item, quantity: item.quantity - 1 }
                : item
        );
        setItems(newData);
    };

    const deleteItem = (product: ShoppingCartItem) => {
        const itemsData = items.filter(
            (item) => item.productId !== product.productId
        );
        setItems(itemsData);
    };

    const clearItems = () => {
        setItems([])
    }

    return (
        <ShoppingCardWrapper>
            <ShoppingCartHeader>Shopping Cart</ShoppingCartHeader>
            <AddItemForm addItem={addItem} />
            {!!items?.length && (
                <>
                    <ItemsList
                        items={items}
                        incrementItem={incrementItem}
                        decrementItem={decrementItem}
                        deleteItem={deleteItem}
                    />
                    <Total items={items} clearItems={clearItems}/>
                </>
            )}
        </ShoppingCardWrapper>
    );
};

export default ShoppingCart;
