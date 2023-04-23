import { DocumentType } from "@typegoose/typegoose";
import express, { NextFunction } from "express";
import { MbtiResultItems } from "./models/personalityModel/mbtiTest.model";
import { Personality } from "./models/personalityModel/personality.model";
import { ScoreResultItems } from "./models/personalityModel/scoreTest.model";
import { TrueOrFalseResultItems } from "./models/personalityModel/trueOrFalseTest.model";

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


interface RequestBodyProps {
  basicInformationItem: string;
  isPublic: string;
  testType: string;
}


export interface ParseScoreTestRequestBodyProps extends RequestBodyProps {
  scoreResultItems: string;
  scoreSelectItems: string;
}

export interface ParseMbtiTestRequestBodyProps extends RequestBodyProps {
  mbtiResultItems: string;
  mbtiSelectItems: string;
}

export interface ParseTrueOrFalseTestRequestBodyProps extends RequestBodyProps {
  trueOrFalseTestResultFormItems: string;
  trueOrFalseTestSelectFormItems: string;
}

export type PersonalityDocument = DocumentType<Personality>;

export type ScoreResultItemsDocument = DocumentType<ScoreResultItems>;

export type MbtiResultItemsDocument = DocumentType<MbtiResultItems>;

export type TrueOrFalseResultItemsDocument = DocumentType<TrueOrFalseResultItems>;
