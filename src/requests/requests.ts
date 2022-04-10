import { AxiosPromise } from "axios";
import { Article } from "../models/article";
import server from "./axios.config";

export const articleModel = {
  findAll: (): AxiosPromise<Array<Article>> => {
    return server({
      method: "get",
      url: "/article"
    })
  },
  findOne: (id: string):AxiosPromise<Article> => {
    return server({
      method: "get",
      url: `/article/${id}`
    })
  },
  modifyOne: (id: string):AxiosPromise<Article> => {
    return server({
      method: "patch",
      url: `/article/${id}`
    })
  }
}