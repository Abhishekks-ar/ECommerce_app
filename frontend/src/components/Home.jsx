import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";

// Simple image carousel using state
const carouselImages = [
  "https://t4.ftcdn.net/jpg/02/49/50/15/360_F_249501541_XmWdfAfUbWAvGxBwAM0ba2aYT36ntlpH.jpg",
  "https://static.vecteezy.com/system/resources/previews/002/006/774/non_2x/paper-art-shopping-online-on-smartphone-and-new-buy-sale-promotion-backgroud-for-banner-market-ecommerce-free-vector.jpg",
  "https://img.freepik.com/premium-vector/sports-shoe-social-media-cover-template-fashion-sneakers-marketing-facebook-cover-photo-design_755018-1884.jpg?semt=ais_hybrid&w=740",
];

const Home = () => {
  const [categoryProducts, setCategoryProducts] = useState({});
  const [currentImage, setCurrentImage] = useState(0);

  // Fetch top products by category
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/products/by-category");
        setCategoryProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products by category:", err);
      }
    };
    fetchData();
  }, []);

  // Carousel image changer
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ mt: "64px", px: 2 }}>
      {/* Carousel */}
      <Paper elevation={3} sx={{ mb: 4 }}>
        <img
          src={carouselImages[currentImage]}
          alt={`carousel-${currentImage}`}
          style={{ width: "100%", height: "300px", objectFit: "cover" }}
        />
      </Paper>

      {/* Shop by Category */}
      <Typography variant="h5" gutterBottom>
        Top Picks by Category
      </Typography>

      {Object.entries(categoryProducts).map(([category, products]) =>
        Array.isArray(products) && products.length > 0 ? (
          <Paper key={category} elevation={2} sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {category}
            </Typography>
            <Grid
              container
              spacing={2}
              sx={{ overflowX: "auto", flexWrap: "nowrap" }}
            >
              {products.map((product) => (
                <Grid item key={product._id} sx={{ minWidth: 200 }}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={
                        product.images?.[0] || "https://via.placeholder.com/150"
                      }
                      alt={product.name}
                    />
                    <CardContent>
                      <Typography variant="subtitle1">
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ₹{product.price}
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
        ) : null
      )}
    </Box>
  );
};

export default Home;
