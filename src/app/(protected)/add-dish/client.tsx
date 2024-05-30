"use client";

import { useState } from "react";
import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";
import Tus from "@uppy/tus";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import "@uppy/webcam/dist/style.min.css";
import { Session } from "@supabase/supabase-js";

function Client({ session }: { session: Session }) {
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const STORAGE_BUCKET = "dishes";

  const BEARER_TOKEN = session.access_token;

  const folder = "";
  const supabaseStorageURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/upload/resumable`;

  const [uppy] = useState(() =>
    new Uppy().use(Tus, {
      endpoint: supabaseStorageURL,
      headers: {
        authorization: `Bearer ${BEARER_TOKEN}`,
        apikey: SUPABASE_ANON_KEY,
      },
      uploadDataDuringCreation: true,
      chunkSize: 6 * 1024 * 1024,
      allowedMetaFields: [
        "bucketName",
        "objectName",
        "contentType",
        "cacheControl",
      ],
      // onError: function (error) {
      //   console.log('Failed because: ' + error)
      // },
    }),
  );

  uppy.on("file-added", (file) => {
    const supabaseMetadata = {
      bucketName: STORAGE_BUCKET,
      objectName: folder ? `${folder}/${file.name}` : file.name,
      contentType: file.type,
    };

    file.meta = {
      ...file.meta,
      ...supabaseMetadata,
    };

    console.log("file added", file);
  });

  uppy.on("complete", (result) => {
    console.log("Upload complete! Weve uploaded these files:");
    console.log(result);
  });

  return <Dashboard uppy={uppy} proudlyDisplayPoweredByUppy={false} />;
}

export default Client;
