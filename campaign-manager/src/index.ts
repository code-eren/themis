// Include it and extract some methods for convenience
const server = require('server');
const { get, post } = server.router;

// Launch server with options and a couple of routes
server({ port: 8080 }, [
  get('/', (ctx: any) => 'Hello world'),
  post('/', (ctx: any) => {
    console.log(ctx.data);
    return 'ok';
  })
]);