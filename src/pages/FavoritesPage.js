import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Paper, List, ListItem, ListItemText, Divider, CardMedia } from '@mui/material';
import { getFavorites, removeFromFavorites } from '../api';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoritesData = await getFavorites(userId);
        setFavorites(favoritesData);
      } catch (error) {
        console.error('Error fetching favorites:', error.message);
      }
    };

    fetchFavorites();
  }, [userId]);

  const handleRemoveFromFavorites = async (movieId) => {
    try {
      const confirmRemove = window.confirm('Are you sure you want to remove this movie from favorites?');

      if (!confirmRemove) {
        return; 
      }

      
      await removeFromFavorites(movieId);

      
      setFavorites((prevFavorites) => prevFavorites.filter((movie) => movie._id !== movieId));
    } catch (error) {
      console.error('Error removing from favorites:', error.message);
    }
  };

  if (!favorites.length) {
    return <Typography variant="h6">No favorite movies yet.</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" style={{ marginBottom: '20px' }}>
        My Favorites
      </Typography>
      <List>
        {favorites.map((movie, index) => (
          <React.Fragment key={movie._id}>
            <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
              <Typography variant="h5">{movie.title}</Typography>
              <CardMedia
                component="img"
                alt={movie.title}
                height="auto"
                image={movie.poster}
                style={{ maxWidth: '100%', marginTop: '10px' }}
              />
              <Typography variant="body1" style={{ marginTop: '10px' }}>
                {movie.description}
              </Typography>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleRemoveFromFavorites(movie._id)}
                style={{ marginTop: '20px' }}
              >
                Remove from Favorites
              </Button>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={`/movie/${movie._id}`}
                style={{ marginTop: '20px', marginLeft: '10px' }}
              >
                View Details
              </Button>
            </Paper>
            {index < favorites.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        style={{ marginTop: '20px' }}
      >
        Back to Home
      </Button>
    </Container>
  );
};

export default FavoritesPage;
