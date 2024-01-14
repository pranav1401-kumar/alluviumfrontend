

import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Card, CardContent, CardMedia } from '@mui/material';
import { searchMovies } from '../api';
const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = async () => {
    try {
      const result = await searchMovies(searchTerm); 
      setSearchResult(result);
    } catch (error) {
      console.error('Error searching movies:', error.message);
    }
  };

  return (
    <Container>
      <Typography variant="h4" style={{ marginBottom: '20px', textAlign: 'center' }}>
        Search Movies
      </Typography>
      <TextField
        label="Enter movie name"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>

      {searchResult && (
        <Card style={{ marginTop: '20px' }}>
          <CardMedia
            component="img"
            alt={searchResult.title}
            height="200"
            image={searchResult.poster} 
          />
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {searchResult.title}
            </Typography>
            <Typography variant="body1">{searchResult.description}</Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default SearchPage;
