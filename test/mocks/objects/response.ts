import { Response } from 'express';

const responseMock = {} as Partial<Response> as Response;

responseMock.render = jest.fn().mockReturnValue(responseMock);
responseMock.status = jest.fn().mockReturnValue(responseMock);

export { responseMock };
