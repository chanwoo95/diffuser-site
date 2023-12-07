export async function uploadImage(file) {
  const data = new FormData();

  data.append("file", file);
  data.append("upload_preset", "dhturxjf"); // env파일에 따로 처리하기 밑에 URL도

  return fetch(`https://api.cloudinary.com/v1_1/denysmrmf/upload`, {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .then((result) => result.url);
}
