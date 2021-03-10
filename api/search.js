const fetch = require("node-fetch");

module.exports = async (req, res) => {
  const response = await fetch("https://www.inkoop.io/content.json");
  const data = await response.json();

  const { query } = req.query;

  if (query) {
    const resultsFiltered = {
      hire: data.hire.filter((item) => {
        console.log(item);
        return (
          item.name.toLowerCase().includes(query) ||
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.technologies.some((i) => i.toLowerCase().includes(query))
        );
      }),
      blog: data.blog.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.author.toLowerCase().includes(query) ||
          item.technologies.some((i) => i.toLowerCase().includes(query))
      ),
      portfolio: data.portfolio.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.project_name.toLowerCase().includes(query) ||
          item.tags.some((i) => i.toLowerCase().includes(query))
      ),
      product: data.product.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.tags.some((i) => i.toLowerCase().includes(query))
      ),
    };

    const results = Object.keys(resultsFiltered)
      .map((key) => resultsFiltered[key])
      .flat();

    res.status(200).json({ results });
  } else {
    res.status(200).json({ message: "No Input" });
  }
};
