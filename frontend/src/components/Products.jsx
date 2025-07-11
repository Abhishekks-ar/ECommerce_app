import React, { useEffect, useState } from "react";
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
  CircularProgress,
  CardActionArea,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // <-- added
import { Link } from "react-router-dom"; // for clickable card

const categories = [
  "Electronics",
  "Fashion",
  "Books",
  "Home & Kitchen",
  "Toys & Games",
  "Beauty & Personal Care",
  "Sports & Fitness",
  "Others",
];

const Products = () => {
  const [value, setValue] = useState(0);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const selectedCategory = categories[value];
  const products = productsByCategory[selectedCategory] || [];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/products/by-category");
        setProductsByCategory(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddToCart = (product) => {
    console.log("Add to cart:", product);
    // You can integrate Redux or Context here later
  };

  const handleBuyNow = (product) => {
    console.log("Buy now:", product);
    // You can redirect to checkout or product detail page
    navigate(`/product/${product._id}`);
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

      <Typography variant="h6" gutterBottom>
        {selectedCategory} Products
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {products.length > 0 ? (
            products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <Card>
                  <CardActionArea component={Link} to={`/product/${product._id}`}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={product.images[0] || "https://via.placeholder.com/150"}
                      alt={product.name}
                    />
                    <CardContent>
                      <Typography variant="h6">{product.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        ₹{product.price} | {product.discount}% OFF
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => handleBuyNow(product)}
                    >
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
      )}
    </Box>
  );
};

export default Products;
