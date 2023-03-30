const nodemailer = require('nodemailer')
const { User } = require('../models/index')
const jsonwebtoken = require('jsonwebtoken')

require('dotenv').config()

exports.SignUp = async (req,res)=>{
    const { email, password } = req.body

    const token = jsonwebtoken.sign({code: code }, 'akbar_key')

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.USER_AUTH,
            pass: process.env.USER_PASS
        },
    })

    //mencari apakah email sudah terdaftar di db
    const emailUser = await User.findOne({
      where: {
        email: email
      }
    })
    //jika email sudah ada
    if(emailUser){
      return res.status(400).json({
        status: false,
        message: 'email sudah terdaftar'
      })
    }

    const mail = {
        from: process.env.USER_AUTH,
        to: email,
        subject: 'Verification Register',
        html: `<p>Click to verify account:</p> 
        <a href="http://localhost:3000/verify?token=${token}">Verify</a>`
    }

    //isi
    await transporter.sendMail(mail, (err, info) => {
        if (err) {
            console.error(err)
            res.json({
                data: err,
                status: 500,
                message: `Failed to send verification email`
            })
        } else {
            console.log('Email sent' + info.response)
            User.create({
                email: email,
                password: password
            })
        }
        
    })
    
}

