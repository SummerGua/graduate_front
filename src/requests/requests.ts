import { AxiosPromise } from 'axios'
import { Article } from '../models/article'
import server from './axios.config'

export const articleModel = {
  findAll: (): AxiosPromise<Array<Article>> => {
    return server({
      method: 'get',
      url: '/article'
    })
  },
  findOne: (id: string): AxiosPromise<Article> => {
    return server({
      method: 'get',
      url: `/article/${id}`
    })
  },
  modifyOne: (id: string, title: string, content: string, updatedAt: Date): AxiosPromise<Article> => {
    return server({
      method: 'patch',
      url: `/article/${id}`,
      data: {
        title,
        content,
        updatedAt
      }
    })
  },
  createOne: (title: string, content: string, createdAt: Date, author: string) => {
    return server({
      method: 'post',
      url: '/article/create',
      data: {
        title,
        content,
        createdAt,
        author
      }
    })
  },
  deleteOne: (id: string) => {
    return server({
      method: 'delete',
      url: `/article/${id}`
    })
  }
}
