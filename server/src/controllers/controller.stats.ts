import { Request, Response } from "express";
import { code } from "../config/status-code";
import { Stats } from "../services/Stats";

export const getDashboardStatsController = async (
  req: Request,
  res: Response
) => {
    try{
        const response = await Stats.getDashboardStats();
        res.json({...response});
        return;
    }
    catch(err){
        console.log(err);
        res.status(code.ServerError).json({msg:"Failed to fetch dashboard stats"});
        return;
    }
};

export const getTrendingTopicsStats = async (req:Request, res:Response) => {
    try{
        const data = await Stats.getTrendingTopicsStats();
        res.status(code.Success).send(data);
        return;
    }
    catch(err){
        console.log(err);
        res.status(code.ServerError).json({msg:"Failed to fetch trending interview topics stats"});
        return;
    }
}