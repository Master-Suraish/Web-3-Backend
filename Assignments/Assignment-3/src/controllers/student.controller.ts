import { Request, Response } from "express";

interface Students {
  id: number;
  StudentName: string;
  Class: string;
  group: string;
  isPass: boolean;
}

const allStudents: Students[] = [
  {
    id: 1,
    StudentName: "Suraish",
    Class: "7th",
    group: "Science",
    isPass: true,
  },
  {
    id: 2,
    StudentName: "Ali",
    Class: "10th",
    group: "Computer",
    isPass: true,
  },
  {
    id: 3,
    StudentName: "John",
    Class: "12th",
    group: "Enginnering",
    isPass: true,
  },
];

export function getAllStudents(req: Request, res: Response) {
  const responseObj = {
    message: "All Students Data fetched successfully!",
    data: allStudents,
  };

  res.status(200).json(responseObj);
}

export function getByStudentId(req: Request, res: Response) {
  const StudentId: number = Number(req.params.id);

  if (!StudentId) {
    return res.status(400).json({
      message: "Student ID required",
    });
  }

  const student = allStudents.find((dev: Students) => dev.id === StudentId);

  if (!student) {
    return res.status(404).json({
      message: "Sorry, student not found",
    });
  }

  res.status(200).json({ message: "Student Founded!", data: student });
}

export function createNewStudent(req: Request, res: Response) {
  const { id, StudentName, group, Class, isPass } = req.body;

  if (!Class)
    return res.status(400).json({
      message: "Class is requred.",
    });

  if (!StudentName)
    return res.status(400).json({
      message: "StudentName is requred.",
    });

  if (!group)
    return res.status(400).json({
      message: "group is requred.",
    });

  if (!isPass)
    return res.status(400).json({
      message: "isPass is requred.",
    });

  const newStudent = {
    id: allStudents.length + 1,
    StudentName: StudentName,
    group: group,
    Class: Class,
    isPass: isPass,
  };

  allStudents.push(newStudent);

  res.status(200).json({
    message: "New Student added successfully!",
    data: newStudent,
  });
}

export function updateStudent(req: Request, res: Response) {
  const StudentId: number = Number(req.params.id);

  const studentIndex = allStudents.findIndex((s) => s.id === StudentId);

  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const updatedData = req.body;

  allStudents[studentIndex] = {
    ...allStudents[studentIndex],
    ...updatedData,
  };

  res.status(200).json({
    message: "Student updated successfully!",
    data: allStudents[studentIndex],
  });
}

export function deleteStudent(req: Request, res: Response) {
  const StudentId: number = Number(req.params.id);

  const studentIndex = allStudents.findIndex((s) => s.id === StudentId);

  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const deletedStudent = allStudents.splice(studentIndex, 1);

  res.status(200).json({
    message: "Student removed successfully!",
    data: deletedStudent[0],
  });
}
