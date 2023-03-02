import User from "./model/user.js";
import bcrypt from "bcryptjs";

export const resolvers = {
    Query : {
        message : () => 'Hello!',
        getUserById : async (_, { id }) => {
            const user = await User.findById(id);
            if(user){
                return user
            }else{
                throw new Error('User does not exist');
            }
        }
        },
    Mutation : {
        createUser : async (_, { input }) => {
            const { name, email, password, confirm_password, about } = input;
            if( password == confirm_password ){
                const encrypted_password = await bcrypt.hash(password, 12);
                const new_user = new User({ name, email, password: encrypted_password, about });
                await new_user.save();
                return new_user;
            }else{
                throw new Error('Password does not match');
            }
        }, 
        updateUser: async (_, { id, input }) => {
            const updatedUser = await User.findByIdAndUpdate(id, input, { new: true });
            return updatedUser;
          },
        deleteUser: async (_, { id }) => {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            throw new Error(`User with ID ${id} not found`);
        }
        return deletedUser;
        }
    }
}