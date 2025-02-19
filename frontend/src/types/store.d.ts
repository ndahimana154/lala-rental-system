export interface IUser {
  _id?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  username?: string;
  status?: boolean;
  phone?: string
}


export interface ICategory {
  _id: mongoose.Types.ObjectId | string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface IProductCategory {
  _id?: mongoose.Types.ObjectId | string;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IMessage {
  _id?: mongoose.Types.ObjectId | string;
  senderId?: mongoose.Types.ObjectId | string;
  receiverId: mongoose.Types.ObjectId | string;
  content: string;
  isRead?: Boolean;
  createdAt?: any;
  updatedAt?: Date;
}

export interface iMessageChat {
  _id?: mongoose.Types.ObjectId | string;
  lastMessage?: string;
  lastMessageDate?: any;
  lastMessageisRead?: Boolean;
  userId?: mongoose.Types.ObjectId | string;
  username?: mongoose.Types.ObjectId | string;
  firstName?: string;
  lastName?: string;
}