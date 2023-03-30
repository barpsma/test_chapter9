const nodemailer = require('nodemailer')
const { User } = require('../models/index')
const jsonwebtoken = require('jsonwebtoken')


require('dotenv').config()

exports.SignUp = async (req,res)=>{
    const { email, password } = req.body

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

      const newUser= await User.create({
        email: email,
        password: password
        })

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER_AUTH,
                pass: process.env.USER_PASS
            },
        })

    const token = jsonwebtoken.sign({id: newUser.id }, 'akbar_key')

    const mail = {
        from: process.env.USER_AUTH,
        to: email,
        subject: 'Verification Register',
        html: `<p>Click to verify account:</p> 
        <a href="http://localhost:3000/user/verify?token=${token}">Verify</a>`
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
            res.json({
                status: 200,
                message: `Email sent`
            })
        }
        
    })
    
}

exports.Verify = async (req,res)=>{
    try{
        const {id} = jsonwebtoken.verify(req.params.token, 'akbar_key')
        await User.update({ is_active: true }, {where: {id: id}})
        res.send('Account activated')
    } catch (error){
        console.error(error)
        res.status(500).json({
            message: 'Error'
        })
    }
    
}

