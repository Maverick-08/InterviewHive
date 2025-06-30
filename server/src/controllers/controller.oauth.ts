import { OAuth2Client } from "google-auth-library";
import { Request, Response } from "express";
import { code } from "../config/status-code";
import { User } from "../services/User";
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from "../utils/utils.tokens";
import { Redis_Service } from "../services/Redis";
// console.log(process.env.OAUTH_CLIENT_ID);
// console.log(process.env.OAUTH_CLIENT_SECRET);
// console.log(process.env.OAUTH_REDIRECT_URI);

const oauth2Client = new OAuth2Client(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  process.env.OAUTH_REDIRECT_URI 
);

export const oAuthHandler = async (req: Request, res: Response) => {
  try {
    // 1. Extract payload
    const payload = req.body as { code: string; platform: "Mobile"|"Tablet"|"Laptop" };

    // 2. Get Token
    const { tokens } = await oauth2Client.getToken(payload.code);
    oauth2Client.setCredentials(tokens);

    // 3. Decode token
    const ticket = await oauth2Client.verifyIdToken({
      idToken: tokens.id_token!,
      audience: process.env.OAUTH_CLIENT_ID,
    });

    // 4. Get user data
    const userInfo = ticket.getPayload();
    
    // 5. Checks
    // No user info
    if(!userInfo || !userInfo.email || !userInfo.name){
        res.status(code.ServiceUnavailable).json({msg:"Google Authentication Failed"})
        return;
    }
    // Email is not verified
    else if(userInfo.email_verified && !userInfo.email_verified){
         res.status(code.BadRequest).json({msg:"Email Address is Not Verified"})
        return;
    }
    // Has payload
    else{
        // 6. Extract email and username
        const emailId = userInfo.email;
        const username = userInfo.name;
        const avatar = userInfo.picture;

        // 7. Check if account exists
        const userExists = await User.exists({email:emailId});
        let userId = userExists?.id;

        // 8. If account does not exists - create an account
        if(!userExists){
            const user = await User.createUser({email:emailId,username,avatar});
            userId = user.id;
        }
        // 9. Create tokens
        const accessToken = getAccessToken({userId: userId as string});
        const refreshToken = getRefreshToken({userId:userId as string,platform:payload.platform})

        // 10. Hydrate cache
        await Redis_Service.createSession({token:refreshToken,userId:userId as string,platform:payload.platform});
        
        // 11. Set on response object
        setAccessToken(res,accessToken);
        setRefreshToken(res,refreshToken);

        // 12. Return
        res.status(code.Success).json({userId,email:emailId,username});
        return;
    }
  } catch (err) {
    console.log("@oAuthHandler : \n", err);
    res.status(code.ServerError).json({ msg: "Google Authentication Failed" });
    return;
  }
};

