import toast from 'react-hot-toast';
import { authActions } from "../slices/auth-slice";

const apiKey = process.env.REACT_APP_API_KEY;

export const createAccount = (userInfo) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
        {
          method: "POST",
          body: JSON.stringify({
            email: userInfo.email,
            password: userInfo.password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
    };

    try {
      await sendRequest();
      toast.success('Account created!', {
        style: {
            borderRadius: '10px',
            fontSize: '25px',
      background: '#333',
      color: '#fff',
        }
      });
    } catch (error) {
      toast.error(error.message || 'Something went wrong', {
        style: {
            borderRadius: '10px',
            fontSize: '25px',
      background: '#333',
      color: '#fff',
        }
      });
    }
  };
};

export const loginAccount = (userInfo) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
        {
          method: "POST",
          body: JSON.stringify({
            email: userInfo.email,
            password: userInfo.password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      return data;
    };

    try {
      const authData = await sendRequest();
      await dispatch(authActions.login(authData.idToken));
      localStorage.setItem("isLogged", "1");
      localStorage.setItem("Token", authData.idToken);
    } catch (error) {
      // console.log(error.message);
      toast.error("Invalid Email/Password", {
        style: {
            borderRadius: '10px',
            fontSize: '25px',
      background: '#333',
      color: '#fff',
        }
      });
    }
  };
};

export const changePassword = (userInfo) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKey}`,
        {
          method: "POST",
          body: JSON.stringify({
            idToken: userInfo.token,
            password: userInfo.password,
            returnSecureToken: false,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error();
      }
    };

    try {
      await sendRequest();
      toast.success("Password changed!", {
        style: {
            borderRadius: '10px',
            fontSize: '25px',
      background: '#333',
      color: '#fff',
        }
      });
    } catch (error) {
      toast.error(error.message || "Something went wrong!", {
        style: {
            borderRadius: '10px',
            fontSize: '25px',
      background: '#333',
      color: '#fff',
        }
      });
    }
  };
};

export const deleteAccount = (token) => {
    return async(dispatch) => {
        const sendRequest = async() => {
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${apiKey}`, {
                method: 'POST',
                body: JSON.stringify({
                    idToken: token
                }),
                headers: {
                    'Content-type': 'application/json'
                }
            });

            if(!response.ok){
                throw new Error();
            }

        };

        try{
            await sendRequest();
            toast.success('Account deleted!', {
                style: {
                    borderRadius: '10px',
                    fontSize: '25px',
              background: '#333',
              color: '#fff',
                }
              });
        }catch(error){
            toast.error('Something went wrong!', {
                style: {
                    borderRadius: '10px',
                    fontSize: '25px',
              background: '#333',
              color: '#fff',
                }
              });
        }

    };
};

export const getUserData = (token) => {
    return async(dispatch) => {
        const sendRequest = async() => {
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`, {
                method: 'POST',
                body: JSON.stringify({
                    idToken: token
                }),
                headers: {
                    'Content-type': 'application/json'
                }
            });

            if(!response.ok){
                throw new Error();
            }

            const data = await response.json();
            return data;
        };

        try{
            const userData = await sendRequest();
            const email = userData.users[0].email;
            dispatch(authActions.giveEmail(email));
        }catch(error){
            toast.error(error.message || 'Something went wrong!', {
                style: {
                    borderRadius: '10px',
                    fontSize: '25px',
              background: '#333',
              color: '#fff',
                }
              });
        }

    };
};