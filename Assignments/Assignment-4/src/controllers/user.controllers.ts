import { Request, Response } from "express";
import userModel from "../models/user-models";

interface UsersReqBody {
  name: string;
  email: string;
  password: string;
  age: number;
  role: string;
 experience: number;
}

export async function getAllUsers(req: Request, res: Response) {
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
  req: Request<{ id: string }, {}, UsersReqBody>,
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
  req: Request<{}, {}, UsersReqBody>,
  res: Response
) {
  try {
    const { age, email, experience, name, password, role, } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "User name is required",
      });
    }
    if (!age) {
      return res.status(400).json({
        success: false,
        message: "User age is required",
      });
    }
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "User email is required",
      });
    }
    if (!experience) {
      return res.status(400).json({
        success: false,
        message: "User experience is required",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "User password is required",
      });
    }
  

    const isEmailFound = await userModel.findOne({ email });
    const isNameFound = await userModel.findOne({ name });

    if (isEmailFound) {
      return res.status(400).json({
        success: false,
        message: "User already exits with this email!",
      });
    }
    if (isNameFound) {
      return res.status(400).json({
        success: false,
        message: "Username already exits with this name!",
      });
    }

    const user = new userModel(req.body);

    const newUser = await user.save();

    res.status(200).json({
      success: true,
      message: "Congratulations! New user created successfully!",
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
  req: Request<{ id: string }, {}, UsersReqBody>,
  res: Response
) {
  try {
    const isUserFound = await userModel.findOne({ _id: req.params.id });

    if (!isUserFound) {
      return res.status(404).json({
        success: false,
        message: "Sorry, User not found in our Database.",
      });
    }

    let payload: any = {};

    if (req.body.name) {
      payload.name = req.body.name;
    }
    if (req.body.email) {
      payload.email = req.body.email;
    }
    if (req.body.age) {
      payload.age = req.body.age;
    }
    if (req.body.password) {
      payload.password = req.body.password;
    }
    if (req.body.experience) {
      payload.experience = req.body.experience;
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

export async function deleteUser(req: Request<{ id: string }>, res: Response) {
  try {
    const { id } = req.params;

    const deletedUser = await userModel.findOneAndDelete({ _id: id });

    if (!deletedUser) {
      res.status(404).json({
        success: false,
        message: "Sorry, This ID name user not found in database.",
      });
    }
    res.status(200).json({
      message: "User removed successfully!",
      data: deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error" + error,
    });
  }
}
