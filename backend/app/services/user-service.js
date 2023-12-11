import User from "../models/user.js";

export const search=async(params={})=>{
    const users = User.find(params).exec();
    return users;
}

export const save=async(newUser)=>{
    const user = new User(newUser);
    return await user.save();


}

export const findById= async(id)=>{
    const user = await User.findById(id).exec();
    return user;
}
export const update=async (updateUser,id)=>{
    const user=await User.findByIdAndUpdate(id,updateUser).exec();
    return user;

}

export const remove=async (id)=>{
    return await User.findByIdAndDelete(id).exec();

}