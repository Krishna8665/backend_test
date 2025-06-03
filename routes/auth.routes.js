import express from 'express'
import { login, logout, register } from '../controller/auth.controller.js'

const authRoutes= express.Router()

authRoutes.post('/login',login)
authRoutes.post('/register', register)
authRoutes.post('/logout',logout)


export default authRoutes