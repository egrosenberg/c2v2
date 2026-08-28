"use client";

import type { AspectWithRelations } from "@db/tables/aspects";
import { HStack, VStack } from "styled-system/jsx";
import { Button, ButtonIcon } from "@cerberus/react";
import { useEffect, useRef, useState } from "react";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import { CARDS_PER_SHEET } from "../../types";
import AspectCardSheet from "../AspectCardSheet/AspectCardSheet";

export type AspectSheetDownloaderProps = {
  aspects: AspectWithRelations[];
};

export default function AspectSheetDownloader({
  aspects,
}: AspectSheetDownloaderProps) {
  const aspectCardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [blobs, setBlobs] = useState<Blob[]>([]);
  const [aspectIndex, setAspectIndex] = useState<number>(-1);

  const downloadBlobs = async () => {
    try {
      setDownloading(true);
      let index = 0;
      for (const blob of blobs) {
        saveAs(blob, `aspect-sheet-${index}.png`);
        index++;
      }
    } finally {
      setDownloading(false);
    }
  };

  const saveBlob = async () => {
    if (!aspectCardRef.current) return;
    const blob = await domtoimage.toBlob(aspectCardRef.current);
    setBlobs((current) => [...current, blob]);
  };

  const processAspectPage = async () => {
    if (aspectIndex >= aspects.length || aspectIndex < 0) return;
    console.log("processing aspect page " + aspectIndex / CARDS_PER_SHEET);
    await saveBlob();
    setAspectIndex((current) => current + CARDS_PER_SHEET);
  };

  const processBlobs = () => {
    setBlobs([]);
    setAspectIndex(0);
  };

  useEffect(() => {
    processAspectPage();
  }, [aspectIndex]);

  return (
    <VStack>
      <HStack>
        {aspectIndex >= aspects.length && (
          <Button shape="rounded" onClick={downloadBlobs} pending={downloading}>
            Download sheets
            <ButtonIcon />
          </Button>
        )}
        <Button
          shape="rounded"
          onClick={processBlobs}
          pending={aspectIndex >= 0 && aspectIndex < aspects.length}
        >
          Prepare blobs
          <ButtonIcon />
        </Button>
      </HStack>

      <AspectCardSheet
        aspects={aspects?.slice(aspectIndex, aspectIndex + CARDS_PER_SHEET)}
        ref={aspectCardRef}
      />
    </VStack>
  );
}
