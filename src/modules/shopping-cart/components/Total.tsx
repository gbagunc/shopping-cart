import { Box, Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { PRODUCTS_MAP, ShoppingCartItem } from "../models";

const TotalWrapper = styled(Box)(() => ({
    paddingTop: 40,
}));

type TotalProps = {
    clearItems(): void;
    items: ShoppingCartItem[];
};

const Total: React.FC<TotalProps> = ({ items, clearItems }) => {
    const totalSum = items
        .map((item) => {
            const product = PRODUCTS_MAP[item.productId];
            const price = product?.price || 0;

            return price * item.quantity;
        })
        .reduce((a: number, b: number) => {
            return a + b;
        }, 0);

    return (
        <TotalWrapper>
            <Grid container>
                <Grid item xs={6}>
                    <Typography>{`Total: ${totalSum}`}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="outlined" onClick={clearItems}>
                        Clear
                    </Button>
                </Grid>
            </Grid>
        </TotalWrapper>
    );
};

export default Total;
