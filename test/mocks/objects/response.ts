import { Response } from 'express';

export const responseMock = {
  render: jest.fn(),
} as Partial<Response> as Response;
