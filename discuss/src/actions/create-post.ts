"use server";

import type { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";

const createPostShema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  content: z.string().min(10, "Content must be at least 10 characters long"),
});

interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

export async function createPost(
  slug: string,
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const result = createPostShema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!result.success) {
    return { errors: z.flattenError(result.error).fieldErrors };
  }

  const session = await auth();
  if (!session || !session.user) {
    return { errors: { _form: ["You must be signed in to do this."] } };
  }

  const topic = await db.topic.findFirst({
    where: { slug },
  });
  if (!topic) {
    return { errors: { _form: ["Cannot find topic."] } };
  }

  let post: Post;
  try {
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id as string,
        topicId: topic.id,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Failed to create post."],
        },
      };
    }
  }

  revalidatePath(paths.topicShow(slug));
  redirect(paths.postShow(slug, post.id));
}
