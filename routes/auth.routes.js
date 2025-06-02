import express from 'express'
import { login, register } from '../controller/auth.controller.js'

const authRoutes= express.Router()

authRoutes.get('/login',login)
authRoutes.post('/register', register)


export default authRoutes