import express, { Response, Request } from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

interface DeveloperTypes {
  id: number;
  name: string;
  field: string;
  experience: string;
}

const developers: DeveloperTypes[] = [
  {
    id: 1,
    name: "Suraish",
    field: "Frontend Developer",
    experience: "6-Months",
  },
  { id: 2, name: "Ali", field: "Backend Developer", experience: "1-Year" },
  { id: 3, name: "Khan", field: "Full Stack Developer", experience: "2-Year" },
];

app.get("/developers", (req: Request, res: Response) => {
  const responseObj = {
    message: "Developers Data fetch successfull",
    data: developers,
  };

  res.status(200).json(responseObj);
});

app.get("/developer/:id", (req: Request, res: Response) => {
  const devID: number = Number(req.params.id);

  if (!devID) {
    return res.status(400).json({
      message: "Developer ID required",
    });
  }

  const dev = developers.find((dev: DeveloperTypes) => dev.id === devID);

  if (!dev) {
    return res.status(404).json({
      message: "Sorry, developer not found",
    });
  }

  res.status(200).json({ message: "Developer Founded!", data: dev });
});

app.post("/createDev", (req: Request, res: Response) => {
  const { name, field, experience } = req.body;

  if (!name || !experience || !field) {
    return res.status(400).json({
      message: "name or field or experienced is requred.",
    });
  }

  const newDeveloper = {
    id: developers.length + 1,
    name: name,
    experience: experience,
    field: field,
  };

  developers.push(newDeveloper);

  res.status(200).json({
    message: "New Developers added successfully!",
    data: newDeveloper,
  });
});

app.delete("/delete/:id", (req: Request, res: Response) => {
  const devID: number = Number(req.params.id);

  if (!devID) {
    return res.status(400).json({
      message: "Developer ID required",
    });
  }

  // const dev = developers.find((dev: DeveloperTypes) => dev.id === devID);
  const dev = developers.findIndex((dev) => dev.id === devID);

  const deletedDev = developers.splice(dev, 1);

  if (deletedDev.length === 0) {
    return res.status(404).json({
      message: "Developer not found",
    });
  }

  res
    .status(200)
    .json({ message: "Deleted Developer Successfully!", data: deletedDev });
});


app.listen(PORT, () => {
  console.log(`your server is running on http://localhost:${PORT}`);
});
