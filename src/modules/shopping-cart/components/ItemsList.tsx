import { Box, Button, ButtonGroup, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { PRODUCTS_MAP, ShoppingCartItem } from "../models";

const ItemsListWrapper = styled(Box)(() => ({
    paddingTop: 20,
}));

type ItemsListProps = {
    incrementItem(product: ShoppingCartItem): void;
    decrementItem(product: ShoppingCartItem): void;
    deleteItem(product: ShoppingCartItem): void;
    items: ShoppingCartItem[];
};

const ItemsList: React.FC<ItemsListProps> = ({
    items,
    incrementItem,
    decrementItem,
    deleteItem,
}) => {
    return (
        <ItemsListWrapper>
            {items.map((item) => {
                const product = PRODUCTS_MAP[item.productId];
                const price = product?.price || 0;

                return (
                    <Grid container key={item.productId}>
                        <Grid item xs={12}>
                            <Typography>{product?.label}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>{`${item.quantity} x $${price} = $${
                                item.quantity * price
                            }`}</Typography>
                        </Grid>
                        <ButtonGroup
                            variant="outlined"
                            aria-label="outlined button group"
                        >
                            <Button onClick={() => incrementItem(item)}>
                                +
                            </Button>
                            <Button onClick={() => decrementItem(item)}>
                                -
                            </Button>
                            <Button onClick={() => deleteItem(item)}>x</Button>
                        </ButtonGroup>
                    </Grid>
                );
            })}
        </ItemsListWrapper>
    );
};

export default ItemsList;
