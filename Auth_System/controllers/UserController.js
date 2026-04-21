import pool from '../Config/db.js'
import * as UserModel from '../models/UserModel.js'

export const register = async (req, res) => {
  const { 
    email,
    password,
    firstName,
    lastName,
    dob,
    course,
    major,
    address,
    status
    } = req.body

  try {
    const userProfile = { firstName, lastName, dob, course, major, address, status };
    const user = await UserModel.createUser(userProfile, email, password)
    res.status(200).json({ success: true, message: user })

  } catch (e) {
    console.log(e)
    res.status(400).json({ success: false, message: e })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const token = await UserModel.login(email, password)
    res
      .status(200)
      .json({ success: true, message: [{ result: 'login succesful' }, token] })
  } catch (e) {
    console.log(e)
    res.status(400).json({ success: false, message: e })
  }
}
