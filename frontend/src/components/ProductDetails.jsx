import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    console.log("Added to cart:", product);
    // Implement actual cart logic or Redux dispatch here
  };

  const handleBuyNow = () => {
    console.log("Proceed to buy:", product);
    // You can redirect to checkout page
    navigate("/checkout");
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <Typography variant="h6" color="error">
          Product not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: "80px", px: 3 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              image={product.images?.[0] || "https://via.placeholder.com/300"}
              alt={product.name}
              sx={{ height: 400, objectFit: "contain" }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              ₹{product.price} &nbsp;
              <span style={{ color: "green" }}>{product.discount}% OFF</span>
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {product.description || "No description available."}
            </Typography>

            <Box mt={4}>
              <Button
                variant="outlined"
                color="primary"
                sx={{ mr: 2 }}
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
              <Button variant="contained" color="primary" onClick={handleBuyNow}>
                Buy Now
              </Button>
            </Box>
          </CardContent>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;
