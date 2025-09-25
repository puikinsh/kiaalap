export default {
  plugins: {
    autoprefixer: {},
    cssnano: process.env.NODE_ENV === 'production' ? {} : false
  }
};