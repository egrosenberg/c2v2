"use client";

import type { SkillWithRelations } from "@db/tables/skills";
import { VStack } from "styled-system/jsx";
import SkillCard from "../SkillCard/SkillCard";
import { Button, ButtonIcon } from "@cerberus/react";
import { useRef, useState } from "react";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
export type SkillCardDownloadProps = {
  skill: SkillWithRelations | null | undefined;
};

export default function SkillCardDownload({ skill }: SkillCardDownloadProps) {
  const skillCardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState<boolean>(false);

  const downloadCard = async () => {
    if (!skillCardRef.current || !skill) return;
    setDownloading(true);
    try {
      const blob = await domtoimage.toBlob(skillCardRef.current);
      saveAs(blob, `${skill.name}.png`);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <VStack>
      <SkillCard skill={skill} ref={skillCardRef} />
      <Button shape="rounded" onClick={downloadCard} pending={downloading}>
        Download
        <ButtonIcon />
      </Button>
    </VStack>
  );
}
