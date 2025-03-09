import { setupServer } from 'msw/node';
import { rest } from 'msw';

export const server = setupServer(
  rest.post('*/auth/login', (req, res, ctx) => {
    return res(ctx.json({ data: 'token' }));
  })
);