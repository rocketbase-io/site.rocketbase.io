const fs = require("fs");
const pluginNavigation = require("@11ty/eleventy-navigation");
const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [300, 600],
    formats: ["avif", "jpeg"]
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (eleventyConfig) {

  // Copy `img/` + `fonts/` to `_site/img`
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy("src/**/*.(svg|png|jpg)");

  eleventyConfig.addPlugin(pluginNavigation);

  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addNunjucksGlobal("year", new Date().getFullYear());
  eleventyConfig.addNunjucksGlobal("timestamp", Date.now());
  eleventyConfig.addPairedShortcode("image", imageShortcode);


  eleventyConfig.addPairedShortcode("headerSection", (content, title, image) => {
    return `<section>
  <h1>${title}</h1>
  <img src="${image}" />
  <div>${content}</div>
</section>`;
  });

  eleventyConfig.addPassthroughCopy("docs");


  // Browsersync Overrides
  eleventyConfig.setBrowserSyncConfig({
    ui: false,
    port: 5555,
    callbacks: {
      ready: function(err, bs) {

        bs.addMiddleware("*", (req, res) => {
          const content_404 = fs.readFileSync('_site/404.html');
          // Add 404 http status code in request header.
          res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      }
    }
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
