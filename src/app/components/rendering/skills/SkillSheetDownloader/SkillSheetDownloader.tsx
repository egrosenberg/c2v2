"use client";

import type { SkillWithRelations } from "@db/tables/skills";
import { HStack, VStack } from "styled-system/jsx";
import { Button, ButtonIcon } from "@cerberus/react";
import { useEffect, useRef, useState } from "react";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import SkillCardSheet from "../SkillCardSheet/SkillCardSheet";
import { CARDS_PER_SHEET } from "../../types";

export type SkillSheetDownloaderProps = {
  skills: SkillWithRelations[];
};

export default function SkillSheetDownloader({
  skills,
}: SkillSheetDownloaderProps) {
  const skillCardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [blobs, setBlobs] = useState<Blob[]>([]);
  const [skillIndex, setSkillIndex] = useState<number>(-1);

  const downloadBlobs = async () => {
    try {
      setDownloading(true);
      let index = 0;
      for (const blob of blobs) {
        saveAs(blob, `skill-sheet-${index}.png`);
        index++;
      }
    } finally {
      setDownloading(false);
    }
  };

  const saveBlob = async () => {
    if (!skillCardRef.current) return;
    const blob = await domtoimage.toBlob(skillCardRef.current);
    setBlobs((current) => [...current, blob]);
  };

  const processSkillPage = async () => {
    if (skillIndex >= skills.length || skillIndex < 0) return;
    console.log("processing skill page " + skillIndex / CARDS_PER_SHEET);
    await saveBlob();
    setSkillIndex((current) => current + CARDS_PER_SHEET);
  };

  const processBlobs = () => {
    setBlobs([]);
    setSkillIndex(0);
  };

  useEffect(() => {
    processSkillPage();
  }, [skillIndex]);

  return (
    <VStack>
      <HStack>
        {skillIndex >= skills.length && (
          <Button shape="rounded" onClick={downloadBlobs} pending={downloading}>
            Download sheets
            <ButtonIcon />
          </Button>
        )}
        <Button
          shape="rounded"
          onClick={processBlobs}
          pending={skillIndex >= 0 && skillIndex < skills.length}
        >
          Prepare blobs
          <ButtonIcon />
        </Button>
      </HStack>

      <SkillCardSheet
        skills={skills?.slice(skillIndex, skillIndex + CARDS_PER_SHEET)}
        ref={skillCardRef}
      />
    </VStack>
  );
}
