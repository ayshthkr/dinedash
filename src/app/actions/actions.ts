"use server";

import { createClient } from "@/utils/supabase/server";
import { parseWithZod } from "@conform-to/zod";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { schema } from "../(protected)/my-account/page";
import { schema as addDishSchema } from "@/app/(protected)/add-dish/schema";
import { Upload } from "tus-js-client";
import { revalidatePath } from "next/cache";

export const signInWithGithub = async () => {
  const supabase = createClient();
  const origin = headers().get("origin");
  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });
  if (error) console.error(error.message);

  if (data.url) return redirect(data.url);

  redirect("/error");
};

export const signOut = async () => {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) console.error(error.message);
  revalidatePath("/", "layout");
  return redirect("/login");
};

export const addDish = async (prevState: unknown, formdata: FormData) => {
  console.log(formdata);
  const submission = parseWithZod(formdata, {
    schema: addDishSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  console.log(submission);

  redirect("/account");
};
// Testing
export const login = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  redirect("/dashboard");
};

export async function uploadFile(
  bucketName: string,
  fileName: string,
  file: File,
) {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);

  const fileToBlob = async (file: File) =>
    new Blob([new Uint8Array(await file.arrayBuffer())], { type: file.type });
  const br = await fileToBlob(file);

  return new Promise<void>((resolve, reject) => {
    var upload = new Upload(br, {
      endpoint: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/upload/resumable`,
      retryDelays: [0, 3000, 5000, 10000, 20000],
      headers: {
        authorization: `Bearer ${session?.access_token}`,
        "x-upsert": "true", // optionally set upsert to true to overwrite existing files
      },
      uploadDataDuringCreation: true,
      removeFingerprintOnSuccess: true, // Important if you want to allow re-uploading the same file https://github.com/tus/tus-js-client/blob/main/docs/api.md#removefingerprintonsuccess
      metadata: {
        bucketName: bucketName,
        objectName: fileName,
        contentType: "image/png",
        cacheControl: "3600",
      },
      chunkSize: 6 * 1024 * 1024, // NOTE: it must be set to 6MB (for now) do not change it
      onError: function (error) {
        console.log("Failed because: " + error);
        reject(error);
      },
      onProgress: function (bytesUploaded, bytesTotal) {
        var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        console.log(bytesUploaded, bytesTotal, percentage + "%");
      },
      onSuccess: function () {
        // @ts-ignore
        console.log("Download %s from %s", upload.file.name, upload.url);
        resolve();
      },
    });

    // Check if there are any previous uploads to continue.
    return upload.findPreviousUploads().then(function (previousUploads) {
      // Found previous uploads so we select the first one.
      if (previousUploads.length) {
        upload.resumeFromPreviousUpload(previousUploads[0]);
      }

      // Start the upload
      upload.start();
    });
  });
}

export const placeOrder = () => {
  setInterval(() => {}, 3000);

  return redirect("/order-placed");
};
