import { useMutation } from "@/api";
import { svcUpdateSkill, type UpdateSkillOptions } from "@/api/skills";
import { TiptapEditor } from "@/components/TiptapEditor/TiptapEditor";
import { safeSpread } from "@/lib/json/safeSpread";
import { Edit, Notebook } from "@carbon/icons-react";
import {
  Button,
  Dialog,
  DialogProvider,
  DialogTrigger,
  Field,
  IconButton,
  Input,
  NumberInput,
  Text,
  toaster,
} from "@cerberus/react";
import type { Skill } from "@db/tables/skills";
import { useEffect, useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { Flex, HStack, Scrollable } from "styled-system/jsx";

export type EditSkillProps = {
  skill?: Skill;
};

export function EditSkillModal({ skill }: EditSkillProps) {
  const { control, handleSubmit, getValues, setValue } =
    useForm<Partial<Skill>>();

  const [open, setOpen] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [initialHtml, setInitialHtml] = useState<string | undefined>();

  const { service: updateSkill } = useMutation(svcUpdateSkill);

  const onSubmit: SubmitHandler<Partial<Skill>> = (data) => {
    if (!skill) return;
    const finalData: UpdateSkillOptions = {
      id: skill.id,
      ...safeSpread(data),
      description,
    };

    try {
      setOpen(false);
      updateSkill(finalData);
      toaster.success({
        title: "Success",
        description: "Successfully updated skill.",
      });
    } catch (e) {
      if (Error.isError(e)) {
        toaster.error({ title: "Error", description: e.message });
      }
      toaster.error({
        title: "Error",
        description: "An unknown error has occurred",
      });
    }
  };

  useEffect(() => {
    if (!skill) return;

    const fields = getValues();

    for (const key of Object.keys(fields)) {
      if (key in skill) {
        setValue(key as keyof Skill, skill[key as keyof Skill]);
      }
    }

    if (skill.description) {
      let htmlDescription = skill.description;
      if (!/<.*>.*<\/.*>/.test(skill.description)) {
        htmlDescription = skill.description
          .split("\n")
          .map((s) => `<p>${s}</p>`)
          .join("");
      }
      setInitialHtml(htmlDescription);
      setDescription(htmlDescription);
    }
  }, [skill, open]);

  return (
    <DialogProvider
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
    >
      <DialogTrigger
        asChild
        display={{ base: "flex", md: "none" }}
        _groupHover={{ display: "flex" }}
      >
        <IconButton
          ariaLabel="edit skill"
          size="sm"
          pos="absolute"
          top="sm"
          right="sm"
        >
          <Edit />
        </IconButton>
      </DialogTrigger>
      <Dialog>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Scrollable maxH="80VH" p="xs">
            <Flex flexDir="column" gap="sm">
              <Text textStyle="heading-md" fontVariant="small-caps">
                Edit Skill
              </Text>
              <Controller
                name="name"
                control={control}
                defaultValue={""}
                render={({ field: { ref, ...field } }) => (
                  <Field label="Name">
                    <Input
                      type="text"
                      {...field}
                      textStyle="heading-lg"
                      fontVariant="small-caps"
                    />
                  </Field>
                )}
              />
              <HStack>
                <Controller
                  name="type"
                  control={control}
                  defaultValue={""}
                  render={({ field: { ref, ...field } }) => (
                    <Field label="Type">
                      <Input type="text" {...field} textStyle="heading-sm" />
                    </Field>
                  )}
                />
                <Controller
                  name="subtype"
                  control={control}
                  defaultValue={""}
                  render={({ field: { ref, ...field } }) => (
                    <Field label="Subtype">
                      <Input
                        type="text"
                        onChange={field.onChange}
                        value={field.value ?? ""}
                        textStyle="heading-sm"
                      />
                    </Field>
                  )}
                />
              </HStack>
              <Controller
                name="actions"
                control={control}
                defaultValue={skill?.actions}
                render={({ field: { ref, ...field } }) => (
                  <Field label="Actions">
                    <NumberInput
                      onValueChange={(val) =>
                        setValue("actions", val.valueAsNumber)
                      }
                      onChange={field.onChange}
                      defaultValue={String(field.value)}
                      value={String(field.value)}
                      css={{
                        w: "full",
                        "& [data-part=control]": { w: "full" },
                      }}
                    />
                  </Field>
                )}
              />
              <Controller
                name="focus"
                control={control}
                defaultValue={skill?.focus ?? 0}
                render={({ field: { ref, ...field } }) => (
                  <Field label="Focus">
                    <NumberInput
                      onValueChange={(val) =>
                        setValue("focus", val.valueAsNumber)
                      }
                      defaultValue={String(field.value ?? 0)}
                      value={String(field.value)}
                      css={{
                        w: "full",
                        "& [data-part=control]": { w: "full" },
                      }}
                    />
                  </Field>
                )}
              />
              <Controller
                name="range"
                control={control}
                defaultValue={""}
                render={({ field: { ref, ...field } }) => (
                  <Field label="Range">
                    <Input
                      type="text"
                      onChange={field.onChange}
                      value={String(field.value)}
                    />
                  </Field>
                )}
              />
              <TiptapEditor
                setHtml={setDescription}
                initialHtml={initialHtml}
                label="Description"
              />
              <Button shape="rounded" mt="lg">
                SUBMIT
              </Button>
            </Flex>
          </Scrollable>
        </form>
      </Dialog>
    </DialogProvider>
  );
}
