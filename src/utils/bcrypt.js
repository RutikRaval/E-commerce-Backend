const bcrypt=require('bcryptjs')

const hashPassword=async(payload)=>{
    return await bcrypt.hash(payload,10)
}

const comparePassword=async(originalPassword,hashPassword)=>{
    return await bcrypt.compare(originalPassword,hashPassword)
}

module.exports={
    hashPassword,comparePassword
}