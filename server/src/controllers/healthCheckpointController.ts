import os from "os";
import { Request, Response } from "express";
import { code } from "../config/status-code";

export const serverHealthHandler = (req: Request, res: Response) => {
  try {
    // Memory usage (in bytes)
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;

    // Memory usage (in GB)
    const totalMemoryInGB = (totalMemory / 1024 ** 3).toFixed(2);
    const freeMemoryInGB = (freeMemory / 1024 ** 3).toFixed(2);
    const usedMemoryInGB = (usedMemory / 1024 ** 3).toFixed(2);

    // Memory usage (in percent)
    const freeMemoryPercentage = ((freeMemory / totalMemory) * 100).toFixed(2);
    const usedMemoryPercentage = ((usedMemory / totalMemory) * 100).toFixed(2);

    const data = {
      "Memory size": totalMemoryInGB + "GB",
      "Free memory": freeMemoryInGB + "GB" + ` (${freeMemoryPercentage} %)`,
      "Used memory": usedMemoryInGB + "GB" + ` (${usedMemoryPercentage} %)`,
    };

    res.status(code.Success).json({ data });
    return;
  } catch (err) {
    res.status(code.ServerError).json({ msg: "Unable to access health stats" });
    return;
  }
};
