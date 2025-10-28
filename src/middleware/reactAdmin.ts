import { Request, Response, NextFunction } from "express";

export const reactAdminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const originalJson = res.json.bind(res);

  res.json = function (body: any) {
    if (Array.isArray(body)) {
      const resourceName = req.path.split("/").filter(Boolean).pop() || "items";
      const total = body.length;
      res.set("Content-Range", `${resourceName} 0-${total - 1}/${total}`);
    }
    return originalJson(body);
  };

  next();
};
