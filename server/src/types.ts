import express from "express";

export enum METHOD {
  GET = "get",
  POST = "post",
  DELETE = "delete",
}

export enum DBField {
  CARDS = "cards",
  USERS = "users",
  SELECT_ITEMS = "select_items",
  RESULT_ITEM = "result_item",
}

export type Handler = (req: express.Request, res: express.Response) => void;

export interface CustomRoute {
  method: METHOD;
  route: string;
  handler: Handler | Array<Handler>;
}

export interface Card {
  id: number;
  imgUrl: string;
  title: string;
  explain: string;
}

export interface User {
  key: number;
  title: string;
  id: string;
  password: string;
}

export interface ResultItem {
  key: number;
  id: string;
  who: string;
  content: string;
}

export interface ResultItems {
  [key: string]: ResultItem[];
}

declare module "express-session" {
  export interface SessionData {
    cardId: number;
  }
}
