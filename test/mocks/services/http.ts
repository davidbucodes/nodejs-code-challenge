import { HttpService } from '@nestjs/axios';

export const httpModuleMock: Partial<HttpService> = { get: jest.fn() };
