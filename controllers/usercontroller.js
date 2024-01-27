const expressAsyncHandler = require("express-async-handler");
const User = require("../models/usermodel");
const { Snowflake } = require("@theinternetfolks/snowflake");
const generateToken = require("../config/generatetoken");

const createUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const errors = [];

  if (!name || name.length < 2) {
    const error = {
      param: "name",
      message: "Name should be at least 2 characters.",
      code: "INVALID_INPUT",
    };
    errors.push(error);
  }

  if (!email) {
    const error = {
      param: "email",
      message: "email should be provided.",
      code: "INVALID_INPUT",
    };
    errors.push(error);
  }
  if (!password || password.length < 6) {
    const error = {
      param: "password",
      message: "Password should be at least 2 characters.",
      code: "INVALID_INPUT",
    };
    errors.push(error);
  }
  if (errors.length > 0) {
    res.status(400).json({
      status: false,
      errors,
    });
  }
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400).json({
      status: false,
      errors: [
        {
          param: "email",
          message: "User with this email address already exists.",
          code: "RESOURCE_EXISTS",
        },
      ],
    });
    return;
  }

  const user = await User.create({
    id: Snowflake.generate(),
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      status: true,
      content: {
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          created_at: user.created_at,
        },
        meta: {
          access_token: generateToken(user._id),
        },
      },
    });
  } else {
    res.status(400);
    throw new Error("Failed to create User");
  }
});

const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      status: true,
      content: {
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          created_at: user.created_at,
        },
        meta: {
          access_token: generateToken(user._id),
        },
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credntials");
  }
});

const userDetails = expressAsyncHandler(async (req, res) => {
  const id = req.user._id;
  const user = await User.findOne({ _id: id });
  if (user) {
    res.status(200).json({
      status: true,
      content: {
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          created_at: user.created_at,
        },
      },
    });
  } else {
    res.status(401).json({
      status: false,
      errors: [
        {
          message: "You need to sign in to proceed.",
          code: "NOT_SIGNEDIN",
        },
      ],
    });
  }
});

module.exports = { createUser, authUser, userDetails };
