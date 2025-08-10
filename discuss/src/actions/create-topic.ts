"use server";

import type { Topic } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";

const createTopicShema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .regex(/^[a-z-]+$/, {
      message: "Must be lowercase letters or dashes without spaces.",
    }),
  description: z.string().min(10, "Description is required"),
});

interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

export async function createTopic(
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  // await new Promise((resolve) => setTimeout(resolve, 2500));

  const result = createTopicShema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!result.success) {
    return { errors: z.flattenError(result.error).fieldErrors };
  }

  const session = await auth();
  if (!session || !session.user) {
    return { errors: { _form: ["You must be signed in to do this."] } };
  }

  let topic: Topic;
  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
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
          _form: ["An unexpected error occurred while creating the topic."],
        },
      };
    }
  }

  revalidatePath("/");
  redirect(paths.topicShow(topic.slug));
}
