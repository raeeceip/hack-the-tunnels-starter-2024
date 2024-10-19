import { Ok, Err, Result } from "ts-results";
import jwt from "jsonwebtoken";
import { AccountService } from "../services";
//import { JWT_SECRET } from "../config/jwt";
import bcrypt from "bcrypt"
import * as dotenv from 'dotenv';
dotenv.config();

export const login = async (
  email: string,
  password: string,
): Promise<Result<string, Error>> => {
  const account = await AccountService.findByEmail(email);
  const bcrypt = require('bcrypt');
  const saltRounds = 10;

  if (account === null) {
    return Err(new Error("Account not found"));
  }

  bcrypt.compare(password, account.password, function(err, result) {
    if (!result) {
      return Err(new Error("Incorrect password"));
    }
  });

  //const secret = JWT_SECRET;
  const secret = process.env.JWT_SECRET;

  console.log("responded");
  
  if (!secret) {
    return Err(new Error("JWT_SECRET not set"));
  }

  const token = jwt.sign({ data: account.email }, secret);

  return Ok(`Bearer ${token}`);
};
