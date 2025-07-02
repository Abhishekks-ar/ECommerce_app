import React from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";

// Categories list
const categories = [
  "Electronics",
  "Fashion",
  "Home Appliances",
  "Books",
  "Toys",
];

// Dummy 
const sampleProducts = [
  {
    name: "Product 1",
    image: "https://via.placeholder.com/150",
    price: "₹999",
  },
  {
    name: "Product 2",
    image: "https://via.placeholder.com/150",
    price: "₹1,299",
  },
  {
    name: "Product 3",
    image: "https://via.placeholder.com/150",
    price: "₹749",
  },
  {
    name: "Product 4",
    image: "https://via.placeholder.com/150",
    price: "₹2,199",
  },
  {
    name: "Product 5",
    image: "https://via.placeholder.com/150",
    price: "₹899",
  },
];

const Home = () => {
  return (
    <Box sx={{ mt: "64px", px: 2 }}>
      <Typography variant="h5" gutterBottom>
        Shop by Category
      </Typography>

      {categories.map((category, index) => (
        <Paper
          key={index}
          elevation={3}
          sx={{
            p: 2,
            mb: 3,
            bgcolor: "#fafafa",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            {category}
          </Typography>

          <Grid
            container
            spacing={2}
            sx={{ overflowX: "auto", flexWrap: "nowrap" }}
          >
            {sampleProducts.map((product, idx) => (
              <Grid item key={idx} sx={{ minWidth: 200 }}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography variant="subtitle1">{product.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant="contained">
                      Buy Now
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      ))}
    </Box>
  );
};

export default Home;
