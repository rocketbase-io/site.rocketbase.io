const { DateTime } = require("luxon");
const { promises: fs, readFileSync } = require("fs");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const pluginSass = require("eleventy-plugin-sass");
const htmlmin = require("html-minifier");
const { exec } = require("child_process");

module.exports = function(eleventyConfig) {

  // eleventyConfig.on('afterBuild', () => {
  //   exec("npm run build:js");
  // });

  exec("npm run build:js");

  // Copy `img/` + `fonts/` to `_site/img`
  eleventyConfig.addPassthroughCopy("src/fonts");

  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(pluginSass, {sourcemaps: false, watch: ['src/**/*.scss', '!node_modules/**']});

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addLayoutAlias("post", "src/layouts/post.njk");
  eleventyConfig.addLayoutAlias("project", "src/layouts/project.njk");

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  eleventyConfig.addNunjucksShortcode("githubStars", function(username, repro) {
    // <a href="https://github.com/${username}/${repro}"><img src="/img/icons/github.svg" class="image is-24x24" alt="github - ${repro}"></a>
    // <img src="https://githubbadges.com/star.svg?user=${username}&repo=${repro}&style=flat&color=fff&background='" alt="star count">
    return `<iframe src="https://ghbtns.com/github-btn.html?user=${username}&amp;repo=${repro}&amp;type=star&amp;count=true&amp;size=large" frameborder="0" scrolling="0" width="160px" height="30px"></iframe>`;
  });


  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if( n < 0 ) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  eleventyConfig.addPassthroughCopy("src/**/*.jpg");
  eleventyConfig.addPassthroughCopy("src/**/*.jpeg");
  eleventyConfig.addPassthroughCopy("src/**/*.ico");
  eleventyConfig.addPassthroughCopy("src/**/*.png");
  eleventyConfig.addPassthroughCopy("src/**/*.svg");

  /* Markdown Overrides */
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAnchor, {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#"
  });
  eleventyConfig.setLibrary("md", markdownLibrary);

  // minify html
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if( outputPath.endsWith(".html") ) {
      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
    }
    return content;
  });

  // Browsersync Overrides
  eleventyConfig.setBrowserSyncConfig({
    ui: false,
    port: 5555,
    callbacks: {
      ready: function(err, browserSync) {
        const content_404 = readFileSync('_site/404/index.html');

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
        exec("npm run build:js");
      }
    }
  });

  return {
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about those.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // You can also pass this in on the command line using `--pathprefix`

    // pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",

    // These are all optional, defaults are shown:
    dir: {
      input: "./src/",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
