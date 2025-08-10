"use client";

// import { useFormState } from "react-dom";
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

export default function TopicCreateForm() {
  // const [formState, action] = useFormState(actions.createTopic, { errors: {} });
  const [formState, formAction, pending] = useActionState(actions.createTopic, {
    errors: {},
  });

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Form
          action={formAction}
          validationErrors={formState.errors}
          validationBehavior="aria"
        >
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Topic</h3>
            <Input
              name="name"
              label="Name"
              labelPlacement="outside"
              placeholder="Name"
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(", ")}
            />
            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder="Describe your topic"
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(", ")}
            />

            {formState.errors._form ? (
              <div className="rounded p-2 bg-red-200 border border-red-400">
                {formState.errors._form.join(", ")}
              </div>
            ) : null}

            <Button type="submit" disabled={pending} isLoading={pending}>
              Save
            </Button>
          </div>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
