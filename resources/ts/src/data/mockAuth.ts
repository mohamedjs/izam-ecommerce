export const mockAuthResponse = {
  login: (email: string, password: string) => {
    // Mock validation
    if (email === 'user@example.com' && password === 'password') {
      return {
        token: 'mock.jwt.token.12345',
        expiresIn: 3600,
        user: {
          id: '1',
          email: 'user@example.com',
          name: 'John Doe'
        }
      };
    }
    throw new Error('Invalid credentials');
  },
  
  signup: (email: string, password: string, name: string) => {
    return {
      token: 'mock.jwt.token.67890',
      expiresIn: 3600,
      user: {
        id: '2',
        email,
        name
      }
    };
  }
};