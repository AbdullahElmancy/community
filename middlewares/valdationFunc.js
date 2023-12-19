let headerKey = ['body','params','query']

const validationFunc = (schema)=>{
    return (req,res,next)=>{
        let errList = []
        headerKey.forEach( ele=>{
            if(schema[ele] != undefined){
                let valid = schema[ele].validate(req[ele])
                if(valid.error){
                    errList.push(valid.error)
                }
            }
        })
        if (errList.length > 0) {
            res.status(404).json({message:"validation error",errList})
        }else{
            next()
        }
    }
}

module.exports = validationFunc