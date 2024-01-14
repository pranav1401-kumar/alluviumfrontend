import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, CardMedia, Divider, Grid, Button } from '@mui/material';
import { getRecommendations } from '../api'; // Adjust the import path accordingly
import { Link } from 'react-router-dom';

const RecommendationPage = ({ userId }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const recommendationsData = await getRecommendations(userId);
        setRecommendations(recommendationsData);
      } catch (error) {
        console.error('Error fetching recommendations:', error.message);
      }
    };

    fetchRecommendations();
  }, [userId]);

  return (
    <Container>
      <Typography variant="h4" style={{ marginBottom: '20px', textAlign: 'center' }}>
        Personalized Movie Recommendations
      </Typography>
      <Grid container spacing={3}>
        {recommendations.map((movie, index) => (
          <Grid item key={movie._id} xs={12} sm={6} md={4} lg={3}>
            <Card style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardMedia
                component="img"
                alt={movie.title}
                height="200"
                image={movie.poster} // Assuming you have a poster field
              />
              <CardContent style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom>
                  {movie.title}
                </Typography>
                <Typography variant="body1">{movie.description}</Typography>
                <Divider style={{ margin: '10px 0' }} />
                <div style={{ marginTop: 'auto' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/movie/${movie._id}`}
                    style={{ width: '100%' }}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RecommendationPage;
