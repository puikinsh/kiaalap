module.exports = {
  plugins: {
    autoprefixer: {},
    cssnano: process.env.NODE_ENV === 'production' ? {} : false
  }
};