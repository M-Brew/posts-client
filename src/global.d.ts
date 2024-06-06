interface IAuthContext {
  loggedIn?: boolean;
  setLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
  user?: IUser;
  setUser?: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}

interface IUser {
  firstName: string;
  lastName: string;
}

interface IPostFormValues {
  title: string;
  body: string;
  category: string;
  author: string;
}

interface IPost {
  id: string;
  title: string;
  body: string;
  category: string;
  author: string;
}