import express, { NextFunction } from "express";

export enum METHOD {
  GET = "get",
  POST = "post",
  DELETE = "delete",
  PUT = "put"
}

export enum DBField {
  CARDS = "cards",
  USERS = "users",
  SELECT_ITEMS = "select_items",
  RESULT_ITEM = "result_item",
}

export type Handler = (req: express.Request, res: express.Response, next: NextFunction) => void;

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


export interface parseScoreTestRequestBodyProps {
  basicInformationItem: string;
  scoreResultItems: string;
  scoreSelectItems: string;
  isPublic: string;
  testType: string;
}
