import http, { IncomingMessage, ServerResponse } from "http";

const server = http.createServer(
  (request: IncomingMessage, response: ServerResponse) => {
    if (request.url === "/") {
      response.writeHead(200, { "content-type": "text/html" });

      response.end(`
         <!DOCTYPE html>
         <html>
          <head>
            <title>Home</title>
          </head>
          <body>
           <h1>Welcome to our Home Page!</h1>
           <p>Our website can create your ideas into reality.</p>
           <p>Because we have best developers. to create a full stack sites</p>
          </body>
         </html>
        `);
    } else if (request.url === "/about") {
      response.writeHead(200, { "content-type": "text/plain" });

      response.end("Welcome to About US page");
    } else if (request.url === "/employee") {
      response.writeHead(200, { "content-type": "application/json" });

      interface EmployeeDatatypes {
        name: string;
        age: number;
        id?: number;
        intro: string;
      }

      let employeesData: EmployeeDatatypes = {
        name: "Suraish",
        age: 22,
        id: 260492,
        intro: "Frontend Developer",
      };

      response.end(JSON.stringify(employeesData));
    } else if (request.url === "/service") {
      response.writeHead(200, { "content-type": "text/html" });

      response.end(`
         <!DOCTYPE html>
         <html>
          <head>
            <title>Service Page</title>
          </head>
          <body>
           <h1>Our Best Services</h1>
           <p>Frontend Development services by best developers</p>
           <p>Backend Development services by best developers</p>
           <p>Full-Stack Development services by best developers</p>
          </body>
         </html>
        `);
    } else if (request.url === "/contact") {
      response.writeHead(200, { "content-type": "text/plain" });

      response.end("Contact Us: 23223432444");
    } else {
      response.statusCode = 404;
      response.end("Sorry, We cannot find any page according to your request.");
    }
  }
);

server.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
