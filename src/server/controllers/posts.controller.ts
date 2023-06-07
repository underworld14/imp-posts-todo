import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getPosts = async (req: Request, res: Response) => {
  // use pagination on get posts
  const page = Number(req.query.page || 1);
  const size = Number(req.query.size || 10);
  const search = String(req.query.search || "");

  const postCount = await prisma.post.count();
  const posts = await prisma.post.findMany({
    where: {
      OR: [{ title: { contains: search } }],
    },
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * size,
    take: size,
  });

  return res.json({
    data: posts,
    meta: {
      currentPage: page,
      size: size,
      total: postCount,
      totalPages: Math.ceil(postCount / size),
    },
  });
};

export const getPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({ where: { id } });
  return res.json(post);
};

export const createPost = async (req: Request, res: Response) => {
  const { title, content, image } = req.body;
  const post = await prisma.post.create({ data: { title, content, image } });
  return res.json(post);
};

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const post = await prisma.post.update({ where: { id }, data: { title, content } });
  return res.json(post);
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await prisma.post.delete({ where: { id } });
  return res.json(post);
};
