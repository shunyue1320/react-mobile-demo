import { Request, Response } from "express";
import { ILessonDocument, Lesson } from "../models";
import {FilterQuery} from 'mongoose';
export const list = async (req: Request, res: Response) => {
  let { category } = req.query;//查询参数里会有一个category 类型
  let offset: any = req.query.offset;//偏移量
  let limit: any = req.query.limit;//限制的条数
  offset = isNaN(offset) ? 0 : parseInt(offset); //偏移量
  limit = isNaN(limit) ? 5 : parseInt(limit); //每页条数
  let query: FilterQuery<ILessonDocument> = {};
  if (category && category != "all") query.category = category as string;
  let total = await Lesson.count(query);//计算总条数
  let list:any = await Lesson.find(query)//课程列表
    .sort({ order: 1 })//排序
    .skip(offset)//跳过指定的条数
    .limit(limit);//限定返回的条数
  list = list.map((item:ILessonDocument)=>item.toJSON());  
  setTimeout(function () {
    //code:0表示成功 list本页的数据 hasMore 是否还有更多数据
    res.json({ code: 0, data: { list, hasMore: total > offset + limit } });
  }, 1000);
};
export const get = async (req: Request, res: Response) => {
  let id = req.params.id;
  let lesson = await Lesson.findById(id);
  res.json({ success: true, data: lesson });
};