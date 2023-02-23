import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  width: "200px",
  height: "400px",
  boxShadow: "0 2px 4px 0 rgba(0,0,0,0.2)",
  borderRadius: "5px",
  overflow: "hidden",
});

const StyledCardMedia = styled(CardMedia)({
  width: "100%",
  height: "60%",
  objectFit: "cover",
});

const ProductCard = ({ product }) => {
  //   const { name, description, imageUrl, price } = product;

  const name = "God Of War";
  const imageUrl = "https://cdn.ome.lt/fj5ZuT3HW9yNQnrGvROj4njWSNo=/200x0/smart/extras/capas/god-of-war-ragnarok-cover.jpg";
  const price = 59.99;
  const discount = 10;
  const isOnSale = true;
  const priceOnSale = (price * (1 - discount / 100)).toFixed(2);

  return (
    <StyledCard>
      <StyledCardMedia image={imageUrl} title={name}/>
      <CardContent>
        {/* nome do produto */}
        <Box sx={{ width: '180px', maxHeight:'100px', overflow: 'hidden'}}>
        <Typography variant="h1" fontSize={14} component="h2" noWrap>
          {name}
        </Typography>
        </Box>
        {/* valor original do produto (aparece apenas se em promoção) */}
        {!isOnSale ? null : (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography
              variant="h4"
              fontSize={12}
              sx={{ mt: 1.5, color: "#999999", textDecoration: "line-through", display: "inline" }}
            >
              R${price}
            </Typography>
            <Typography fontSize={8.4} sx={{ color: "#00A650", display: "inline" }}>
              10% OFF
            </Typography>
          </Box>
        )}
        {/* valor do produto com desconto */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" fontSize={24} sx={{ display: "inline"}}>
            R${priceOnSale}
          </Typography>
          <Typography fontSize={14} sx={{ color: "#00A650", display: "inline", ml: 1 }}>
            10% OFF
          </Typography>
        </Box>
        {/* valor parcelado */}
        <Typography
          variant="h4"
          fontSize={12}
          sx={{ mt: 1.5, color: "#999999" }}
        >
          em 12x R${(priceOnSale / 12).toFixed(2)}
        </Typography>
        <Typography
          variant="h4"
          fontSize={12}
          sx={{ mt: 1.5, color: "#00A650", backgroundColor: "#E6F4EA", p: 0.5, borderRadius: "5px", }}
        >
          Frete grátis
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default ProductCard;