/*
 ->  1. Tokens :  {                                                                                                                     
access_token: 'ya29.a0AS3H6Nxj7Or7iOY-ZF-Rx7svutkpCmSYs6HzrcojpqCLMQcQmbS2p743v-AbFUTOi6aJ0ERULzT-pAoyXZV21S2UVky6r2MTpdvgLLrrXYaKzEBlDofuwfg6cSZ2aEudP1t_joXfkZiLRmX1bdkWcHZnvEbxfwZsAc3a7zXvaCgYKAYYSARISFQHGX2MifiAoZqnpXyVcaOvbCDRnOQ0175',                                 
refresh_token: '1//0gwHV3bC6aVUMCgYIARAAGBASNwF-L9IrFp786zcvOPK7sTbGYSt90P2sD_NdNRJ7pQf1LCWliYGb6whgxTRZnSzEBt7sEYd3Z_w',
scope: 'https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email',                 
token_type: 'Bearer',                                                                                                            
id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg4MjUwM2E1ZmQ1NmU5ZjczNGRmYmE1YzUwZDdiZjQ4ZGIyODRhZTkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxNTg1MzA5NTQ4NDEtcDBpazlhdTE4dnZhdjFqdWUzZDlpZTJpajJpMHA5MnUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIxNTg1MzA5NTQ4NDEtcDBpazlhdTE4dnZhdjFqdWUzZDlpZTJpajJpMHA5MnUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTc3NDEwNDE3OTk1NTkxNzYwNTgiLCJlbWFpbCI6Im9qaGF2aXZlazI0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiRVlxeERqZXdheGM0ejBNaTV2RkR2ZyIsIm5hbWUiOiJWaXZlayBPamhhIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0swVHctakFpMEJKUVl0d1lPVUJIenlCRmJ5SlpJcy1KcGEtVWV2Y3ZRLVlOWnplaG4zPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IlZpdmVrIiwiZmFtaWx5X25hbWUiOiJPamhhIiwiaWF0IjoxNzUxMjUwODU5LCJleHAiOjE3NTEyNTQ0NTl9.oh8Gw4YsmdSH_hBz9e9WajpELBFMufgP-1X7X_eE_1m_qe3sLNxrxZ_yH1-u-yPgIWXY4crq4uy9J5pAdrMqfhtDnVb9KZ_UMbzuBP89l9ur7aJPFsuvGp9IvzWemhW49QtnzkL-CwgoHM2dcW4Bd_dxVeOQ-I-pgmrRMoRHucGQe3aSa2CiUhjbn681AblZXIE805F9n_PQjD5-XqjKrey6QWkmCVFkZ8PhHjDdquNU6Y3EtVMNDHfDVuuSAuwDHjdGaPAiI7lQd19TtA22o15gORYRqux92VOyf0DQJxBSR8ChGJ1ljEBGJNvCva5N80d2883P1rY8mxyTNR9XZA',
expiry_date: 1751254458268
}


 ->  2. Ticket :  LoginTicket {                                                                                                         
envelope: {
  alg: 'RS256',                                                                                                                  
  kid: '882503a5fd56e9f734dfba5c50d7bf48db284ae9',
  typ: 'JWT'                                                                                                                     
},
payload: {                                                                                                                       
  iss: 'https://accounts.google.com',                                                                                            
  azp: '158530954841-p0ik9au18vvav1jue3d9ie2ij2i0p92u.apps.googleusercontent.com',                                               
  aud: '158530954841-p0ik9au18vvav1jue3d9ie2ij2i0p92u.apps.googleusercontent.com',                                               
  sub: '117741041799559176058',
  email: 'ojhavivek24@gmail.com',                                                                                                
  email_verified: true,                                                                                                          
  at_hash: 'EYqxDjewaxc4z0Mi5vFDvg',                                                                                             
  name: 'Vivek Ojha',
  picture: 'https://lh3.googleusercontent.com/a/ACg8ocK0Tw-jAi0BJQYtwYOUBHzyBFbyJZIs-Jpa-UevcvQ-YNZzehn3=s96-c',                 
  given_name: 'Vivek',                                                                                                           
  family_name: 'Ojha',
  iat: 1751250859,                                                                                                               
  exp: 1751254459                                                                                                                
}
}                                                                                                                                  
 ->  3. Data :  {                                                                                                                       
iss: 'https://accounts.google.com',                                                                                              
azp: '158530954841-p0ik9au18vvav1jue3d9ie2ij2i0p92u.apps.googleusercontent.com',                                                 
aud: '158530954841-p0ik9au18vvav1jue3d9ie2ij2i0p92u.apps.googleusercontent.com',                                                 
sub: '117741041799559176058',                                                                                                    
email: 'ojhavivek24@gmail.com',
email_verified: true,
at_hash: 'EYqxDjewaxc4z0Mi5vFDvg',
name: 'Vivek Ojha',
picture: 'https://lh3.googleusercontent.com/a/ACg8ocK0Tw-jAi0BJQYtwYOUBHzyBFbyJZIs-Jpa-UevcvQ-YNZzehn3=s96-c',
given_name: 'Vivek',
family_name: 'Ojha',
iat: 1751250859,
exp: 1751254459
} */
