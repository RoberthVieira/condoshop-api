import { Request, Response } from "express";
import getDashboard from "../models/dashboardModel.js";

export async function dashboard(req:Request, res:Response): Promise<void> {
    const dashboardInfos = await getDashboard();

    res.status(200).json({data: dashboardInfos})
}