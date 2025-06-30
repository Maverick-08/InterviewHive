import { OAuth2Client } from "google-auth-library";
import { Request, Response } from "express";
import { code } from "../config/status-code";
import { User } from "../services/User";
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from "../utils/utils.tokens";
import { Redis_Service } from "../services/Redis";

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

