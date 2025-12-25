import { Request, Response } from "express";
import userModel from "../models/user-model";

interface RequestBody {
  userName: string;
  email: string;
  role: string;
  skills: string[];
  experience: number;
}

interface Payload {
  userName?: string;
  email?: string;
  role?: string;
  skills?: string[];
  experience?: number;
}

export async function getAllusers(req: Request, res: Response) {
  try {
    const userList = await userModel.find();

    res.status(200).json({
      success: true,
      message: "All users data fetched successfully!",
      data: userList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error" + error,
    });
  }
}

export async function getByUserId(
  req: Request<{ id: string }, {}, RequestBody>,
  res: Response
) {
  try {
    const { id } = req.params;

    const user = await userModel.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User founded successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error" + error,
    });
  }
}

export async function createNewUser(
  req: Request<{}, {}, RequestBody>,              
  res: Response
) {
  try {
    const { email, experience, role, skills, userName } = req.body;

    if (!email || !experience || !skills || !userName) {
      return res.status(400).json({
        success: false,
        message: "All fields are requred.",
      });
    }

    const isFound = await userModel.findOne({ email });

    if (isFound) {
      return res.status(400).json({
        success: false,
        message: "User already exits with this email!",
      });
    }

    const user = new userModel(req.body);

    const newUser = await user.save();

    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error" + error,
    });
  }
}

export async function updateUser(
  req: Request<{ id: string }, {}, RequestBody>,
  res: Response
) {
  try {
    const isUserFound = await userModel.findOne({ _id: req.params.id });

    if (!isUserFound) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let payload: any = {};

    if (req.body.userName) {
      payload.userName = req.body.userName;
    }
    if (req.body.email) {
      payload.email = req.body.email;
    }
    if (req.body.experience) {
      payload.experience = req.body.experience;
    }
    if (req.body.skills) {
      payload.skills = req.body.skills;
    }
    if (req.body.role) {
      payload.role = req.body.role;
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      payload,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error" + error,
    });
  }
}

// export function deleteStudent(req: Request, res: Response) {
//   const StudentId: number = Number(req.params.id);

//   const studentIndex = allStudents.findIndex((s) => s.id === StudentId);

//   if (studentIndex === -1) {
//     return res.status(404).json({ message: "Student not found" });
//   }

//   const deletedStudent = allStudents.splice(studentIndex, 1);

//   res.status(200).json({
//     message: "Student removed successfully!",
//     data: deletedStudent[0],
//   });
// }
