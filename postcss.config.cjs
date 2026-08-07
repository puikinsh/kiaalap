module.exports = {
  plugins: {
    autoprefixer: {},
    // cssnano 8 runs SVGO over inline SVG data URIs. Bootstrap ships those
    // percent-encoded (url("data:image/svg+xml,%3csvg ...")), which SVGO
    // cannot parse — it logs a SvgoParserError per occurrence and leaves the
    // value alone. Disabling that one optimisation keeps builds quiet without
    // changing output.
    cssnano:
      process.env.NODE_ENV === 'production' ? { preset: ['default', { svgo: false }] } : false
  }
};
