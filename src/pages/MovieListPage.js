import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Paper, Modal, Box, Rating, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getMovies, rateMovie } from '../api'; 
import StarIcon from '@mui/icons-material/Star';

const MovieListPage = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [rating, setRating] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await getMovies();
        setMovies(moviesData);
      } catch (error) {
        console.error('Error fetching movies:', error.message);
      }
    };

    fetchMovies();
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setRating(movie.rating || 0);
    setIsModalOpen(true);
  };

  const handleRateMovie = async (req) => {
    try {
        

    
      await rateMovie(selectedMovie._id, rating, userId);



      
      const moviesData = await getMovies();
      setMovies(moviesData);
    } catch (error) {
      console.error('Error rating movie:', error.message);
    }

  
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleViewDetails = (movieId) => {
    navigate(`/movie/${movieId}`); 
  };

  return (
    <Container>
      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item key={movie._id} xs={12} sm={6} md={4}>
            <Paper
              component={Card}
              sx={{
                position: 'relative',
                overflow: 'hidden',
                paddingTop: '150%',
              }}
            >
              <img
                src={movie.poster}
                alt={movie.title}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <CardContent
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: '#fff',
                  padding: '10px',
                }}
              >
                <Typography variant="h6">{movie.title}</Typography>
                <Typography variant="body2">Release Date: {movie.releaseDate}</Typography>
                <Box display="flex" alignItems="center">
                  <IconButton onClick={() => handleMovieClick(movie)}>
                    <StarIcon style={{ color: '#FFD700' }} />
                  </IconButton>
                  <Button variant="outlined" size="small" onClick={() => handleViewDetails(movie._id)}>
                    View Details
                  </Button>
                </Box>
              </CardContent>
            </Paper>
          </Grid>
        ))}
      </Grid>

     
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'white',
            p: 3,
            borderRadius: 4,
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Rate {selectedMovie && selectedMovie.title}
          </Typography>
          <Rating
            name="movie-rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
          />
          <Button onClick={handleRateMovie} variant="contained" sx={{ mt: 2 }}>
            Rate
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default MovieListPage;
