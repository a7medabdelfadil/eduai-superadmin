// jest.setup.ts
import '@testing-library/jest-dom';

// محاكاة react-toastify
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));