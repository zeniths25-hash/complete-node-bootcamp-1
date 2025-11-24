// import fs from 'fs';

const fs = require("fs");
const http = require("http");
const url = require("url");

const slugify = require("slugify");

const replaceTemplate = require("./modules/replaceTemplate");

//Files
//bokcing

// const count = fs.readFileSync('./txt/input.txt','utf-8')
// console.log(count);
// const output = `so ... ${count} created on ${Date.now().toLocaleString()}`
// fs.writeFileSync('./txt/output.txt', output);

//async function
// fs.readFile('./txt/start.txt','utf-8', (err, data) => {
//     fs.readFile(`./txt/${data}.txt`,'utf-8', (err, data) => {

//     console.log(data);
//     fs.readFile(`./txt/append.txt`,'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.writeFile(`./txt/final.txt`, data+''+data2 ,'utf-8',(err, data)=>{
//             console.log(data);
//         })
//         fs.writeFile(`./txt/final2.txt`, `${data} ${data2}` ,'utf-8',(err, data)=>{
//             console.log('written 🤔');
//         })
//     });
//     })
// });

// fs.readFile(`./txt/start2.txt`,'utf-8', (err, data) => {
//         if (err)
//         return console.error(err,'failed',err.message);
// })

//Server

const fileData = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const finalData = JSON.parse(fileData);

const slug = slugify("Fresh-Avocados", { lower: true });
const slugs = finalData.map((product) =>
  slugify(product.productName, { lower: true })
);
console.log(slug, slugs);

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const server = http.createServer((req, resp) => {
  // const { pathName,query} = url.parse(req.url,true);
  const obj = url.parse(req.url, true);
  const pathName = obj.pathname;
  const query = obj.query;
  console.log(obj, obj.pathname, query, pathName, req.url);
  if (pathName === "/" || pathName === "/overview") {
    const cardsHtmls = finalData
      .map((obj) => replaceTemplate(tempCard, obj))
      .join("");
    // resp.end(tempOverview);
    const overview = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtmls);
    resp.writeHead(200, { "Content-type": "text/html" });
    resp.end(overview);
  } else if (pathName === "/product") {
    resp.writeHead(200, { "Content-type": "text/html" });
    const output = replaceTemplate(tempProduct, finalData[query.id]);
    resp.end(output);
  } else if (pathName === "/test") resp.end("testing");
  else if (pathName === "/api") {
    resp.writeHead(200, { "Content-type": "application/json" });
    // fs.readFile(`${__dirname}/dev-data/data.json`,'utf-8',(error,data)=>{
    //     const processedData = JSON.parse(data)
    //     // console.log(processedData)
    //     resp.end(data)
    // })
    resp.end(fileData);
  } else {
    // resp.statusCode = 404;
    resp.writeHead(404, {
      "cotent-type": "text/html",
      "my-header": "Content-Type",
    });
    resp.end("<h1>page not found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening to port 8080");
});
