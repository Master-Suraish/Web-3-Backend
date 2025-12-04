import express, { Request, Response } from "express";

const app = express();

const PORT = 3000;

interface HomePage {
  companyName: string;
  companyMessage: string;
}

interface AboutPage {
  aboutUs: string;
  companyMessage: string;
  aboutOurTeam: string;
}

app.get("/", (req: Request, res: Response) => {
  const homePage: HomePage = {
    companyName: "SK-Dev",
    companyMessage: "Welcome, to our SK-Dev companies Home Page",
  };

  res.status(200).send(homePage);
});

app.get("/about", (req: Request, res: Response) => {
  const aboutPage: AboutPage = {
    aboutUs: "SK-Dev are working on every Full stack apps",
    companyMessage: "Welcome, to our SK-Dev companies Home Page",
    aboutOurTeam: "We have world best developers. For MERN,MERN,full Stack etc",
  };

  res.status(200).json(aboutPage);
});

app.listen(PORT, () => {
  console.log("Your server is runining on 3000");
});
