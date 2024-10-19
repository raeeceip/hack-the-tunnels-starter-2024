import { Account } from "@prisma/client";
import { prisma } from "../db";
import { Ok, Err, Result } from "ts-results";
import bcrypt from "bcrypt"

export const findByEmail = async (email: string): Promise<Account | null> => {
  const account = await prisma.account.findFirst({
    where: { email: email },
  });

  if (!account) {
    return null;
  }

  return account;
};

export const create = async (
  email: string,
  password: string,
  hashedPwd: string,
  role = "USER",
): Promise<Result<Account, Error>> => {
  const existingAccount = await findByEmail(email);

  if (existingAccount !== null) {
    return Err(new Error("Account already exists"));
  }

  //hashedPassword = password
  const bcrypt = require('bcrypt');
  const saltRounds = 10;

  bcrypt.hash(password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    hashedPwd = hash
  });

  
  const newAccount = await prisma.account.create({
    data: {
      email: email,
      password: hashedPwd,
      role: role,
    },
  });
  
  console.log(hashedPwd);
  return Ok(newAccount);
};
