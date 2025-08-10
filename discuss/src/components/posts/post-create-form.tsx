"use client";

import { useActionState } from "react";
import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Form,
} from "@heroui/react";
import * as actions from "@/actions";

interface PostCreateFormProps {
  slug: string;
}

function PostCreateForm({ slug }: PostCreateFormProps) {
  const [formState, formAction, pending] = useActionState(
    actions.createPost.bind(null, slug),
    {
      errors: {},
    }
  );

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Form
          action={formAction}
          validationErrors={formState.errors}
          validationBehavior="aria"
        >
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Post</h3>
            <Input
              name="title"
              label="Title"
              labelPlacement="outside"
              placeholder="Title"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(", ")}
            />
            <Textarea
              name="content"
              label="Content"
              labelPlacement="outside"
              placeholder="Content"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(", ")}
            />

            {formState.errors._form ? (
              <div className="rounded p-2 bg-red-200 border border-red-400">
                {formState.errors._form.join(", ")}
              </div>
            ) : null}

            <Button type="submit" disabled={pending} isLoading={pending}>
              Create post
            </Button>
          </div>
        </Form>
      </PopoverContent>
    </Popover>
  );
}

export default PostCreateForm;
