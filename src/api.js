const BASE_URL = 'http://localhost:5000/api';

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      try {
        
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid registration attempt');
      } catch (jsonError) {
        
        throw new Error(response.statusText || 'Invalid registration attempt');
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error registering user:', error.message);
    throw error;
  }
};

export const getMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/movies/getmovie`);

    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching movies:', error.message);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await fetch(`${BASE_URL}/movies/${movieId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching movie details:', error.message);
    throw error;
  }
};

export const addToFavorites = async (movieId, userId) => {
    const response = await fetch(`http://localhost:5000/api/favorites/add/${movieId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWExNGM4ZDkwZjQxMmIzNjZkYTQyNDYiLCJpYXQiOjE3MDUyMTE3MTcsImV4cCI6MTcwNTIxNTMxN30.tlRilppkKZkYfA3nFel_xyWYsF5ijfrHekt2r8EiTng',
      },
      body: JSON.stringify({ userId }), 
    });
  
    if (!response.ok) {
      throw new Error('Failed to add to favorites');
    }
  
    return response.json();
  };
  export const getUserData = async () => {
    const response = await fetch('http://localhost:5000/api/user/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWExNGM4ZDkwZjQxMmIzNjZkYTQyNDYiLCJpYXQiOjE3MDUyMTE3MTcsImV4cCI6MTcwNTIxNTMxN30.tlRilppkKZkYfA3nFel_xyWYsF5ijfrHekt2r8EiTng',

        
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
  
    return response.json();
  };  
export const rateMovie = async (movieId, rating, userId) => {
    try {
        
      const response = await fetch(`${BASE_URL}/movies/${String(movieId)}/rate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating, userId }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to rate the movie');
      }
  
      return response.json();
    } catch (error) {
      console.error('Error rating the movie:', error.message);
      throw error;
    }
  };
  
  
  
  export const removeFromFavorites = async (movieId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/api/favorites/remove/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
         'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWExNGM4ZDkwZjQxMmIzNjZkYTQyNDYiLCJpYXQiOjE3MDUyMTE3MTcsImV4cCI6MTcwNTIxNTMxN30.tlRilppkKZkYfA3nFel_xyWYsF5ijfrHekt2r8EiTng',
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to remove from favorites');
    }
  
    return response.json();
  };
  

  export const getFavorites = async () => {
    const response = await fetch('http://localhost:5000/api/favor/favorite', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWExNGM4ZDkwZjQxMmIzNjZkYTQyNDYiLCJpYXQiOjE3MDUyMTE3MTcsImV4cCI6MTcwNTIxNTMxN30.tlRilppkKZkYfA3nFel_xyWYsF5ijfrHekt2r8EiTng',
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch favorites');
    }
  
    return response.json();
  };

  // api.js

  export const getRecommendations = async (userId) => {
    const response = await fetch(`http://localhost:5000/api/movies/recommendations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWExNGM4ZDkwZjQxMmIzNjZkYTQyNDYiLCJpYXQiOjE3MDUyMTE3MTcsImV4cCI6MTcwNTIxNTMxN30.tlRilppkKZkYfA3nFel_xyWYsF5ijfrHekt2r8EiTng',
      },
      body: JSON.stringify({ userId }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch recommendations');
    }
  
    return response.json();
  };
  
  