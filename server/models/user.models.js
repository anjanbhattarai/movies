const mongoose= require ('mongoose');

const bcrypt= require('bcrypt');
const UserSchema= new mongoose.Schema(
{
    username: {
        type: String,
        required:[true, "Username is required"],
    },
    email:{
        type: String,
        unique: true,
        required:[true, 'email is required'],
    },
    password:{
        type: String,
        required: [true,"password is required"],
        minlength: [8, "password must be atleast 8 charatcters"]
    },
}, {timestamps:true}
);

UserSchema.virtual('confirmPassword')
.get(()=> this._confirmPassword)
.set((value)=> (this._confirmPassword = value));

UserSchema.pre('validate',function(next){
if(this.password !== this.confirmPassword){
    this.invalidate('confirmPassword ','Password must Match!!');
}
next();
});

UserSchema.pre('save', async function (next){
    try{
        const hashedPassword = await bcrypt.hash(this.password,10)
        this.password= hashedPassword
        next()
    }catch(err){
        console.log("Error in Hashing", err)
    }next();
});

const User = mongoose.model('User',UserSchema);

module.exports = User;