import { Request, Response } from "express";

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

export function getAllDevelopers(req: Request, res: Response) {
  const responseObj = {
    message: "Developers Data fetch successfull",
    data: developers,
  };

  res.status(200).json(responseObj);
}

export function getByDevId(req: Request, res: Response) {
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
}
