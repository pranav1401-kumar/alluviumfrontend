import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Box,
  CardMedia,
  Grid,
} from '@mui/material';
import { getMovieDetails, addToFavorites, getUserData } from '../api';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { userId } = useParams();
  const navigate = useNavigate();
  const [movieDetails, setMovieDetails] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const details = await getMovieDetails(movieId);
        setMovieDetails(details);
      } catch (error) {
        console.error('Error fetching movie details:', error.message);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await getUserData(userId);
        setUser(userResponse);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [userId]);

  const handleAddToFavorites = async () => {
    try {
      if (!user || !user._id) {
        console.error('User data is missing or incomplete:', user);
        return;
      }

      const userId = user._id.toString();

      await addToFavorites(movieId, userId);
      navigate('/favorite');
    } catch (error) {
      console.error('Error adding to favorites:', error.message);
    }
  };

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Container style={{ paddingTop: 20, paddingBottom: 20 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardMedia
              component="img"
              alt={movieDetails.title}
              height="auto"
              image={movieDetails.poster}
              style={{ width: '100%' }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {movieDetails.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Release Date: {new Date(movieDetails.releaseDate).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" style={{ marginTop: 20 }}>
                {movieDetails.description}
              </Typography>
              <Box mt={3}>
                <Typography variant="h6">Genres:</Typography>
                <List>
                  {movieDetails.genre &&
                    movieDetails.genre.map((genre, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={genre} />
                      </ListItem>
                    ))}
                </List>
              </Box>
              <Box mt={3}>
                <Typography variant="h6">Cast:</Typography>
                <List>
                  {movieDetails.actors &&
                    movieDetails.actors.map((actor, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={actor} />
                      </ListItem>
                    ))}
                </List>
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddToFavorites}
                style={{ marginTop: 20, width: '100%' }}
              >
                Add to Favorites
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MovieDetailsPage;
