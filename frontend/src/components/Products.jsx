import React from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";

// categories
const categories = [
  "Electronics",
  "Fashion",
  "Home Appliances",
  "Books",
  "Toys",
  "Beauty",
  "Sports",
];

//  dummy 
const dummyProducts = {
  Electronics: [
    { name: "Smartphone", image: "https://via.placeholder.com/150", price: "₹15,000" },
    { name: "Laptop", image: "https://via.placeholder.com/150", price: "₹55,000" },
  ],
  Fashion: [
    { name: "T-Shirt", image: "https://via.placeholder.com/150", price: "₹599" },
    { name: "Jeans", image: "https://via.placeholder.com/150", price: "₹999" },
  ],
  Books: [
    { name: "The Alchemist", image: "https://via.placeholder.com/150", price: "₹299" },
    { name: "Atomic Habits", image: "https://via.placeholder.com/150", price: "₹399" },
  ],
};

const Products = () => {
  const [value, setValue] = React.useState(0);
  const selectedCategory = categories[value];
  const products = dummyProducts[selectedCategory] || [];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ mt: "64px", px: 2 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Category Tabs"
        sx={{ bgcolor: "background.paper", mb: 2 }}
      >
        {categories.map((cat, index) => (
          <Tab key={index} label={cat} />
        ))}
      </Tabs>

      {/* Selected Category Heading */}
      <Typography variant="h6" gutterBottom>
        {selectedCategory} Products
      </Typography>

      {/* Product Cards */}
      <Grid container spacing={2}>
        {products.length > 0 ? (
          products.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
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
          ))
        ) : (
          <Typography sx={{ pl: 2 }}>No products available.</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default Products;
