# Three.js Architecture: MVC

This repository illustrates the result of the [Model-View-Controller (MVC)](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) architecture changes described in the article, implemented in a Three.js application.

The project demonstrates how to decouple application state from the 3D visuals, keeping the logic predictable, maintainable, and easier to test.

## Three.js Architecture Series

- [Three.js Architecture: ECS](https://dev.to/i_babkov/threejs-architecture-ecs-3fg2)
- [Three.js Architecture: MVC](https://dev.to/i_babkov/threejs-architecture-mvc-f9c/)
- [All Articles](http://ibabkov.com/blog)

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run development server:
   ```bash
   npm start
   ```
3. Build for production:
   ```bash
   npm run build
   ```

### Benchmarks

To run performance benchmarks:

1. Setup benchmark dependencies (Playwright):
   ```bash
   npm run benchmark:setup
   ```
2. Run the benchmark:
   ```bash
   npm run benchmark
   ```

This command will start the development server and execute the performance tests automatically.

### License

MIT
